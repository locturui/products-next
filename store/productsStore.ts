import { create } from 'zustand';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ProductsState {
  products: Product[];
  likedIds: number[];
  deletedIds: number[];
  fetchProducts: () => Promise<void>;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (product: Product) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  likedIds: [],
  deletedIds: [],
  
  fetchProducts: async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      set({ products: data });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  
  toggleLike: (id: number) => {
    set((state) => ({
      likedIds: state.likedIds.includes(id)
        ? state.likedIds.filter((likedId) => likedId !== id)
        : [...state.likedIds, id],
    }));
  },
  
  deleteProduct: (id: number) => {
    set((state) => ({
      deletedIds: [...state.deletedIds, id],
    }));
  },
  
  addProduct: (product: Product) => {
    set((state) => ({
      products: [...state.products, product],
    }));
  },
}));

