import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import { z } from "zod"
import { validateCPF } from "../utils/validations"
import httpStatus from "http-status"
import { formatValidationError } from "../utils"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/auth/sing-up", async (request, reply) => {

    const bodySchema = z.object({
      cpf: z.string().refine(validateCPF, "CPF inválido"),
      name: z.string(),
      password: z.string().min(6),
      phoneNumber: z.string().length(11)
    })

    const result = bodySchema.safeParse(request.body)

    if (!result.success) {
      const { message } = result.error
      const errors = formatValidationError(message)
      return reply.status(httpStatus.BAD_REQUEST).send({ message: "Erro de validação", errors })
    }
    const { data } = result

    try {
      const user = await prisma.user.create({ data })
      return reply.status(201).send({ user })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(JSON.stringify(error, null, 2))
        if (error.code === "P2002")
          reply.status(httpStatus.BAD_REQUEST).send({ message: "Usuario já cadastrado" })
      }
    }
  })

  app.post("/auth/login", async (request, reply) => {
    const bodySchema = z.object({
      cpf: z.string().refine(validateCPF),
      password: z.string().min(6),
    })

    const { cpf, password } = bodySchema.parse(request.body)
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          cpf,
          password
        }
      })

      return reply.status(200).send({ user })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(JSON.stringify(error, null, 2))
        if (error.code === "P2025")
          reply.status(httpStatus.BAD_REQUEST).send({ message: "Login ou senha invalido" })
      }
    }
  })

}