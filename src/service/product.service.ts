import { BadRequestError } from '../error/BadRequestError';
import { MarketplaceListProducts } from '../interface/shoppingListProducts.interface';
import { prisma } from '../lib/prisma';


const validateAllProducts = async (list: MarketplaceListProducts[]) => {
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
  validateAllProducts
}