"use server";

import { ItemResponse } from "@/types/items";
import { api } from "../api";

export const getAllItems = async (): Promise<ItemResponse> => {
  return await api.get<ItemResponse>("/items", {});
};

export const postItem = async (data: FormData): Promise<any> => {
  return await api.post<any>("/items", data, {});
};
