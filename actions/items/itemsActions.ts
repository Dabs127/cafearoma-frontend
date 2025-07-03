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
