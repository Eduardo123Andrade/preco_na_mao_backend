import { FastifyInstance } from "fastify";
import { ShoppingListController } from "../controller";



export const marketplaceRoutes = async (app: FastifyInstance) => {
  app.get("/shopping-list", ShoppingListController.getAllList)
  app.get("/shopping-list/:shoppingListId", ShoppingListController.getListById)

  app.post("/shopping-list", ShoppingListController.create)
  app.put("/shopping-list", ShoppingListController.insertItemsOnShoppingList)
}