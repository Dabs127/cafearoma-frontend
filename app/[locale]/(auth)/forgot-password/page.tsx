"use client";

import { forgotPassword } from "@/actions/users/usersActions";
import {
  ForgotPasswordValues,
  getForgotPasswordFormSchema,
} from "@/schemas/auth/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {};

const ForgotPasswordPage = (props: Props) => {
  const validationMessages = useTranslations("ForgotPasswordPage.formValidation");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(getForgotPasswordFormSchema(validationMessages)),
  });

  const t = useTranslations("ForgotPasswordPage");

  const onSubmit = async (data: ForgotPasswordValues) => {
    const {success} = await forgotPassword(data);

    if (!success) {
      toast.error(t("errorMessage") || "Correo mandado con exito", {
        richColors: true,
        position: "top-center",
      });
      return;
    }

    toast.success(t("successMessage"), {
      richColors: true,
      position: "top-center",
    });
    

    console.log("Todo con exito");
  };

  return (
    <div className="w-full h-auto bg-secondary mt-1 p-5 z-10 rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-auto flex flex-col justify-center "
      >
        <input
          type="text"
          className={`w-full p-2 border ${
            errors.email?.message
              ? "border border-red-500"
              : "border-text-muted"
          } bg-white rounded-md `}
          placeholder={t("form.email")}
          {...register("email")}
        />
        <p className="min-w-full min-h-8 text-red-500">
          {errors.email?.message}
        </p>
        <button
          type="submit"
          className="p-4 rounded-2xl bg-accent text-white cursor-pointer"
        >
          {t("form.submitButton")}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
