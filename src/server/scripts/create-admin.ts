import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@imr.co.kr'
  const password = await bcrypt.hash('admin123', 10)
  const name = 'Master Admin'
  const role = 'ADMIN'

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      name,
      role,
    },
    create: {
      email,
      password,
      name,
      role,
    },
  })

  console.log(`Admin account created/updated successfully: ${admin.email}`)
}

main()
  .catch((e) => {
    console.error('Failed to create admin:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
