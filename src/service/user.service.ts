import { BadRequestError } from "../error/BadRequestError"
import { NotFoundError } from "../error/NotFoundError"
import { UnauthorizedError } from "../error/UnauthorizedError"
import { CheckPassword, UpdatePassword, UpdateUser } from "../interface"
import { prisma } from "../lib/prisma"
import { encoder } from "../utils/encoder"


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

const updatePassword = async (userId: string, data: UpdatePassword) => {
  const user = await findUserById(userId)
  const { oldPassword, password, confirmPassword } = data

  await verifyPassword(oldPassword, user.password)

  if (password !== confirmPassword)
    throw new BadRequestError("Dados inválidos")

  const encryptedPassword = await encoder.codify(password)
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { password: encryptedPassword }
  })

  return !!updatedUser
}

const updateUser = async (userId: string, data: UpdateUser) => {
  const user = prisma.user.update({
    where: { id: userId },
    data: { ...data }
  })

  return user
}

const verifyPassword = async (password: string, encryptedPassword: string) => {
  const isValid = await encoder.verifyPassword(password, encryptedPassword)

  if (!isValid)
    throw new UnauthorizedError("Senha invalida")

  return isValid
}

const validatePassword = async (userId: string, { password }: CheckPassword) => {
  const user = await findUserById(userId)
  await verifyPassword(password, user.password)

  return true
}

export const UserService = {
  findUserByCpf,
  findUserById,
  updatePassword,
  updateUser,
  validatePassword
}