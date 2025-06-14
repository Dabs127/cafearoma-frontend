"use client";
import { getAllPromotions } from "@/actions/promotions/promotionsActions";
import PromotionCard from "@/partials/promotions/PromotionCard";
import { Promotion } from "@/types/promotions";
import { useEffect, useState } from "react";

export default function PromotionsSection() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      const promotions = await getAllPromotions();
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
