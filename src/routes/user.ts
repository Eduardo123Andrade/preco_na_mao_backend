import { FastifyInstance } from "fastify";
import { UserController } from "../controller";



export const userRoutes = async (app: FastifyInstance) => {
  app.put("/user/update-password", UserController.updatePassword)
  app.put("/user/update", UserController.updateUser)
  app.post("/user/password-validation", UserController.passwordValidation)

}