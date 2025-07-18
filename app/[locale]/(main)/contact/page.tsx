"use client";

import ContactMap from "@/partials/contact/ContactMap";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const t = useTranslations("ContactPage");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <main className="w-5/6 h-full mx-auto flex flex-col items-center mt-10">
      <section className="w-full text-secondary flex flex-col items-center text-center mb-20 md:flex md:flex-row md:justify-between md:text-left">
        <div className="w-full flex flex-col items-center justify-start md:items-start">
          <h1 className="text-3xl">
            {t("title")}
          </h1>
          <h2 className="text-2xl my-5">
            {t("description")}
          </h2>
          <p>{t("email")}</p>
          <p>{t("phone")}</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-10">
          <form
            className="space-y-6 flex flex-col items-end w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="w-full border-b-2 border-b-text-muted p-2"
              placeholder={t("form.name")}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
            <input
              className="w-full border-b-2 border-b-text-muted p-2"
              placeholder={t("form.email")}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
            <textarea
              className="w-full border-2 rounded-2xl p-2 border-text-muted"
              placeholder={t("form.message")}
              rows={8}
              {...register("message", { required: true })}
            />
            {errors.message && (
              <span className="text-red-500">Este campo es requerido</span>
            )}

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
          Av. Universidad 123, Ciudad Universitaria, Coyoacán, 04510 Ciudad de
          México, CDMX
        </p>
      </div>
    </main>
  );
}
