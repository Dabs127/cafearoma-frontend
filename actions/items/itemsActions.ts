"use server";

import { ItemResponse } from "@/types/items";
import { api } from "../api";
import { cookies, headers } from "next/headers";

export const getAllItems = async (): Promise<ItemResponse> => {
  return await api.get<ItemResponse>("/items", {});
};

export const postItem = async (data: FormData): Promise<any> => {
  const cookieStore = cookies();
  const cleanCookies = (await cookieStore)
    .getAll()
    .filter((c) => c.name !== "session")
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return await api.post<any>("/items", data, {
    headers: {
      Cookie: cleanCookies,
    },
  });
};

export const updateItem = async (data: FormData): Promise<any> => {
  const cookieStore = cookies();
  const cleanCookies = (await cookieStore)
    .getAll()
    .filter((c) => c.name !== "session")
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return await api.patch<any>("/items", data, {
    headers: {
      Cookie: cleanCookies
    }
  });
};

export const getItemById = async (id: string): Promise<any> => {
  const cookieStore = cookies();
  const cleanCookies = (await cookieStore)
    .getAll()
    .filter((c) => c.name !== "session")
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

    return await api.get<any>(`/items/${id}`, {})
};

export const deleteItem = async (id: string): Promise<any> => {
  const cookieStore = cookies();
  const cleanCookies = (await cookieStore)
    .getAll()
    .filter((c) => c.name !== "session")
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return await api.del<any>("/items", {
    data: { id },
    headers: {
      Cookie: cleanCookies
    }
  });
};
