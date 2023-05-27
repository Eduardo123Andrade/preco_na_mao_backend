import { MarketplaceListProducts } from "./marketplaceListProducts.interface"

export interface InsertItemsOnMarketplaceList {
  listId: string
  products: MarketplaceListProducts[]
}