import { User } from "prisma/prisma-client";
import { z } from "zod"
import { validateCPF } from "../utils/validations";
import { UserData } from "../interface";

export const validateSingUpBody = (data: unknown): UserData => {
  const bodySchema = z.object({
    cpf: z.string().refine(validateCPF, "CPF inválido"),
    name: z.string(),
    password: z.string().min(6),
    phoneNumber: z.string().length(11)
  })

  const result = bodySchema.parse(data)

  return result

}