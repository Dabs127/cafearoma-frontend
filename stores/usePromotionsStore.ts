import { Promotion } from "@/types/promotions"
import { create } from "zustand";

const usePromotionsStore = create<{
    promotions: Promotion[];
    setPromotions: (promotions: Promotion[]) => void;
}>((set) => ({
    promotions: [],
    setPromotions: (promotions) => set({ promotions }),
}));

export default usePromotionsStore