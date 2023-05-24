import { Login, SingUp } from '../interface';
import { prisma } from '../lib/prisma';


const auth = async (data: SingUp) => {
  const user = await prisma.user.create({ data })

  return user
}

const login = async (login: Login) => {
  const { cpf, password } = login
  const user = await prisma.user.findFirstOrThrow({
    where: { cpf, password }
  })

  return user
}



export const SingUpService = {
  auth,
  login
}