"use server";

import CreateNewPromotionButton from "@/partials/promotions/create/CreateNewPromotionButton";
import PromotionsSection from "@/partials/promotions/PromotionsSection";
import { getTranslations } from "next-intl/server";

export default async function Promotions() {
  
  const t = await getTranslations("PromotionsPage");

  return (
    <main className="w-5/6 h-full mx-auto flex flex-col justify-start items-center">
      <div className="w-full mb-15 pt-5 pb-20 border-b-2 border-b-gray-400">
        <CreateNewPromotionButton />
        <h1 className=" text-center text-secondary text-4xl font-semibold m-10">
          {t("title")}
        </h1>
        <p className="w-full text-white text-2xl text-center font-semibold bg-secondary tracking-wider p-3">
          {t("description")}
        </p>
      </div>

      <PromotionsSection />
    </main>
  );
}
