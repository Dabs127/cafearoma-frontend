"use server";

import { PromotionResponse } from "@/types/promotions";
import { api } from "../api";
import { cookies, headers } from "next/headers";

export const getAllPromotions = async (): Promise<PromotionResponse> => {
  const cookieStore = cookies();
  console.log((await cookieStore).getAll());
  return await api.get<PromotionResponse>("/promotions", {});
};

export const postPromotion = async (data: FormData): Promise<any> => {
  const cookieStore = cookies();
  console.log((await cookieStore).getAll());
  const cleanCookies = (await cookieStore)
    .getAll()
    .filter((c) => c.name !== "session")
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  console.log(cleanCookies);

  return await api.post<any>("/promotions", data, {
    headers: {
      Cookie: cleanCookies,
    },
  });
};

export const updatePromotion = async (data: FormData): Promise<any> => {
  const cookieStore = cookies();
  console.log((await cookieStore).getAll());
  const cleanCookies = (await cookieStore)
    .getAll()
    .filter((c) => c.name !== "session")
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return await api.patch<any>("/promotions", data, {
    headers: cleanCookies
  });
};

export const getPromotionById = async (id: string): Promise<any> => {
  return await api.get<any>(`promotions/${id}`, {});
};

export const deletePromotion = async (id: string): Promise<any> => {
  const cookieStore = cookies();
  console.log((await cookieStore).getAll());
  const cleanCookies = (await cookieStore)
    .getAll()
    .filter((c) => c.name !== "session")
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return await api.del<any>("/promotions", {
    data: {id},
    headers: {
      cleanCookies
    }
  })
};
