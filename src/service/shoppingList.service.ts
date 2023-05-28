import { NotFoundError } from "../error/NotFoundError"
import { InsertItemsOnShoppingList, ShoppingList } from "../interface"
import { prisma } from "../lib/prisma"
import { ProductService } from "./product.service"

const formatProductsToSave = (data: ShoppingList | InsertItemsOnShoppingList) => {
  const mappedList = data.products.map(item => {
    return {
      quantity: item.quantity,
      product: { connect: { id: item.id } }
    }
  })

  return mappedList
}


const createShoppingList = async (userId: string, data: ShoppingList) => {
  await ProductService.validateAllProducts(data.products)

  const products = formatProductsToSave(data)

  const result = await prisma.shoppingList.create({
    data: {
      name: data.name,
      user: { connect: { id: userId } },
      ProductsOnShoppingList: {
        create: products,
      }
    }
  })

  return result
}

const insertNewItemsOnShoppingList = async (userId: string, data: InsertItemsOnShoppingList) => {
  const { listId } = data

  await ProductService.validateAllProducts(data.products)

  const foundedList = await prisma.shoppingList.findFirst({
    where: { user_id: userId, id: listId }
  })

  if (!foundedList)
    throw new NotFoundError("Lista não encontrada")

  const products = formatProductsToSave(data)

  const result = await prisma.shoppingList.update({
    where: { id: listId },
    data: {
      ProductsOnShoppingList: {
        create: products,
      }
    }
  })
  return result
}

const getShoppingListByUserId = async (userId: string) => {
  const shoppingList = await prisma.shoppingList.findMany({
    where: { user_id: userId }
  })

  return shoppingList
}

const getShoppingListById = async (id: string) => {
  const shoppingList = await prisma.shoppingList.findUnique({
    where: { id },
    select: {
      name: true,
      id: true,
      ProductsOnShoppingList: {
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

  if (!shoppingList)
    throw new NotFoundError("Lista não encontrada")

  const mapped = shoppingList.ProductsOnShoppingList.map(item => {
    return {
      id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: Number(item.product.price)
    }
  })

  const obj = {
    ...shoppingList,
    ProductsOnShoppingList: undefined,
    products: mapped
  }

  return obj
}

export const ShoppingListService = {
  createShoppingList,
  getShoppingListById,
  getShoppingListByUserId,
  insertNewItemsOnShoppingList
}