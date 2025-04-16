import { Promotion } from "@/types/promotions";
import { api } from "../api";

export const getAllPromotions = async (): Promise<Promotion[]> => {
    return await api.get<Promotion[]>("/promotions", {});
}