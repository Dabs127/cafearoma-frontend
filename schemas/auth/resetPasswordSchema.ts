import { z } from "zod";

export function getResetPasswordFormSchema(t?: (key: string) => string) {
  return z
    .object({
      password: z
        .string()
        .min(6, t ? t("minPasswordLength") : "Mínimo 6 caracteres"),
      confirm_password: z
        .string()
        .nonempty(t ? t("confirmPasswordRequired") : "Confirmación requerida"),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t ? t("matchingPasswords") : "Las contraseñas no coinciden",
      path: ["confirm_password"],
    });
}

export type ResetPasswordValues = z.output<
  ReturnType<typeof getResetPasswordFormSchema>
>;
