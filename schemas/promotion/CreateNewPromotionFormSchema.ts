import { z } from "zod";

export const CreateNewPromotionFormSchema = z.object({
  endDate: z.string().date(),
  longDescription: z.string(),
  shortDescription: z.string(),
  startDate: z.string().date(),
  authenticationRequired: z.boolean(),
  title: z.string(),
  image: z
    .custom<File>((file) => file instanceof File && file.size > 0, {
      message: "Imagen de la promoción es requerida",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "La imagen no debe exceder los 5MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
          file.type
        ),
      {
        message: "Formato de imagen no soportado (solo JPEG, PNG, WEBP, JPG)",
      }
    ),
}).superRefine((val, ctx) => {
  console.log(val)
});
