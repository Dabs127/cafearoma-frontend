"use server";

import { ItemResponse } from "@/types/items";
import { api } from "../api";
import { cookies, headers } from "next/headers";

export const getAllItems = async (): Promise<ItemResponse> => {
  // 1. Obtener las cookies actuales
  const cookieStore = cookies();
  const allCookies = (await cookieStore).getAll();

  console.log(allCookies[1])

  // 2. Crear headers para la petición a Express
  const headersInstance = new Headers();
  allCookies.forEach((cookie) => {
    headersInstance.append("Cookie", `${cookie.name}=${cookie.value}`);
  });

  return await api.get<ItemResponse>("/items", {
    headers: headersInstance
  });
};

export const postItem = async (data: FormData): Promise<any> => {
  // 1. Obtener las cookies actuales
  const cookieStore = cookies();
  const allCookies = (await cookieStore).getAll();

  // 2. Crear headers para la petición a Express
  const headersInstance = new Headers();
  allCookies.forEach((cookie) => {
    headersInstance.append("Cookie", `${cookie.name}=${cookie.value}`);
  });

  return await api.post<any>("/items", data, {
    headers: headersInstance,
  });
};
