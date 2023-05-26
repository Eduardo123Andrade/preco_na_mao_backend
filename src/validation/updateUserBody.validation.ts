import { z } from "zod";
import { UpdateUser } from "../interface";


export const validateUpdateUserBodySchema = (data: unknown): UpdateUser => {
  const bodySchema = z.object({
    name: z.string(),
    phoneNumber: z.string()
  })

  const loginData = bodySchema.parse(data)

  return loginData
}