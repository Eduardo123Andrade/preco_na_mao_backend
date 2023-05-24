import { FastifyInstance } from "fastify"
import { AuthController } from "../controller"


export const authRoutes = async (app: FastifyInstance) => {
  app.post("/auth/sing-up", AuthController.singUp)

  app.post("/auth/login", AuthController.login)

}