import { FastifyInstance } from "fastify";
import { UserController } from "../controller";



export const userRoutes = async (app: FastifyInstance) => {
  app.put("/user/update", UserController.updateUser)
}