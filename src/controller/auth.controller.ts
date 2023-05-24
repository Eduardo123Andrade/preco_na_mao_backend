import { FastifyReply, FastifyRequest } from "fastify";
import { SingUpService } from "../service";
import { validateSingUpBody } from "../validation";


const singUp = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = validateSingUpBody(request.body)

  const user = await SingUpService.auth(data)

  return reply.status(201).send({ user })
}


export const AuthController = {
  singUp,
}