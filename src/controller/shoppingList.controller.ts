import { FastifyReply, FastifyRequest } from "fastify";
import httpStatus from 'http-status';
import { ShoppingListService } from "../service";
import { validateInsertItemsShoppingListBodySchema, validateShoppingListBodySchema } from "../validation";


const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub: userId } = request.user
  const { name } = validateShoppingListBodySchema(request.body)

  const shoppingListData = { name, products: [] }

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
  const shoppingListData = validateInsertItemsShoppingListBodySchema(request.body)

  const shoppingList = await ShoppingListService.insertOrUpdateItems(userId, shoppingListData)

  return reply.status(httpStatus.OK).send(shoppingList)
}

export const ShoppingListController = {
  create,
  getAllList,
  getListById,
  insertItemsOnShoppingList
}