import { create } from 'zustand'

type ItemFilterStore = {
    itemFilter: string
    setItemFilter: (filter: string) => void
}

const useItemFilterStore = create<ItemFilterStore>((set) => ({
    itemFilter: '',
    setItemFilter: (filter: string) => set({ itemFilter: filter }),
}))

export default useItemFilterStore;
