import z from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const categories = [
  "cafes",
  "postres",
  "desayunos",
  "comida",
  "jugos",
] as const;

export function getUpdateMenuItemFormSchema(t?: (key: string) => string) {
  return z.object({
    name: z
      .string()
      .nonempty(t ? t("nameRequired") : "Nombre del platillo es requerido"),
    price: z.coerce
      .number({
        required_error: t ? t("priceRequired") : "El precio es obligatorio",
        invalid_type_error: t ? t("priceInvalidType") : "Debe ser un número",
      })
      .positive(t ? t("pricePositive") : "Debe ser un número positivo"),
    category: z.enum(categories, {
      errorMap: () => ({
        message: t
          ? t("categoryInvalid")
          : "Categoría del platillo es inválida",
      }),
    }),
    description: z
      .string()
      .nonempty(
        t ? t("descriptionRequired") : "Descripción del platillo es requerida"
      ),
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
      }).optional(),
  });
}

export type UpdateMenuItemValues = z.output<
  ReturnType<typeof getUpdateMenuItemFormSchema>
>;
