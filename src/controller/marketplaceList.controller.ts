import { FastifyReply, FastifyRequest } from "fastify";
import httpStatus from 'http-status';
import { MarketplaceListService } from "../service";

interface RouterParams {
  marketplaceListId: string
}

interface CustomRequest extends FastifyRequest {
  params: RouterParams
}

const getAllList = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub: userId } = request.user

  const marketplaceList = await MarketplaceListService.getMarketplaceListByUserId(userId)

  return reply.status(httpStatus.OK).send(marketplaceList)
}

const getListById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub: userId } = request.user
  const { marketplaceListId } = request.params as any
  console.log({ marketplaceListId })

  const marketplaceList = await MarketplaceListService.getMarketplaceListById(marketplaceListId)

  return reply.status(httpStatus.OK).send(marketplaceList)
}

export const MarketplaceListController = {
  getAllList,
  getListById
}