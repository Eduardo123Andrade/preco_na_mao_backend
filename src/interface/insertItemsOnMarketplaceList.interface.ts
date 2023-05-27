import { MarketplaceProducts } from "./marketplaceProducts.interface"

export interface InsertItemsOnMarketplaceList {
  listId: string
  products: MarketplaceProducts[]
}