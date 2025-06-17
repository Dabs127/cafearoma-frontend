"use client";
import { getAllPromotions } from "@/actions/promotions/promotionsActions";
import PromotionCard from "@/partials/promotions/PromotionCard";
import usePromotionsStore from "@/stores/usePromotionsStore";
import { useEffect } from "react";

export default function PromotionsSection() {
  const { promotions, setPromotions } = usePromotionsStore();

  useEffect(() => {
    const fetchPromotions = async () => {
      const { promotions } = await getAllPromotions();
      console.log("Promociones: ", promotions)
      setPromotions(promotions);
    };
    fetchPromotions();
  }, []);

  return (
    <div className="w-full h-full flex-col items-center justify-center grid grid-cols-2 gap-15 p-20">
      {promotions.map((promotion) => {
        return <PromotionCard key={promotion._id} promotion={promotion} />;
      })}
    </div>
  );
}
