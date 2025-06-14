import { Promotion, PromotionResponse } from "@/types/promotions";
import { api } from "../api";

export const getAllPromotions = async (): Promise<PromotionResponse> => {
    return await api.get<PromotionResponse>("/promotions", {});
}

export const postPromotion = async (data: FormData): Promise<any> => {
    return await api.post<any>("/promotions", data, {})
}