import CategorySection from "@/partials/menu/CategorySection";
import CategorySelector from "@/partials/menu/CategorySelector";


export default function Menu() {
  return (
    <main className="w-5/6 h-full mx-auto flex flex-col justify-center items-center">
      <div className="w-full mb-15 pt-5 pb-20 border-b-2 border-b-gray-400 ">
        <h1 className="text-center font-semibold text-secondary border-2 border-primary text-5xl mt-10 mb-5">Menú</h1>
        <p className="text-center text-accent text-xl">
          Conoce nuestras bebidas y alimentos
        </p>
      </div>
      <CategorySelector />
      <CategorySection />
    </main>
  );
}
