import { z } from "zod";

export function getForgotPasswordFormSchema(t?: (key: string) => string) {
  return z.object({
    email: z.string().email(t ? t("invalidEmail") : "Correo inválido"),
  });
}


export type ForgotPasswordValues = z.output<
  ReturnType<typeof getForgotPasswordFormSchema>
>;
