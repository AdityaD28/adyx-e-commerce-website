import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Check if Stripe is properly configured
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const isStripeConfigured = stripeSecretKey && 
  stripeSecretKey !== 'sk_test_your_stripe_secret_key_here' && 
  !stripeSecretKey.includes('PASTE_YOUR_ACTUAL_SECRET_KEY_HERE') &&
  !stripeSecretKey.includes('your_stripe_secret_key_here')

console.log('🔑 Stripe Configuration:', {
  hasSecretKey: !!stripeSecretKey,
  keyPrefix: stripeSecretKey?.substring(0, 12) + '...',
  isConfigured: isStripeConfigured
})

let stripe: Stripe | null = null

if (isStripeConfigured) {
  stripe = new Stripe(stripeSecretKey!, {
    apiVersion: '2024-12-18.acacia',
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customerInfo, userId } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    // Get the base URL - hardcoded for immediate fix
    const origin = 'http://localhost:3000'
    
    console.log('🔍 Checkout URL Debug:', {
      origin: request.headers.get('origin'),
      host: request.headers.get('host'),
      nextauthUrl: process.env.NEXTAUTH_URL,
      finalOrigin: origin
    })

    // If Stripe is not configured, return an error with setup instructions
    if (!isStripeConfigured) {
      console.log('Stripe not properly configured')
      return NextResponse.json({ 
        error: 'Payment system not configured. Please set up Stripe API keys.',
        setupRequired: true,
        instructions: {
          step1: 'Sign up at https://stripe.com',
          step2: 'Go to Dashboard → Developers → API keys',
          step3: 'Copy your test keys to .env.local file',
          step4: 'Restart the development server'
        }
      }, { status: 500 })
    }

    // Calculate amounts
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const shippingCost = subtotal > 100 ? 0 : 9.99
    const taxRate = 0.08 // 8% tax
    const taxAmount = subtotal * taxRate
    const total = subtotal + shippingCost + taxAmount

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: `Size: ${item.size || 'N/A'}, Color: ${item.color || 'N/A'}`,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Add shipping as line item if applicable
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
            description: 'Standard shipping',
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      })
    }

    // Add tax as line item
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Tax',
          description: 'Sales tax (8%)',
        },
        unit_amount: Math.round(taxAmount * 100),
      },
      quantity: 1,
    })

    // Create Stripe checkout session with enhanced configuration
    const session = await stripe!.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?cancelled=true`,
      customer_email: customerInfo.email,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'IN', 'GB', 'AU'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        userId: userId || '',
        customerInfo: JSON.stringify(customerInfo),
        items: JSON.stringify(items.map((item: any) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color
        }))),
        subtotal: subtotal.toString(),
        shipping: shippingCost.toString(),
        tax: taxAmount.toString(),
        total: total.toString(),
      },
      payment_intent_data: {
        description: `AdyX Fashion Order - ${items.length} item(s)`,
        metadata: {
          orderId: `ORDER_${Date.now()}`,
          customerEmail: customerInfo.email,
        },
      },
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes expiry
    })

    console.log('Stripe checkout session created:', session.id)

    return NextResponse.json({ 
      sessionId: session.id,
      realPayment: true 
    })

  } catch (error) {
    console.error('Checkout error:', error)
    
    // Provide more specific error messages
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { 
          error: `Payment error: ${error.message}`,
          type: error.type,
          code: error.code 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error during payment processing' },
      { status: 500 }
    )
  }
}
