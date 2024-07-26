import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
// models that do not require soft delete
const notRequireSoftDeleteModels = [
  'User',
  'Account',
  'Session',
  'VerificationToken',
  'Authenticator',
]

const prismaClientSingleton = () => {
  const prismaClient = new PrismaClient()
  const modelMap = {
    User: prismaClient.user,
    Account: prismaClient.account,
    Session: prismaClient.session,
    VerificationToken: prismaClient.verificationToken,
    Authenticator: prismaClient.authenticator,
  }
  return prismaClient.$extends({
    query: {
      $allModels: {
        async delete({ model, args, query }) {
          if (notRequireSoftDeleteModels.includes(model)) {
            return query(args)
          }
          const res = await (modelMap[model] as any).update({
            ...args,
            data: {
              deleted: true,
            },
          })
          return res
        },
        async deleteMany({ model, args, query }) {
          if (notRequireSoftDeleteModels.includes(model)) {
            return query(args)
          }
          const res = await (modelMap[model] as any).updateMany({
            ...args,
            data: {
              deleted: true,
            },
          })
          return res
        },
      },
      // filter deleted rows
      $allOperations({ model, operation, args, query }) {
        if (notRequireSoftDeleteModels.includes(model as string)) {
          return query(args)
        }
        if (operation === 'findMany' || operation === 'findUnique' || operation === 'findFirst') {
          if (args) {
            if (args.where) {
              if (args.where.deleted === undefined) {
                args.where.deleted = false
              }
            } else {
              args.where = {
                deleted: false,
              }
            }
          } else {
            args = {
              where: {
                deleted: false,
              },
            }
          }
        }
        return query(args)
      },
    },
    // format createdAt and updatedAt
    result: {
      $allModels: {
        createdAt: {
          needs: { createdAt: true } as any,
          compute: ({ createdAt }) => {
            return `${dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}`
          },
        },
        updatedAt: {
          needs: { updatedAt: true } as any,
          compute: ({ updatedAt }) => {
            return `${dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}`
          },
        },
      },
    },
  })
  // prismaExtend(prismaClient)
}
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma: ReturnType<typeof prismaClientSingleton> =
  globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
