"use client";

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <main className="w-5/6 h-full mx-auto flex justify-around items-start mt-30">
      <section className="text-secondary basis-1/4">
        <h1 className="text-3xl">
          ¡Comunicate con nosotros si quieres algún servicio especial!
        </h1>
        <h2 className="text-2xl my-5">
          ¡O mandanos un correo y nosotros nos comunicaremos contigo!
        </h2>
        <p>Correo: cafeAroma@outlook.com</p>
        <p>Teléfono: +52 8117669574</p>
      </section>
      <div className="basis-1/4">
        <form className="space-y-6 flex flex-col items-end" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full border-b-2 border-b-text-muted p-2"
            placeholder="Nombre"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <input
            className="w-full border-b-2 border-b-text-muted p-2"
            placeholder="Correo eléctronico"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <textarea
            className="w-full border-2 rounded-2xl p-2 border-text-muted"
            placeholder="Mensaje"
            rows={8}
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="text-red-500">Este campo es requerido</span>
          )}

          <button
            type="submit"
            className="w-1/4 p-4 rounded-xl font-semibold bg-accent text-white cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
}
