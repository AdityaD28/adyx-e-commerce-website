import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get dashboard statistics
    const [totalOrders, totalRevenue, totalProducts, totalUsers, recentOrders] = await Promise.all([
      // Total orders count
      prisma.order.count(),
      
      // Total revenue
      prisma.order.aggregate({
        _sum: {
          total: true
        }
      }),
      
      // Total products count
      prisma.product.count(),
      
      // Total users count
      prisma.user.count(),
      
      // Recent orders (last 5)
      prisma.order.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          email: true,
          total: true,
          status: true,
          createdAt: true
        }
      })
    ])

    const stats = {
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      totalProducts,
      totalUsers,
      recentOrders: recentOrders.map((order: any) => ({
        id: order.id,
        customerEmail: order.email,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt.toISOString()
      }))
    }

    return NextResponse.json({
      success: true,
      stats
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
