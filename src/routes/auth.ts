import { FastifyInstance } from "fastify"
import { AuthController } from "../controller"


export const authRoutes = async (app: FastifyInstance) => {

  app.post("/auth/sign-up", AuthController.signUp)

  app.post("/auth/login", (request, response) => {
    return AuthController.login(request, response, app)
  })

  app.post("/auth/logout", AuthController.logout)
}