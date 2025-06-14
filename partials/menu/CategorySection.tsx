"use client";

import { useEffect } from "react";
import MenuItemCard from "@/components/MenuItemCard";
import { getAllItems } from "@/actions/items/itemsActions";
import useItemFilterStore from "@/stores/useItemFilterStore";
import useItemsStore from "@/stores/useItemsStore";
import { api } from "@/actions/api";
import { ItemResponse } from "@/types/items";

const categories = [
  { name: "cafes" },
  { name: "postres" },
  { name: "desayunos" },
  { name: "comida" },
  { name: "jugos" },
];

export default function CategorySection() {
  const { itemFilter } = useItemFilterStore();
  const { items, setItems } = useItemsStore();

  useEffect(() => {
    const fetchItems = async () => {
      const { items } = await getAllItems();
      await api.get("/debug-cookies", {});
      setItems(items);
    };
    fetchItems();
  }, []);

  return (
    <>
      {categories.map((category) => {
        if (items.length === 0) return null; // Skip rendering if items are not loaded yet
        const filteredItems = items.filter(
          (item) => item.category === category.name
        );

        // Filter items based on the selected itemFilter
        if (itemFilter && itemFilter !== category.name) {
          return null; // Skip rendering this category if the filter doesn't match
        }
        return (
          filteredItems.length > 0 && (
            <div key={category.name} className="w-full h-full">
              <h2 className="w-full h-13 mt-10 pl-10 font-semibold text-secondary text-4xl border-b-4 border-secondary">
                {category.name.toUpperCase()}
              </h2>
              <div className="grid grid-cols-3 gap-15 w-full h-full justify-center p-20">
                {filteredItems.map((item) => (
                  <MenuItemCard key={item._id} item={item} />
                ))}
              </div>
            </div>
          )
        );
      })}
    </>
  );
}
