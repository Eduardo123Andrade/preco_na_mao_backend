import { NotFoundError } from "../error/NotFoundError"
import { UpdateUser } from "../interface"
import { prisma } from "../lib/prisma"


const findUserByCpf = async (cpf: string) => {
  const user = await prisma.user.findFirst({
    where: { cpf }
  })

  if (!user)
    throw new NotFoundError("Usuario não encontrado")

  return user
}

const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } })

  if (!user)
    throw new NotFoundError("Usuario não encontrado")

  return user
}

const updateUser = async (userId: string, data: UpdateUser) => {
  const user = prisma.user.update({
    where: { id: userId },
    data: { ...data }
  })

  return user
}

export const UserService = {
  findUserByCpf,
  findUserById,
  updateUser
}