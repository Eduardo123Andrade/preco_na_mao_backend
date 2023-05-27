import { z } from "zod";
import { MarketplaceList } from "../interface";


export const validateMarketPlaceListBodySchema = (data: unknown): MarketplaceList => {
  const bodySchema = z.object({
    name: z.string(),
    products: z.array(z.object({
      id: z.string(),
      quantity: z.number().gte(0)
    })).min(1)
  })

  const loginData = bodySchema.parse(data)

  return loginData
}