import { z } from "zod";
import { UpdatePassword } from "../interface";


export const validateUpdatePasswordBodySchema = (data: unknown): UpdatePassword => {
  const bodySchema = z.object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    oldPassword: z.string().min(6),
  })

  const loginData = bodySchema.parse(data)

  return loginData
}