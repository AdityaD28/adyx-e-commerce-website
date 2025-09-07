import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    console.error('Database health check failed:', error);
    
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        database: 'disconnected',
        error: 'Database connection failed',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}
