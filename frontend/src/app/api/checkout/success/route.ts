import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { success: false, error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Parse metadata
    const customerInfo = JSON.parse(session.metadata?.customerInfo || '{}')
    const items = JSON.parse(session.metadata?.items || '[]')
    const userId = session.metadata?.userId

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: userId || null,
        email: session.customer_email || customerInfo.email,
        status: 'CONFIRMED',
        total: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents
        stripeSessionId: sessionId,
        shippingAddress: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          address: customerInfo.address,
          city: customerInfo.city,
          state: customerInfo.state,
          zipCode: customerInfo.zipCode,
          country: customerInfo.country,
        },
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          }))
        }
      },
      include: {
        items: true
      }
    })

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        total: order.total,
        status: order.status,
        items: order.items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      }
    })

  } catch (error) {
    console.error('Success page error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
