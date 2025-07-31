"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
  getAllItems,
  getItemById,
  updateItem,
} from "@/actions/items/itemsActions";
import useItemsStore from "@/stores/useItemsStore";
import { useTranslations } from "next-intl";
import { Item } from "@/types/items";
import {
  getUpdateMenuItemFormSchema,
  UpdateMenuItemValues,
} from "@/schemas/menuItem/UpdateMenuItemFormSchema";
import { toast } from "sonner";

type Props = {
  onClose: () => void;
  id: string;
};

const UpdateMenuItemModal = (props: Props) => {
  const validationMessages = useTranslations(
    "MenuPage.createNewMenuItemFormValidation"
  );
  const [itemInfo, setItemInfo] = useState<Item | undefined>();
  const { setItems } = useItemsStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateMenuItemValues>({
    resolver: zodResolver(getUpdateMenuItemFormSchema(validationMessages)),
    defaultValues: {
      name: itemInfo?.name ?? "",
      price: itemInfo?.price,
      category: itemInfo?.category,
      description: itemInfo?.description,
    },
  });

  const t = useTranslations("MenuPage.newMenuItemModal");

  useEffect(() => {
    const fetchItemInfo = async () => {
      const response = await getItemById(props.id);
      setItemInfo(response.item);
      setImagePreview(response.item.imgUrl);
    };
    if (itemInfo) {
      reset({
        name: itemInfo.name,
        price: itemInfo.price,
        category: itemInfo.category,
        description: itemInfo.description,
      });
    } else {
      fetchItemInfo();
    }
  }, [itemInfo]);

  const onSubmit = async (data: UpdateMenuItemValues) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "string") {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    formData.append("id", itemInfo?._id || "");

    const { success, message } = await updateItem(formData);

    if (!success) {
      toast.error(t("errorUpdateMessage") || message, {
        richColors: true,
        position: "top-center",
      });
      return;
    }

    toast.success(t("successUpdateMessage") || message, {
      richColors: true,
      position: "top-center",
    });

    props.onClose();

    const { items } = await getAllItems();
    setItems(items);
  };

  return (
    <div className="fixed h-screen inset-0 flex items-center justify-center bg-black/50 z-50 overflow-hidden">
      <div className="bg-white rounded-lg shadow-lg w-[80%] h-[80%] overflow-y-auto md:w-132">
        <div className="fixed flex p-4 rounded-t-lg bg-white w-[80%] border-b-2 border-b-gray-200 h-15 md:w-132">
          <h2 className="text-2xl text-accent font-semibold mb-4 w-full">
            {t("updateModalTitle")}
          </h2>
          <p className="w-full flex justify-end text-gray-500">
            <IoClose
              className="text-4xl cursor-pointer"
              onClick={props.onClose}
            />
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2 items-end p-6 mt-20"
        >
          <input
            type="text"
            className={`w-full p-2 border ${
              errors.name?.message
                ? "border border-red-500"
                : "border-text-muted"
            } bg-white rounded-md `}
            placeholder={t("name")}
            {...register("name")}
          />
          <p className="min-w-full min-h-4 text-red-500">
            {errors.name?.message}
          </p>

          <input
            type="text"
            className={`w-full p-2 border ${
              errors.price?.message
                ? "border border-red-500"
                : "border-text-muted"
            } bg-white rounded-md `}
            placeholder={t("price")}
            {...register("price")}
          />
          <p className="min-w-full min-h-4 text-red-500">
            {errors.price?.message}
          </p>

          <select
            id="category"
            className={`w-full p-2 border ${
              errors.category?.message
                ? "border border-red-500"
                : "border-text-muted"
            } bg-white rounded-md `}
            {...register("category")}
          >
            <option value="cafes">{t("categoryOptions.coffe")}</option>
            <option value="postres">{t("categoryOptions.dessert")}</option>
            <option value="desayunos">{t("categoryOptions.breakfast")}</option>
            <option value="comida">{t("categoryOptions.lunch")}</option>
            <option value="jugos">{t("categoryOptions.juice")}</option>
          </select>

          <p className="min-w-full min-h-4 text-red-500">
            {errors.category?.message}
          </p>

          <textarea
            className={`w-full p-2 border ${
              errors.description?.message
                ? "border border-red-500"
                : "border-text-muted"
            } bg-white rounded resize-none `}
            placeholder={t("description")}
            rows={6}
            {...register("description")}
          ></textarea>
          <p className="min-w-full min-h-4 text-red-500">
            {errors.description?.message}
          </p>

          <label className="w-full block text-lg font-medium text-gray-500">
            {t("image")}
          </label>

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0 file:text-sm file:font-semibold
                  file:bg-secondary file:text-white hover:file:bg-secondary-dark cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.onChange(file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImagePreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    field.onChange(undefined);
                    setImagePreview(null);
                  }
                }}
              />
            )}
          />
          <p className="min-w-full min-h-4 text-red-500">
            {errors.image?.message}
          </p>

          {imagePreview && (
            <div className="w-full mt-2">
              <p className="text-sm text-gray-500 mb-1">{t("preview")}</p>
              <div className="w-32 h-32 border border-gray-300 rounded overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-1/2 bg-accent text-white text-xl font-semibold mt-5 p-2 rounded cursor-pointer hover:bg-green-700 transition-colors duration-300"
          >
            {t("submitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenuItemModal;
