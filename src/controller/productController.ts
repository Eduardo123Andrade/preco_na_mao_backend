import { FastifyReply } from "fastify"
import { FastifyRequest } from "fastify/types/request"
import { ProductService } from "../service"
import httpStatus from "http-status"



const listProductsByMarketplaceId = async (request: FastifyRequest, reply: FastifyReply) => {
  const { marketplaceId } = request.params as any

  const products = await ProductService.getProductsByMarketplaceId(marketplaceId)

  return reply.status(httpStatus.OK).send(products)

}

export const ProductController = {
  listProductsByMarketplaceId
}