import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import httpStatus from "http-status";
import { SessionToken } from "../service";



const verifyUserToken = async (request: FastifyRequest, done: HookHandlerDoneFunction) => {
  const { sub: userId } = request.user
  const bearToken = request.headers.authorization ?? ""

  const [, token] = bearToken.split(" ")

  await SessionToken.validateToken({ token, userId })
  done()
}

export const onRequestHook = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const path = request.routerPath

  if (path === "/auth/sign-up" || path === "/auth/login")
    return done()

  request.jwtVerify()
    .then(() => verifyUserToken(request, done))
    .catch(() => {
      reply.status(httpStatus.UNAUTHORIZED).send({ message: "Faça login e tente novamente" })
    })
}