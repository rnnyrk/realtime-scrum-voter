import * as i from 'types';
import { create } from 'zustand';

type CategoriesStore = {
  data: Partial<i.CategoriesData>;
  setData: (data: Partial<i.CategoriesData>) => void;
};

export const useCategoriesStore = create<CategoriesStore>()((set) => ({
  data: null,
  setData(data) {
    set((state) => ({
      data: {
        ...state.data,
        ...data,
      },
    }));
  },
}));

export function useCategoryData(category: i.Categories) {
  return useCategoriesStore((state) => {
    return state.data?.[category];
  });
}
