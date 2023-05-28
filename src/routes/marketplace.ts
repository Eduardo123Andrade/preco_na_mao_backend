import { FastifyInstance } from "fastify";
import { MarketplaceController } from "../controller";


export const marketplaceRoutes = async (app: FastifyInstance) => {
  app.get("/marketplace", MarketplaceController.listAll)
}