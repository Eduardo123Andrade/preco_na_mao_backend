import { FastifyInstance } from "fastify";
import { MarketplaceListController } from "../controller";



export const marketplaceRoutes = async (app: FastifyInstance) => {
  app.get("/marketplace-list", MarketplaceListController.getAllList)
  app.get("/marketplace-list/:marketplaceListId", MarketplaceListController.getListById)

  app.post("/marketplace-list", MarketplaceListController.create)

}