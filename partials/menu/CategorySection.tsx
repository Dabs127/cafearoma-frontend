"use client";

import { useEffect, useState } from "react";
import MenuItemCard from "@/partials/menu/MenuItemCard";
import {
  deleteItem,
  getAllItems,
  updateItem,
} from "@/actions/items/itemsActions";
import useItemFilterStore from "@/stores/useItemFilterStore";
import useItemsStore from "@/stores/useItemsStore";
import { useTranslations } from "next-intl";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import UpdateMenuItemModal from "./update/UpdateMenuItemModal";
import MenuItemsSkeleton from "./MenuItemsSkeleton";
import { MdNoFood } from "react-icons/md";

const categories = [
  { name: "cafes" },
  { name: "postres" },
  { name: "desayunos" },
  { name: "comida" },
  { name: "jugos" },
];

const categoryTranslationKeys: Record<string, string> = {
  cafes: "coffee",
  postres: "desserts",
  desayunos: "breakfast",
  comida: "lunch",
  jugos: "juices",
};

export default function CategorySection() {
  const { itemFilter } = useItemFilterStore();
  const { items, setItems } = useItemsStore();
  const [isDeleteConfirmActionModalOpen, setIsDeleteConfirmActionModalOpen] =
    useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [menuItemId, setMenuItemId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("MenuPage");

  useEffect(() => {
    const fetchItems = async () => {
      const { items } = await getAllItems();
      setItems(items);
      setIsLoading(false);
    };
    fetchItems();
  }, []);

  const handleOpenDeleteModal = (id: string) => {
    setIsDeleteConfirmActionModalOpen(!isDeleteConfirmActionModalOpen);
    setMenuItemId(id);
  };

  const handleOpenUpdateModal = (id: string) => {
    setIsUpdateModalOpen(!isUpdateModalOpen);
    setMenuItemId(id);
  };

  if (isLoading) return <MenuItemsSkeleton />;

  return (
    <>
      {isDeleteConfirmActionModalOpen && (
        <ConfirmActionModal
          onClose={() => setIsDeleteConfirmActionModalOpen(false)}
          actionType="delete"
          action={async () => {
            deleteItem(menuItemId?.toString() || "");
            const { items } = await getAllItems();
            setItems(items);
          }}
          id={menuItemId}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateMenuItemModal
          onClose={() => setIsUpdateModalOpen(false)}
          id={menuItemId?.toString() || ""}
        />
      )}
      {items.length !== 0 && !isLoading
        ? categories.map((category) => {
            const filteredItems = items.filter(
              (item) => item.category === category.name
            );

            // Filter items based on the selected itemFilter
            if (itemFilter && itemFilter !== category.name) {
              return null; // Skip rendering this category if the filter doesn't match
            }

            if (filteredItems.length === 0 && itemFilter === category.name) {
              return (
                <div key={category.name} className="flex flex-col items-center text-text-muted p-30 mt-10">
                  <MdNoFood className="w-20 h-20" />
                  <span className="text-xl w-50 text-center mt-5">De momento no hay productos en esta categoría...</span>
                </div>
              );
            }

            return (
              filteredItems.length > 0 && (
                <div key={category.name} className="w-full h-auto min-h-96">
                  <h2 className="w-full h-13 mt-10 pl-10 font-semibold text-secondary text-4xl border-b-4 border-secondary">
                    {t(`categories.${categoryTranslationKeys[category.name]}`)}
                  </h2>
                  <div className="grid grid-cols-3 gap-15 w-full h-full justify-center justify-items-center p-20">
                    {filteredItems.map((item) => (
                      <MenuItemCard
                        key={item._id}
                        item={item}
                        handleOpenDeleteModal={() =>
                          handleOpenDeleteModal(item._id)
                        }
                        handleOpenUpdateModal={() =>
                          handleOpenUpdateModal(item._id)
                        }
                      />
                    ))}
                  </div>
                </div>
              )
            );
          })
        : "hola"}
    </>
  );
}
