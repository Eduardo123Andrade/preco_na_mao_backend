import { User } from "prisma/prisma-client";
import { UserData } from "../interface";

export const userView = (user: User): UserData => {
  const { password, ...rest } = user

  return rest
}