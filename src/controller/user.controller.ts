import { FastifyReply, FastifyRequest } from "fastify";
import httpStatus from 'http-status';
import { UserService } from '../service';
import {
  validateCheckPasswordValidationBodySchema,
  validateUpdatePasswordBodySchema,
  validateUpdateUserBodySchema
} from "../validation";


const passwordValidation = async (request: FastifyRequest, reply: FastifyReply) => {
  const checkPasswordData = validateCheckPasswordValidationBodySchema(request.body)

  const { sub: userId } = request.user

  const isValid = await UserService.validatePassword(userId, checkPasswordData)

  reply.status(httpStatus.OK).send({ isValid })
}

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
  passwordValidation,
  updateUser,
  updatePassword
}