import { FastifyInstance } from "fastify";
import { ProductController } from "../controller";



export const productRoutes = async (app: FastifyInstance) => {
  app.get("/product/:marketplaceId", ProductController.listProductsByMarketplaceId)
}