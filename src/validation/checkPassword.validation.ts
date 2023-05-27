import { z } from "zod";
import { CheckPassword } from "../interface";


export const validateCheckPasswordValidationBodySchema = (data: unknown): CheckPassword => {
  const bodySchema = z.object({
    password: z.string().min(6),
  })

  const loginData = bodySchema.parse(data)

  return loginData
}