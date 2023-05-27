import { NotFoundError } from "../error/NotFoundError"
import { prisma } from "../lib/prisma"



const getMarketplaceListByUserId = async (userId: string) => {
  const marketplaceList = await prisma.marketplaceList.findMany({
    where: { user_id: userId }
  })

  return marketplaceList
}

const getMarketplaceListById = async (id: string) => {

  const marketplaceList = await prisma.marketplaceList.findUnique({
    where: { id },
    select: {
      name: true,
      id: true,
      ProductsOnMarketplaceList: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true
            }
          }
        },
      },
    },
  })

  if (!marketplaceList)
    throw new NotFoundError("Lista não encontrada")

  const mapped = marketplaceList.ProductsOnMarketplaceList.map(item => {
    return {
      id: item.product.id,
      name: item.product.name,
      quantity: item.quantity
    }
  })

  const obj = {
    ...marketplaceList,
    ProductsOnMarketplaceList: undefined,
    products: mapped
  }

  return obj
}


export const MarketplaceListService = {
  getMarketplaceListById,
  getMarketplaceListByUserId
}