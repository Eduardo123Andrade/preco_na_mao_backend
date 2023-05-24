import { z } from "zod";
import { Login } from "../interface";
import { validateCPF } from "../utils/validations";


export const validateLoginBodySchema = (data: unknown): Login => {
  const bodySchema = z.object({
    cpf: z.string().refine(validateCPF),
    password: z.string().min(6),
  })

  const loginData = bodySchema.parse(data)

  return loginData
}