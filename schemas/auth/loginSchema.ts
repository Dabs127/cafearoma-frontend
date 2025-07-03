import { z } from "zod";

// export const LoginUserFormSchema = z.object({
//   email: z.string().email("Correo inválido"),
//   password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
// });

export function getLoginUserFormSchema(t?: (key: string) => string) {
  return z.object({
    email: z.string().email(t ? t("invalidEmail") : "Correo inválido"),
    password: z
      .string()
      .min(6, t? t("minPasswordLength") : "La contraseña debe tener al menos 6 caracteres"),
  });
}


export type LoginUserValues = z.output<
  ReturnType<typeof getLoginUserFormSchema>
>;
