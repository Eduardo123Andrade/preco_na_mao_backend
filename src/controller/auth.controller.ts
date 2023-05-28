import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import httpStatus from "http-status";
import { SessionToken, AuthService } from "../service";
import { validateLoginBodySchema, validateSingUpSchemaBody } from "../validation";
import { userView } from "../view/userView";


const signUp = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = validateSingUpSchemaBody(request.body)

  const user = await AuthService.auth(data)

  const response = userView(user)

  return reply.status(httpStatus.CREATED).send(response)
}


const login = async (request: FastifyRequest, reply: FastifyReply, app: FastifyInstance) => {
  const loginData = validateLoginBodySchema(request.body)

  const user = await AuthService.login(loginData)

  const createdToken = app.jwt.sign({ name: user.name, }, { sub: user.id, expiresIn: "10 days" })

  const { token } = await SessionToken.createToken({ token: createdToken, userId: user.id })
  const response = userView(user)

  return reply.status(httpStatus.OK).send({ token, ...response })
}

const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub: userId } = request.user

  const { authorization } = request.headers

  if (!authorization)
    return reply.status(httpStatus.UNAUTHORIZED).send({ message: "Não autorizado" })

  const [, token] = authorization?.split(" ")

  const disabled = await SessionToken.disableToken({ token, userId })

  return reply.status(httpStatus.OK).send({ disabled })
}

export const AuthController = {
  signUp,
  login,
  logout
}