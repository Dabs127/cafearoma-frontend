import { z } from "zod";

export const RegisterUserFormSchema = z
  .object({
    username: z.string().nonempty("Nombre completo requerido"),
    email: z.string().nonempty("Correo requerido").email("Correo inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirm_password: z.string().nonempty("Confirmación requerida"),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });

export function getRegisterUserFormSchema(t?: (key: string) => string) {
  return z
    .object({
      username: z.string().nonempty(t ? t("fullNameRequired") : "Nombre completo requerido"),
      email: z.string().nonempty(t ? t("emailRequired") : "Correo requerido").email(t ? t("invalidEmail") : "Correo inválido"),
      password: z.string().min(6, t? t("minPasswordLength") : "Mínimo 6 caracteres"),
      confirm_password: z.string().nonempty(t ? t("confirmPasswordRequired") : "Confirmación requerida"),
      phone: z.string().optional(),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t ? t("matchingPasswords") : "Las contraseñas no coinciden",
      path: ["confirm_password"],
    });
}

export type RegisterUserValues = z.output<
  ReturnType<typeof getRegisterUserFormSchema>
>;
