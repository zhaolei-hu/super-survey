import { PrismaClient } from '@prisma/client'

// models that do not require soft delete
const notRequireSoftDeleteModels = [
  'User',
  'Account',
  'Session',
  'VerificationToken',
  'Authenticator',
]
const prismaClientSingleton = () => {
  return new PrismaClient()
}
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma: ReturnType<typeof prismaClientSingleton> =
  globalThis.prisma ?? prismaClientSingleton()


// middleware => soft delete
prisma.$use(async (params, next) => {
  console.log('model:', params.model)
  return next(params)
})
export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
