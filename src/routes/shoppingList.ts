import { FastifyInstance } from "fastify";
import { ShoppingListController } from "../controller";



export const shoppingListRoutes = async (app: FastifyInstance) => {
  app.get("/shopping-list", ShoppingListController.getAllList)
  app.get("/shopping-list/:shoppingListId", ShoppingListController.getListById)

  app.delete("/shopping-list/:shoppingListId", ShoppingListController.deleteShoppingList)

  app.post("/shopping-list", ShoppingListController.create)
  app.put("/shopping-list", ShoppingListController.insertItemsOnShoppingList)
}