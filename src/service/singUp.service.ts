import { UserData } from '../interface';
import { prisma } from '../lib/prisma';


const auth = async (data: UserData) => {
  const user = await prisma.user.create({ data })

  return user
}



export const SingUpService = {
  auth
}