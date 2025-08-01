"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getRegisterUserFormSchema,
  RegisterUserValues,
} from "@/schemas/auth/registerSchema";
import { registerUser } from "@/actions/users/usersActions";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { redirect } from "@/i18n/navigation";


export default function RegisterPage() {
  const validationMessages = useTranslations("RegisterPage.formValidation");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserValues>({
    resolver: zodResolver(getRegisterUserFormSchema(validationMessages)),
  });

  const t = useTranslations("RegisterPage");
  const pathName = usePathname();

  const [weAreInLoginForm, setWeAreInLoginForm] = useState<boolean>(false);

  const handleClick = () => {
    setWeAreInLoginForm(!weAreInLoginForm);
  };

  const onSubmit = async (data: any) => {
    const response = await registerUser(data);

    if (!response.success) {
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

    redirect({ href: "/login", locale: pathName.split("/")[1] });
  };

  return (
    <div className="w-full h-auto bg-secondary mt-1 p-5 z-10 rounded-2xl">
      {/* <div
        className={`bg-accent border-b-2 border-b-accent w-1/2 h-2/4 absolute z-0 rounded-2xl transition duration-300 ease-in-out ${
          pathName === "/es/iniciar-sesion" || pathName === "/en/login"
            ? "transform translate-x-2/2"
            : ""
        }`}
      ></div> */}
      <div className="w-full h-auto bg-secondary rounded-t-xl z-0">
        <Link href="/register" replace prefetch={true}>
          <button
            className="w-1/2 h-15  text-white text-lg  cursor-pointer"
            onClick={handleClick}
          >
            {t("titleRegister")}
          </button>
        </Link>
        <Link href="/login" replace prefetch={true}>
          <button
            className="w-1/2 h-15 text-white text-lg  cursor-pointer"
            onClick={handleClick}
          >
            {t("titleLogin")}
          </button>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-auto space-y-2 flex flex-col justify-center "
      >
        <input
          type="text"
          className={`w-full p-2 border ${
            errors.username?.message
              ? "border border-red-500"
              : "border-text-muted"
          } bg-white rounded-md`}
          placeholder={t("form.name")}
          {...register("username")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.username?.message}
        </p>
        <input
          type="text"
          className={`w-full p-2 border ${
            errors.email?.message
              ? "border border-red-500"
              : "border-text-muted"
          } bg-white rounded-md`}
          placeholder={t("form.email")}
          {...register("email")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.email?.message}
        </p>
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
        <input
          type="text"
          className={`"w-full p-2 border ${
            errors.phone?.message
              ? "border border-red-500"
              : "border-text-muted"
          } bg-white rounded-md`}
          placeholder={t("form.phone")}
          {...register("phone")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.phone?.message}
        </p>
        {/* <p className="text-gray-300 text-center">
          {t("form.AcceptingTerms")}{" "}
          <Link href="#" className="underline">
            {t("form.termsAndConditions")}
          </Link>
        </p> */}
        <button
          type="submit"
          className="p-4 rounded-2xl bg-accent text-white cursor-pointer"
        >
          {t("form.registerButton")}
        </button>
      </form>
    </div>
  );
}
