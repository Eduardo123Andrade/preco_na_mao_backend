import httpStatus from 'http-status';
import { FastifyReply, FastifyRequest } from "fastify"
import { validateUpdatePasswordBodySchema, validateUpdateUserBodySchema } from "../validation"
import { UserService } from '../service';


const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const userData = validateUpdateUserBodySchema(request.body)

  const { sub: userId } = request.user
  const user = await UserService.updateUser(userId, userData)

  reply.status(httpStatus.OK).send({ user })
}

const updatePassword = async (request: FastifyRequest, reply: FastifyReply) => {
  const passwordData = validateUpdatePasswordBodySchema(request.body)
  const { sub: userId } = request.user

  const updated = await UserService.updatePassword(userId, passwordData)

  reply.status(httpStatus.OK).send({ updated })
}

export const UserController = {
  updateUser,
  updatePassword
}