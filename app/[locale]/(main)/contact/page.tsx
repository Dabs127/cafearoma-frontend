"use client";

import { sendEmailToAdmin } from "@/actions/users/usersActions";
import ContactMap from "@/partials/contact/ContactMap";
import {
  ContactValues,
  getContactFormSchema,
} from "@/schemas/contact/ContactFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const validationMessages = useTranslations("ContactPage.formValidation");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(getContactFormSchema(validationMessages)),
  });

  const t = useTranslations("ContactPage");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {success } = await sendEmailToAdmin(data);

    if (!success) {
      toast.error(t("errorMessage"), {
        richColors: true,
        position: "top-center",
      });
      return;
    }

    toast.success(t("successMessage"), {
      richColors: true,
      position: "top-center",
    });

    // Reset form fields after submission
    reset({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <main className="w-5/6 h-full mx-auto flex flex-col items-center mt-10">
      <section className="w-full text-secondary flex flex-col gap-x-8 items-center text-center mb-20 md:flex md:flex-row md:justify-between md:text-left">
        <div className="w-full flex flex-col items-center justify-start md:items-start">
          <h1 className="text-3xl">{t("title")}</h1>
          <h2 className="text-2xl my-5">{t("description")}</h2>
          <p>{t("email")}</p>
          <p>{t("phone")}</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-10">
          <form
            className="space-y-6 flex flex-col items-end w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className={`w-full border-b-2 ${
                errors.name ? "border-2 border-red-500" : "border-b-text-muted"
              } p-2`}
              placeholder={t("form.name")}
              {...register("name")}
            />
            <p className="min-w-full min-h-4 text-red-500">
              {errors.name?.message}
            </p>
            <input
              className={`w-full border-b-2 ${
                errors.email ? "border-2 border-red-500" : "border-b-text-muted"
              } p-2`}
              placeholder={t("form.email")}
              {...register("email")}
            />
            <p className="min-w-full min-h-4 text-red-500">
              {errors.email?.message}
            </p>
            <textarea
              className={`w-full border-b-2 ${
                errors.message
                  ? "border-2 border-red-500"
                  : "border-b-text-muted"
              } p-2`}
              placeholder={t("form.message")}
              rows={8}
              {...register("message")}
            />
            <p className="min-w-full min-h-4 text-red-500">
              {errors.message?.message}
            </p>

            <button
              type="submit"
              className="w-1/2 p-4 rounded-xl font-semibold bg-accent text-white cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              {t("form.submitButton")}
            </button>
          </form>
        </div>
      </section>
      <ContactMap />
      <div className="mt-10 mb-40">
        <p className="text-secondary">
          José María Morelos 855, Barrio Antiguo, Centro, 64000 Monterrey, N.L.
        </p>
      </div>
    </main>
  );
}
