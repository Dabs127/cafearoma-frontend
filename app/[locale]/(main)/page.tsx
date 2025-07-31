import Presentation from "@/partials/home/Presentation";
import ShowProducts from "@/partials/home/ShowProducts";


export default function Home() {
  return (
    <div className="w-full h-auto">
      <main>
        <Presentation />
        <ShowProducts />
      </main>
    </div>
  );
}
