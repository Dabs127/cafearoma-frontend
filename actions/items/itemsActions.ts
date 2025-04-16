import { Item } from "@/types/items";
import { api } from "../api";

export const getAllItems = async (): Promise<Item[]> => {
    return await api.get<Item[]>("/items", {});
}