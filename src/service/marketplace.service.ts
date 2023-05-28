import { prisma } from "../lib/prisma"


const listAll = async () => {
  const marketplaceList = await prisma.marketplace.findMany()
  console.log({ marketplaceList })

  return marketplaceList
}

export const MarketplaceService = {
  listAll
}