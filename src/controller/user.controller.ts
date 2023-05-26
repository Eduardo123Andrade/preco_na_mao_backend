import httpStatus from 'http-status';
import { FastifyReply, FastifyRequest } from "fastify"
import { validateUpdateUserBodySchema } from "../validation"
import { UserService } from '../service';


const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const userData = validateUpdateUserBodySchema(request.body)

  const { sub: userId } = request.user
  const user = await UserService.updateUser(userId, userData)

  reply.status(httpStatus.OK).send({ user })
}


export const UserController = {
  updateUser,
}