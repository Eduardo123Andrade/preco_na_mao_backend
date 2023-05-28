import { BadRequestError } from '../error/BadRequestError';
import { ShoppingListProducts } from '../interface/shoppingListProducts.interface';
import { prisma } from '../lib/prisma';


const getProductsByMarketplaceId = async (marketplaceId: string) => {
  const products = await prisma.product.findMany({
    where: { marketplace_id: marketplaceId }
  })

  return products
}

const validateAllProducts = async (list: ShoppingListProducts[]) => {
  const ids = list.map(item => item.id)

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: ids
      }
    }
  })

  if (ids.length !== products.length) {
    throw new BadRequestError("Items inválidos")
  }

  return products
}

export const ProductService = {
  getProductsByMarketplaceId,
  validateAllProducts
}