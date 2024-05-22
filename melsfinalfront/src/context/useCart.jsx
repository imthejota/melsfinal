import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const callback = (set, get) => ({
  isOpen: true,
  items: new Map(),
  update: (product, quantity) => {
    set((state) => {
      const draft = new Map(state.items);
      const item = draft.get(product.id);
      if (item && quantity < 1) {
        draft.delete(item.product.id);
      } else {
        draft.set(product.id, { product, quantity });
      }
      state.items = draft;
      return { ...state, items: draft };
    });
  },
  close: () => set((state) => ({ ...state, isOpen: false })),
  open: () => set((state) => ({ ...state, isOpen: true })),
  reset: () => set({ items: new Map(), isOpen: true }),
});

const storage = {
  name: "cart",
  storage: createJSONStorage(() => localStorage),
};

const cart = persist(callback, storage);

export default create(cart);
