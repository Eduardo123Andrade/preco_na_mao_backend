import { prisma } from "../lib/prisma"
import { UnauthorizedError } from "../error/UnauthorizedError"

interface CreateTokenData {
  token: string
  userId: string
}

const createToken = async ({ token, userId }: CreateTokenData) => {
  const savedToken = await prisma.sessionToken.create({
    data: {
      token,
      user_id: userId
    }
  })
  return savedToken
}

const findValidToken = async ({ token, userId }: CreateTokenData) => {
  const foundedToken = await prisma.sessionToken.findFirst({
    where: {
      token: token,
      user_id: userId,
      isValid: true
    }
  })
  if (!foundedToken)
    throw new UnauthorizedError("Faça login e tente novamente")

  return foundedToken
}

const validateToken = async (data: CreateTokenData) => {
  const foundedToken = await findValidToken(data)

  return !!foundedToken
}

const disableToken = async (data: CreateTokenData) => {
  const { id } = await findValidToken(data)

  const { isValid } = await prisma.sessionToken.update({
    where: { id },
    data: { isValid: false }
  })

  return !isValid
}


export const SessionToken = {
  createToken,
  disableToken,
  validateToken
}