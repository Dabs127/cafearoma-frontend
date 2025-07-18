"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRegisterUserFormSchema, RegisterUserFormSchema, RegisterUserValues } from "@/schemas/auth/registerSchema";
import { registerUser } from "@/actions/users/usersActions";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const validationMessages = useTranslations("RegisterPage.formValidation")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserValues>({
    resolver: zodResolver(getRegisterUserFormSchema(validationMessages)),
  });

  const t = useTranslations("RegisterPage");

  const onSubmit = async (data: any) => {
    try {
      console.log("data", data);  
      await registerUser(data);
    } catch {
      console.log("Something wrong happened");
    }
  };

  return (
    <div className="w-full h-auto bg-secondary mt-1 p-5 z-10 rounded-b-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-auto space-y-2 flex flex-col justify-center "
      >
        <input
          type="text"
          className={`w-full p-2 border ${ errors.username?.message ? "border border-red-500" : "border-text-muted"} bg-white rounded-md`}
          placeholder={ t("form.name") }
          {...register("username")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.username?.message}
        </p>
        <input
          type="text"
          className={`w-full p-2 border ${ errors.email?.message ? "border border-red-500" : "border-text-muted"} bg-white rounded-md`}
          placeholder={ t("form.email") }
          {...register("email")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.email?.message}
        </p>
        <input
          type="password"
          className={`w-full p-2 border ${ errors.password?.message ? "border border-red-500" : "border-text-muted"} bg-white rounded-md`}
          placeholder={ t("form.password") }
          {...register("password")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.password?.message}
        </p>
        <input
          type="password"
          className={`w-full p-2 border ${ errors.confirm_password?.message ? "border border-red-500" : "border-text-muted"} bg-white rounded-md`}
          placeholder={ t("form.confirmPassword") }
          {...register("confirm_password")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.confirm_password?.message}
        </p>
        <input
          type="text"
          className={`"w-full p-2 border ${ errors.phone?.message ? "border border-red-500" : "border-text-muted"} bg-white rounded-md`}
          placeholder={ t("form.phone") }
          {...register("phone")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.phone?.message}
        </p>
        <p className="text-gray-300 text-center">
          {t("form.AcceptingTerms")}{" "}
          <Link href="#" className="underline">
            {t("form.termsAndConditions")}
          </Link>
        </p>
        <button type="submit" className="p-4 rounded-2xl bg-accent text-white cursor-pointer">
          {t("form.registerButton")}
        </button>
      </form>
    </div>
  );
}
