import { z } from "zod";

export function getContactFormSchema(t?: (key: string) => string) {
  return z.object({
    name: z
      .string()
      .nonempty(t ? t("nameRequired") : "Nombre completo requerido"),
    email: z.string().email(t ? t("invalidEmail") : "Correo inválido"),
    message: z
      .string()
      .nonempty(t ? t("messageRequired") : "Mensaje requerido"),
  });
}

export type ContactValues = z.output<ReturnType<typeof getContactFormSchema>>;
