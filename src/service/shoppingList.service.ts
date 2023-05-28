import { throws } from "assert"
import { NotFoundError } from "../error/NotFoundError"
import { InsertItemsOnShoppingList, ShoppingList } from "../interface"
import { prisma } from "../lib/prisma"
import { ProductService } from "./product.service"
import { BadRequestError } from "../error/BadRequestError"

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

const deleteShoppingList = async (id: string) => {
  const result = await prisma.shoppingList.delete({
    where: {
      id
    }
  })
    .catch(() => {
      throw new BadRequestError("Parametros inválidos")
    })

  return result
}

const getShoppingListByUserId = async (userId: string) => {
  const shoppingList = await prisma.shoppingList.findMany({
    where: { user_id: userId },
    include: {
      _count: {
        select: {
          ProductsOnShoppingList: true
        }
      }
    }
  })

  const mappedList = shoppingList.map(({ id, name, user_id, _count, date }) => {
    return {
      id,
      name,
      date,
      userId: user_id,
      length: _count.ProductsOnShoppingList
    }
  })

  return mappedList
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

const insertOrUpdateItems = async (userId: string, data: InsertItemsOnShoppingList) => {
  const { products, listId } = data

  const promises = products.map(({ id, quantity }) => {
    return prisma.productsOnShoppingList.upsert({
      where: {
        product_id_shopping_list_id: {
          shopping_list_id: listId,
          product_id: id
        }
      },
      create: {
        quantity,
        shopping_list_id: listId,
        product_id: id,
      },
      update: {
        quantity,
      },
    });
  });

  const result = await Promise.all(promises)

  return result
}

export const ShoppingListService = {
  createShoppingList,
  deleteShoppingList,
  getShoppingListById,
  getShoppingListByUserId,
  insertOrUpdateItems
}