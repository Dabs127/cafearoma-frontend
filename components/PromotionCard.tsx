import { Promotion } from "@/types/promotions";
import Link from "next/link";

type PromotionCardProps = {
  promotion: Promotion;
};

export default function PromotionCard({promotion}: PromotionCardProps) {

  return (
    <div className="w-full h-auto min-h-120 rounded-3xl flex flex-col shadow-2xl bg-white my-10">
      <div className="w-full h-4/9 flex justify-center items-center overflow-hidden rounded-t-3xl max-h-80">
        <img
          className="w-full h-full object-fill hover:scale-115 transition-all duration-300 ease-in-out"
          src="/latte.jpg"
          alt={`Image of promotion ${promotion.title}`}
        />
      </div>
      <div className="w-full h-3/9 border-b-2 border-b-text-muted">
        <h3 className="mt-5 px-5 text-secondary text-4xl font-semibold">{promotion.title}</h3>
        <p className="my-5 px-5 text-2xl min-h-28">{promotion.shortDescription}</p>
      </div>
      <div className="w-full h-2/9 flex justify-end items-center pr-5">
        <Link href={`/promotions/${promotion._id}`} className="text-xl text-secondary my-5 py-2 px-4 border-2 rounded-2xl border-secondary hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out">Ver más</Link> {/*Agregar el id de la promoción*/}
      </div>
    </div>
  );
}