import { FastifyReply, FastifyRequest, } from "fastify"
import { MarketplaceService } from "../service"
import httpStatus from "http-status"


const listAll = async (_request: FastifyRequest, reply: FastifyReply) => {
  const marketplaceList = await MarketplaceService.listAll()

  return reply.status(httpStatus.OK).send(marketplaceList)
}


export const MarketplaceController = {
  listAll
}