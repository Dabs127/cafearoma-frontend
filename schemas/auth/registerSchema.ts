import { z } from "zod"

export const RegisterUserFormSchema = z.object({
    username: z.string().nonempty("Nombre completo requerido"),
    email: z.string().nonempty("Correo requerido").email("Correo inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirm_password: z.string().nonempty("Confirmación requerida"),
    phone: z.string().optional(),
}).refine((data) => data.password === data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
})