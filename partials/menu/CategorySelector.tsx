"use client";

import useItemFilterStore from "@/stores/useItemFilterStore";
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

  return (
    <div className="w-full mb-10">
      <ul className="flex">
        {
            categories.map((category) => {
                return (
                <li key={category.name} className="w-full h-15 flex flex-col justify-center items-center text-lg text-accent font-semibold" onClick={() => setItemFilter(category.category)}>
                    <span className={`text-3xl p-2 rounded-full ${category.category === itemFilter ? "text-accent" : "text-text-muted"} hover:text-accent transition-all duration-300 ease-in-out cursor-pointer`}>{category.icon}</span>
                    <span>{category.name}</span>
                </li>
                );
            })
        }
      </ul>
    </div>
  );
}
