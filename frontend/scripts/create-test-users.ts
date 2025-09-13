import { prisma } from '../src/lib/prisma'
import bcrypt from 'bcryptjs'

async function createTestUser() {
  try {
    const hashedPassword = await bcrypt.hash('test123', 12)
    
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'customer',
      }
    })

    console.log('Test user created:', { id: user.id, email: user.email, name: user.name })
    
    // Create an admin user too
    const adminPassword = await bcrypt.hash('admin123', 12)
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@adyx.com',
        password: adminPassword,
        role: 'admin',
      }
    })

    console.log('Admin user created:', { id: admin.id, email: admin.email, name: admin.name })

  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('Users already exist, skipping creation')
    } else {
      console.error('Error creating test users:', error)
    }
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()
