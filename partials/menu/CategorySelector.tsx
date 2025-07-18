"use client";

import useItemFilterStore from "@/stores/useItemFilterStore";
import { useTranslations } from "next-intl";
import { LuCoffee, LuCakeSlice, LuEggFried, LuSandwich } from "react-icons/lu";
import { PiOrange } from "react-icons/pi";

const categories = [
  { name: "Cafés", icon: <LuCoffee />, category: "cafes" },
  { name: "Postres", icon: <LuCakeSlice />, category: "postres" },
  { name: "Desayunos", icon: <LuEggFried />, category: "desayunos" },
  { name: "Comida",  icon: <LuSandwich />, category: "comida" },
  { name: "Jugos", icon: <PiOrange />, category: "jugos" },
];

export default function CategorySelector() {
  const { itemFilter, setItemFilter } = useItemFilterStore();
  const t = useTranslations("MenuPage");

  categories[0].name = t("categories.coffee");
  categories[1].name = t("categories.desserts");
  categories[2].name = t("categories.breakfast");
  categories[3].name = t("categories.lunch");
  categories[4].name = t("categories.juices");

  return (
    <div className="w-full">
      <ul className="flex">
        {
            categories.map((category) => {
                return (
                <li key={category.name} className="w-full h-15 flex flex-col justify-center items-center text-lg text-accent font-semibold" onClick={() => setItemFilter(category.category)}>
                    <span className={`text-2xl p-2 rounded-full ${category.category === itemFilter ? "text-accent" : "text-text-muted"} hover:text-accent transition-all duration-300 ease-in-out cursor-pointer md:text-4xl`}>{category.icon}</span>
                    <span className="text-sm md:text-lg">{category.name}</span>
                </li>
                );
            })
        }
      </ul>
    </div>
  );
}
