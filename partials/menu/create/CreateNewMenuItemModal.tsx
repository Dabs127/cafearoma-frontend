"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { CreateNewMenuItemFormSchema } from "@/schemas/menuItem/CreateNewMenuItemFormSchema"; // Asegúrate de importar tu schema
import { getAllItems, postItem } from "@/actions/items/itemsActions";
import { ItemPostFields } from "@/types/items";
import useItemsStore from "@/stores/useItemsStore";
import axios from "axios";

type Props = {
  onClose: () => void;
};

const CreateNewMenuItemModal = (props: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateNewMenuItemFormSchema),
  });

  const { setItems } = useItemsStore();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data: ItemPostFields) => {
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
    props.onClose();
    await postItem(formData);

    const { items } = await getAllItems();
    setItems(items);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="min-w-100 bg-white p-6 rounded-lg shadow-lg w-96">
        <p className="w-full flex justify-end text-gray-500">
          <IoClose
            className="text-4xl cursor-pointer"
            onClick={props.onClose}
          />
        </p>
        <h2 className="text-2xl text-accent font-semibold mb-4">Nuevo Item</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-2 items-end"
        >
          <input
            type="text"
            className={`w-full p-2 border ${
              errors.name?.message
                ? "border border-red-500"
                : "border-text-muted"
            } bg-white rounded-md `}
            placeholder="Ingrese el nombre del platillo"
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
            placeholder="Ingrese el precio del platillo"
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
            <option value="cafes">Cáfes</option>
            <option value="postres">Postres</option>
            <option value="desayunos">Desayunos</option>
            <option value="comida">Comida</option>
            <option value="jugos">Jugos</option>
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
            placeholder="Ingrese la descripción del platillo"
            rows={6}
            {...register("description")}
          ></textarea>
          <p className="min-w-full min-h-4 text-red-500">
            {errors.description?.message}
          </p>

          <label className="w-full block text-lg font-medium text-gray-500">
            Subir imagen del platillo
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
              <p className="text-sm text-gray-500 mb-1">Vista previa:</p>
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
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewMenuItemModal;
