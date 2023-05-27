import { NotFoundError } from "../error/NotFoundError"
import { InsertItemsOnMarketplaceList, MarketplaceList } from "../interface"
import { prisma } from "../lib/prisma"

const formatProductsToSave = (data: MarketplaceList | InsertItemsOnMarketplaceList) => {
  const mappedList = data.products.map(item => {
    return {
      quantity: item.quantity,
      product: { connect: { id: item.id } }
    }
  })

  return mappedList
}


const createMarketplaceList = async (userId: string, data: MarketplaceList) => {
  const products = formatProductsToSave(data)

  const result = await prisma.marketplaceList.create({
    data: {
      name: data.name,
      user: { connect: { id: userId } },
      ProductsOnMarketplaceList: {
        create: products,
      }
    }
  })

  return result
}

const insertNewItemsOnMarketplaceList = async (userId: string, data: InsertItemsOnMarketplaceList) => {
  const { listId } = data

  console.log({
    listId,
    userId
  })

  const foundedList = await prisma.marketplaceList.findFirst({
    where: { user_id: userId, id: listId }
  })

  if (!foundedList)
    throw new NotFoundError("Lista não encontrada")

  const products = formatProductsToSave(data)


  const result = await prisma.marketplaceList.update({
    where: { id: listId },
    data: {
      ProductsOnMarketplaceList: {
        create: products,
      }
    }
  })
  return result
}

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
              name: true,
              price: true
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
      quantity: item.quantity,
      price: Number(item.product.price)
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
  createMarketplaceList,
  getMarketplaceListById,
  getMarketplaceListByUserId,
  insertNewItemsOnMarketplaceList
}