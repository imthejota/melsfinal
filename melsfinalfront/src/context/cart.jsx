import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const callback = (set, get) => ({
  isOpen: true,
  products: [],
  add: (product, quantity) => {
    set((state) => {
      const exist = state.products.find((p) => p.productoId === product.id);
      if (exist) {
        exist.quantity += quantity;
      } else {
        state.products.push({ product, quantity });
      }
      return state;
    });
  },
  remove: (product) => {
    set((state) => {
      const exist = state.products.find(
        (item) => item.product.id === product.id
      );
      if (exist.quantity > 1) {
        exist.quantity -= 1;
      } else {
        state.products.filter((item) => item.product.id !== product.id);
      }
      return state;
    });
  },
  close: () => set((state) => ({ ...state.products, isOpen: false })),
  open: () => set((state) => ({ ...state.products, isOpen: true })),
  reset: () => set({ products: [], isOpen: true }),
});

const storage = {
  name: "cart",
  storage: createJSONStorage(() => localStorage),
};

const cart = persist(callback, storage);

export default create(cart);
