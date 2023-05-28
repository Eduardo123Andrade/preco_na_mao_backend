import { ShoppingListProducts } from "./shoppingListProducts.interface"

export interface InsertItemsOnShoppingList {
  listId: string
  products: ShoppingListProducts[]
}