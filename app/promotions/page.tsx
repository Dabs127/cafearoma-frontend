import PromotionsSection from "@/partials/promotions/PromotionsSection";

export default function Promotions() {

  return (
    <main className="w-5/6 h-full mx-auto flex flex-col justify-start items-center">
      <h1 className="text-secondary text-4xl font-semibold m-10">Aprovecha!</h1>
      <p className="w-full text-white text-2xl text-center font-semibold bg-secondary tracking-wider p-3">
        Bienvenido a la sección de promociones
      </p>
      <PromotionsSection />
    </main>
  );
}
