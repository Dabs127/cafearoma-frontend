// stores/useItemsStore.ts
import { create } from 'zustand';
import { Item } from '@/types/items';

const useItemsStore = create<{
  items: Item[];
  setItems: (items: Item[]) => void;
}>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));

export default useItemsStore;
