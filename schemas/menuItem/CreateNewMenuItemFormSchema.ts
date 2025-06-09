import z from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const CreateNewMenuItemFormSchema = z.object({
  name: z.string().nonempty("Nombre del platillo es requerido"),
  price: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number({
        invalid_type_error: "El precio debe ser un número",
      })
      .positive("Precio del platillo debe ser un número positivo")
  ),
  category: z.enum(["cafes", "postres", "desayunos", "comida", "jugos"]),
  description: z.string().nonempty("Descripción del platillo es requerida"),
  image: z
    .custom<File>((file) => file instanceof File && file.size > 0, {
      message: "Imagen del platillo es requerida",
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
