import { z } from "zod";
import { SingUp } from "../interface";
import { validateCPF } from "../utils";

export const validateSingUpSchemaBody = (data: unknown): SingUp => {
  const bodySchema = z.object({
    cpf: z.string().refine(validateCPF, "CPF inválido"),
    name: z.string(),
    password: z.string().min(6),
    phoneNumber: z.string().length(11)
  })

  const result = bodySchema.parse(data)

  return result

}