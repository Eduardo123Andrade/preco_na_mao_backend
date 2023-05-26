import { z } from "zod";
import { UpdateUser } from "../interface";


export const validateUpdateUserBodySchema = (data: unknown): UpdateUser => {
  const bodySchema = z.object({
    name: z.string(),
    phoneNumber: z.string().length(11)
  })

  const loginData = bodySchema.parse(data)

  return loginData
}