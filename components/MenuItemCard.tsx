import Image from "next/image";
import Latte from "@/public/latte.jpg";
import Link from "next/link";

export default function MenuItemCard() {
  return (
    <Link href="/menu/latte">
      <div className="w-full h-150 rounded-3xl flex flex-col items-center shadow-2xl bg-white">
        <div className="w-full h-3/8 flex justify-center items-center overflow-hidden rounded-t-3xl shadow-lg">
          <Image
            className="w-full h-full object-fill hover:scale-115 transition-all duration-300 ease-in-out"
            src={Latte}
            alt="Imagen de"
          />
        </div>
        <h3 className="mt-5 text-accent text-4xl">Strawberry Frappe</h3>
        <p className="mt-5 p-5 text-text-muted text-center text-2xl">
          A delicious frappe in a tall glass, topped with whipped cream and
          chocolate drizzle
        </p>
        <p className="text-text-muted text-3xl mt-5">$76</p>
      </div>
    </Link>
  );
}
