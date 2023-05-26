import { NotFoundError } from '../error/NotFoundError';
import { UnauthorizedError } from '../error/UnauthorizedError';
import { Login, SingUp } from '../interface';
import { prisma } from '../lib/prisma';
import { encoder } from '../utils/encoder';


const auth = async (data: SingUp) => {
  const password = await encoder.codify(data.password)
  const user = await prisma.user.create({
    data: {
      ...data,
      password
    }
  })

  return user
}

const findUser = async (cpf: string) => {
  const user = await prisma.user.findFirst({
    where: { cpf }
  })

  if (!user)
    throw new NotFoundError("Usuario não encontrado")

  return user
}

const login = async ({ cpf, password }: Login) => {
  const user = await findUser(cpf)

  const isValid = await encoder.verifyPassword(password, user?.password)

  if (!isValid)
    throw new UnauthorizedError("Login ou senha invalido")

  return user
}



export const SingUpService = {
  auth,
  login
}