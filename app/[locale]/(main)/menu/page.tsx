"use server";

import CategorySection from "@/partials/menu/CategorySection";
import CategorySelector from "@/partials/menu/CategorySelector";
import CreateNewMenuItemButton from "@/partials/menu/create/CreateNewMenuItemButton";
import { getTranslations } from "next-intl/server";

export default async function Menu() {

  const t = await getTranslations("MenuPage");

  return (
    <main className="w-5/6 h-full mx-auto flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full mb-10 pt-5 pb-20 border-b-2 border-b-gray-400 ">
        <CreateNewMenuItemButton />
        <h1 className="text-center font-semibold text-secondary text-5xl mt-10 mb-5">
          {t("title")}
        </h1>
        <p className="text-center text-accent text-2xl">
          {t("description")}
        </p>
      </div>
      <CategorySelector />
      <CategorySection />
    </main>
  );
}
