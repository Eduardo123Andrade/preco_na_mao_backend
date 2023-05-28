import { z } from "zod";
import { ShoppingList } from "../interface";


export const validateShoppingListBodySchema = (data: unknown) => {
  const bodySchema = z.object({
    name: z.string(),
  })

  const loginData = bodySchema.parse(data)

  return loginData
}