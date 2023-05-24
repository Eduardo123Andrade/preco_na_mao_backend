import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import { z } from "zod"
import { validateCPF } from "../utils/validations"
import { AuthController } from "../controller"


export const authRoutes = async (app: FastifyInstance) => {
  app.post("/auth/sing-up", AuthController.singUp)

  app.post("/auth/login", async (request, reply) => {
    const bodySchema = z.object({
      cpf: z.string().refine(validateCPF),
      password: z.string().min(6),
    })

    const { cpf, password } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirstOrThrow({
      where: {
        cpf,
        password
      }
    })

    return reply.status(200).send({ user })
  })

}