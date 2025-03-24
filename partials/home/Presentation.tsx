import Link from "next/link";

export default function Presentation() {
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center bg-secondary py-10">
      <h1 className="text-6xl text-light underline decoration-accent  underline-offset-20">Cáfe Aroma</h1>
      <p className="w-2/6 text-xl text-light my-15 text-center">
        Desde 2023 hemos estado complaciendo a mas de 1,000 clientes con nuestro
        cafe nacional y tostado en casa. Tenemos una diversa variedad de bebidas
        y postres.
      </p>

      <Link href="#" className="bg-accent text-lg font-semibold text-light p-4 rounded-2xl">Ver Menú</Link>
    </div>
  );
}
