import Link from "next/link";

export default function Presentation() {
  return (
    <div className="w-full min-h-10/12 h-1/2 flex flex-col justify-center items-center bg-secondary py-20">
      <h1 className="text-8xl text-light underline decoration-8 decoration-accent  underline-offset-20">Cáfe Aroma</h1>
      <p className="w-2/6 text-2xl text-light my-15 text-center">
        Desde 2023 hemos estado complaciendo a mas de 1,000 clientes con nuestro
        cafe nacional y tostado en casa. Tenemos una diversa variedad de bebidas
        y postres.
      </p>

      <Link href="/menu" className="bg-accent w-48 h-24 text-3xl flex items-center justify-center font-semibold text-light p-4 rounded-2xl">Ver Menú</Link>
    </div>
  );
}
