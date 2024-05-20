import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const callback = (set, get) => ({
  category: "all",
  setCategory: (category) => set({ category }),
  resetCategory: () => set({ category: "all" }),
});
const storage = {
  name: "category",
  storage: createJSONStorage(() => sessionStorage),
};
const category = persist(callback, storage);

export default create(category);
