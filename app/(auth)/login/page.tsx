"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/actions/users/usersActions";
import { LoginUserFormSchema } from "@/schemas/auth/loginSchema";
import { useSessionStore, Session } from "@/stores/useSessionStore";
import { redirect } from "next/navigation";
import { api } from "@/actions/api";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginUserFormSchema),
  });

  const { setSession, setLoading } = useSessionStore();

  const onSubmit = async (data: any) => {
    const result = await loginUser(data);

    if (!result.success) return;

    setLoading(true);

    try {
      const res = await api.get<Session>("/auth/session", {});
      setSession(res);
      setLoading(false);

      // Redirigir después de un breve retraso opcional
      setTimeout(() => {
        redirect("/");
      }, 1000);
    } catch (error) {
      console.error("Error al obtener la sesión tras login:", error);

      try {
        await api.post("/auth/refresh", {}, {});

        // Esperar un poco para que el token refreshed se registre
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await api.get<Session>("/auth/session", {});
        setSession(res);
        setLoading(false);

        setTimeout(() => {
          redirect("/");
        }, 1000);
      } catch (err) {
        console.error("No se pudo obtener sesión ni refrescar el token:", err);
        setSession(null);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-auto bg-secondary mt-1 p-5 z-10 rounded-b-2xl">
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
          placeholder="Correo eléctronico"
          {...register("email")}
        />
        <p className="min-w-full min-h-8 text-red-500">
          {errors.email?.message}
        </p>
        <input
          type="text"
          className={`w-full p-2 border ${
            errors.password?.message
              ? "border border-red-500"
              : "border-text-muted"
          } bg-white rounded-md`}
          placeholder="Contraseña"
          {...register("password")}
        />
        <p className="min-w-full min-h-12 text-red-500">
          {errors.password?.message}
        </p>
        <p className="mt-2 mb-10 text-gray-300 underline">
          Olvide mi contraseña
        </p>
        <button
          type="submit"
          className="p-4 rounded-2xl bg-accent text-white cursor-pointer"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
