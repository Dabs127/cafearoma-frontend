"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserFormSchema } from "@/schemas/auth/registerSchema";
import { UserRegisterData } from "@/types/users";
import { registerUser } from "@/actions/users/usersActions";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterUserFormSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("data", data);  
      await registerUser(data);
      console.log("hola");
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
          placeholder="Nombre completo"
          {...register("username")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.username?.message}
        </p>
        <input
          type="text"
          className={`w-full p-2 border ${ errors.email?.message ? "border border-red-500" : "border-text-muted"} bg-white rounded-md`}
          placeholder="Correo eléctronico"
          {...register("email")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.email?.message}
        </p>
        <input
          type="text"
          className={`w-full p-2 border ${ errors.password?.message ? "border border-red-500" : "border-text-muted"} bg-white rounded-md`}
          placeholder="Contraseña"
          {...register("password")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.password?.message}
        </p>
        <input
          type="text"
          className={`w-full p-2 border ${ errors.confirm_password?.message ? "border border-red-500" : "border-text-muted"} bg-white rounded-md`}
          placeholder="Confirmar contraseña"
          {...register("confirm_password")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.confirm_password?.message}
        </p>
        <input
          type="text"
          className={`"w-full p-2 border ${ errors.phone?.message ? "border border-red-500" : "border-text-muted"} bg-white rounded-md`}
          placeholder="Teléfono (opcional)"
          {...register("phone")}
        />
        <p className="min-w-full min-h-5 text-red-500">
          {errors.phone?.message}
        </p>
        <p className="text-gray-300 text-center">
          Al crear una cuenta aceptas el{" "}
          <Link href="#" className="underline">
            Aviso de Privacidad
          </Link>
        </p>
        <button type="submit" className="p-4 rounded-2xl bg-accent text-white cursor-pointer">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
