import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FastifyReply, FastifyRequest } from "fastify";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { formatValidationError } from "../utils";


type CustomError = PrismaClientKnownRequestError | ZodError

const getTargetElement = (error: PrismaClientKnownRequestError) => {
  const { meta } = error
  const { target = [] } = meta as Record<string, string>
  const [targetElement] = target
  return targetElement
}

const prismaError = (error: PrismaClientKnownRequestError, reply: FastifyReply) => {
  switch (error.code) {
    case "P2002":
      const target = getTargetElement(error)
      if (target === "cpf")
        return reply.status(httpStatus.BAD_REQUEST).send({ message: "Usuario já cadastrado" })

    case "P2025":
      return reply.status(httpStatus.BAD_REQUEST).send({ message: "Login ou senha invalido" })

    default:
      console.log(JSON.stringify(error, null, 2))
      return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Erro desconhecido" })
  }
}

const zodError = (error: ZodError, reply: FastifyReply) => {
  const errors = formatValidationError(error.issues)
  return reply.status(httpStatus.BAD_REQUEST).send({ message: "Dados invalidos", errors })
}

export const errorHandler = (error: CustomError | ZodError, _: FastifyRequest, reply: FastifyReply) => {
  console.log(JSON.stringify(error, null, 2))

  if (error instanceof PrismaClientKnownRequestError)
    prismaError(error, reply)
  if (error instanceof ZodError) {
    zodError(error, reply)
  }

  return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Erro desconhecido" })
}