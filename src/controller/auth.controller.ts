import { FastifyReply, FastifyRequest } from "fastify";
import { SingUpService } from "../service";
import { validateLoginBodySchema, validateSingUpBody } from "../validation";


const singUp = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = validateSingUpBody(request.body)

  const user = await SingUpService.auth(data)

  return reply.status(201).send({ user })
}


const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const loginData = validateLoginBodySchema(request.body)

  const user = await SingUpService.login(loginData)

  return reply.status(200).send({ user })
}

export const AuthController = {
  singUp,
  login
}