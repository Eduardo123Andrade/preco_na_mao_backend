import { FastifyReply, FastifyRequest } from "fastify";
import httpStatus from 'http-status';
import { MarketplaceListService } from "../service";
import { validateInsertItemsMarketPlaceListBodySchema, validateMarketPlaceListBodySchema } from "../validation";


const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub: userId } = request.user
  const marketplaceListData = validateMarketPlaceListBodySchema(request.body)

  const marketplaceList = await MarketplaceListService.createMarketplaceList(userId, marketplaceListData)

  return reply.status(httpStatus.OK).send(marketplaceList)
}

const getAllList = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub: userId } = request.user

  const marketplaceList = await MarketplaceListService.getMarketplaceListByUserId(userId)

  return reply.status(httpStatus.OK).send(marketplaceList)
}

const getListById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { marketplaceListId } = request.params as any

  const marketplaceList = await MarketplaceListService.getMarketplaceListById(marketplaceListId)

  return reply.status(httpStatus.OK).send(marketplaceList)
}

const insertItemsOnMarketplaceList = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub: userId } = request.user
  const marketplaceListData = validateInsertItemsMarketPlaceListBodySchema(request.body)
  const { marketplaceListId } = request.params as any

  const marketplaceList = await MarketplaceListService.insertNewItemsOnMarketplaceList(userId, marketplaceListData)

  return reply.status(httpStatus.OK).send(marketplaceList)
}

export const MarketplaceListController = {
  create,
  getAllList,
  getListById,
  insertItemsOnMarketplaceList
}