import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];


export const CreateNewPromotionFormSchema = z.object({
  endDate: z.string().date(),
  longDescription: z.string(),
  shortDescription: z.string(),
  startDate: z.string().date(),
  authenticationRequired: z.boolean(),
  title: z.string().nonempty(),
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
});

export function getCreateNewPromotionFormSchema(t?: (key: string) => string) {
  return z.object({
    endDate: z.string().date(t ? t("endDateRequired"): "Fecha es Inválida"),
    longDescription: z.string().nonempty(t ? t("longDescriptionRequired") : "La descripción larga es obligatoria"),
    shortDescription: z
      .string()
      .nonempty(t ? t("shortDescriptionRequired") : "La descripción corta es obligatoria"),
    startDate: z.string().date(t ? t("startDateRequired"): "Fecha es Inválida"),
    authenticationRequired: z.boolean(),
    title: z.string().nonempty(t ? t("titleRequired") : "E título es requerido"),
    image: z
      .custom<File>((file) => file instanceof File && file.size > 0, {
        message: t ? t("imageRequired") : "Imagen del platillo es requerida",
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: t ? t("imageMaxSize") : "La imagen no debe exceder los 5MB",
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: t
          ? t("imageInvalidType")
          : "Formato de imagen no soportado (solo JPEG, PNG, WEBP, JPG)",
      }),
  });
}

export type CreateNewPromotionValues = z.output<
  ReturnType<typeof getCreateNewPromotionFormSchema>
>;
