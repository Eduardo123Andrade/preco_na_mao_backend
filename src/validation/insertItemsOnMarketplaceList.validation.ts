import { z } from "zod";
import { InsertItemsOnMarketplaceList } from "../interface";

export const validateInsertItemsMarketPlaceListBodySchema = (data: unknown): InsertItemsOnMarketplaceList => {
  const bodySchema = z.object({
    listId: z.string(),
    products: z.array(z.object({
      id: z.string(),
      quantity: z.number().gte(0)
    })).min(1)
  })

  const loginData = bodySchema.parse(data)

  return loginData
}