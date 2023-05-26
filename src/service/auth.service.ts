import { UnauthorizedError } from '../error/UnauthorizedError';
import { Login, SingUp } from '../interface';
import { prisma } from '../lib/prisma';
import { encoder } from '../utils/encoder';
import { UserService } from './user.service';


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

const login = async ({ cpf, password }: Login) => {
  const user = await UserService.findUserByCpf(cpf)

  const isValid = await encoder.verifyPassword(password, user?.password)

  if (!isValid)
    throw new UnauthorizedError("Login ou senha invalido")

  return user
}



export const AuthService = {
  auth,
  login
}