"use client";

import { resetPassword } from "@/actions/users/usersActions";
import {
  getResetPasswordFormSchema,
  ResetPasswordValues,
} from "@/schemas/auth/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";


const ResetPasswordPage = () => {
  const validationMessages = useTranslations(
    "ResetPasswordPage.formValidation"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(getResetPasswordFormSchema(validationMessages)),
  });

  const t = useTranslations("ResetPasswordPage");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  const onSubmit = async (data: ResetPasswordValues) => {
    const result = await resetPassword(data, {
      id: userId || "",
      token: token || "",
    });

    if (!result.success) return;

    redirect("/login");
  };

  return (
    <div className="w-full h-auto bg-secondary mt-1 p-5 z-10 rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-auto flex flex-col justify-center "
      >
        <input
          type="password"
          className={`w-full p-2 border ${
            errors.password?.message
              ? "border border-red-500"
              : "border-text-muted"
          } bg-white rounded-md`}
          placeholder={t("form.password")}
          {...register("password")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.password?.message}
        </p>
        <input
          type="password"
          className={`w-full p-2 border ${
            errors.confirm_password?.message
              ? "border border-red-500"
              : "border-text-muted"
          } bg-white rounded-md`}
          placeholder={t("form.confirmPassword")}
          {...register("confirm_password")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.confirm_password?.message}
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

export default ResetPasswordPage;
