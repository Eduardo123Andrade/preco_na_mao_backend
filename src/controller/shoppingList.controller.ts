import { FastifyReply, FastifyRequest } from "fastify";
import httpStatus from 'http-status';
import { ShoppingListService } from "../service";
import { validateInsertItemsMarketPlaceListBodySchema, validateMarketPlaceListBodySchema } from "../validation";


const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub: userId } = request.user
  const shoppingListData = validateMarketPlaceListBodySchema(request.body)

  const shoppingList = await ShoppingListService.createShoppingList(userId, shoppingListData)

  return reply.status(httpStatus.OK).send(shoppingList)
}

const getAllList = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub: userId } = request.user

  const shoppingList = await ShoppingListService.getShoppingListByUserId(userId)

  return reply.status(httpStatus.OK).send(shoppingList)
}

const getListById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { shoppingListId } = request.params as any

  const shoppingList = await ShoppingListService.getShoppingListById(shoppingListId)

  return reply.status(httpStatus.OK).send(shoppingList)
}

const insertItemsOnShoppingList = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub: userId } = request.user
  const shoppingListData = validateInsertItemsMarketPlaceListBodySchema(request.body)

  const shoppingList = await ShoppingListService.insertNewItemsOnShoppingList(userId, shoppingListData)

  return reply.status(httpStatus.OK).send(shoppingList)
}

export const ShoppingListController = {
  create,
  getAllList,
  getListById,
  insertItemsOnShoppingList
}