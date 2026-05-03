"use client";
import { create } from "zustand";

const medicineStore = create((set, get) => ({
  products: [],
  isOpenCart: false,
  addProducts: (item) =>
    set((state) => ({ products: [...state.products, item] })),
  deleteProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
  setIsOpenCart: () => set((state) => ({ isOpenCart: !state.isOpenCart })),
}));

export const useMedicineStorage = () => {
  const products = medicineStore((state) => state.products);
  const addProducts = medicineStore((state) => state.addProducts);
  const deleteProduct = medicineStore((state) => state.deleteProduct);
  const isOpenCart = medicineStore((state) => state.isOpenCart);
  const setIsOpenCart = medicineStore((state) => state.setIsOpenCart);

  return {
    products,
    isOpenCart,

    // metohs
    addProducts,
    deleteProduct,
    setIsOpenCart,
  };
};
