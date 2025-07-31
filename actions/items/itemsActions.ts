"use server";

import { ItemResponse } from "@/types/items";
import { api } from "../api";
import { cookies, headers } from "next/headers";

export const getAllItems = async (): Promise<ItemResponse> => {
  return await api.get<ItemResponse>("/items", {});
};

export const postItem = async (
  data: FormData
): Promise<{ success: boolean; message: string }> => {
  try {
    const cookieStore = cookies();
    const cleanCookies = (await cookieStore)
      .getAll()
      .filter((c) => c.name !== "session")
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const response = await api.post<any>("/items", data, {
      headers: {
        Cookie: cleanCookies,
      },
    });

    return {
      success: true,
      message: response.message || "Item creado correctamente",
    };
  } catch (err: any) {
    const errorMsg = err.response?.data?.message || "Error al crear el item.";
    return { success: false, message: errorMsg };
  }
};

export const updateItem = async (
  data: FormData
): Promise<{ success: boolean; message: string }> => {
  try {
    const cookieStore = cookies();
    const cleanCookies = (await cookieStore)
      .getAll()
      .filter((c) => c.name !== "session")
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const response = await api.patch<any>("/items", data, {
      headers: {
        Cookie: cleanCookies,
      },
    });

    return {
      success: true,
      message: response.message || "Elemento actualizado correctamente",
    };
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error al actualizar el item.";
    return { success: false, message: errorMsg };
  }
};

export const getItemById = async (id: string): Promise<any> => {
  const cookieStore = cookies();
  const cleanCookies = (await cookieStore)
    .getAll()
    .filter((c) => c.name !== "session")
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return await api.get<any>(`/items/${id}`, {});
};

export const deleteItem = async (id: string): Promise<{success: boolean, message: string}> => {
  try {
    const cookieStore = cookies();
    const cleanCookies = (await cookieStore)
      .getAll()
      .filter((c) => c.name !== "session")
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const response = await api.del<any>("/items", {
      data: { id },
      headers: {
        Cookie: cleanCookies,
      },
    });

    return {
      success: response.success,
      message: response.message || "Item eliminado correctamente",
    };
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error al eliminar el item.";
    return { success: false, message: errorMsg };
  }
};
