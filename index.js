const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()

  await prisma.user.create({
    data:{
      userId: '1213',
      userName:'Dawn_lsl',
      sex: true,
      password: '1234',
      email: '1234@qw.com'
    }
  })
  const allUsers = await prisma.user.findMany({
    select: {
      email: true,
      userName: true,
    }
  })
  console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })