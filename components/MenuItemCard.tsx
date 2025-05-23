import Image from "next/image";
import Latte from "@/public/cafe.png";
import Link from "next/link";
import { Item } from "@/types/items";

type MenuItemCardProps = {
  item: Item;
};

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Link href="/menu/latte">
      <div className="w-full h-150 max-w-xs rounded-3xl flex flex-col items-center shadow-2xl bg-white">
        <div className="w-full h-3/8 flex justify-center items-center overflow-hidden rounded-t-3xl shadow-lg">
          <Image
            className="w-full h-full object-fill hover:scale-115 transition-all duration-300 ease-in-out"
            src={item.imageUrl || Latte}
            alt={`Imagen de ${item.name}`}
          />
        </div>
        <h3 className="mt-5 text-accent text-center text-4xl">{item.name}</h3>
        <p className="mt-5 p-5 text-text-muted text-center text-2xl">
          {item.description}
        </p>
        <p className="text-text-muted text-3xl mt-5">${item.price}</p>
      </div>
    </Link>
  );
}
