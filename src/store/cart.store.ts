import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// تعريف شكل المنتج داخل السلة
interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

// تعريف شكل "المخزن" بالكامل
interface CartState {
  items: CartItem[];
  addToCart: (product: { id: number; name: string; price: string }) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  // استخدام persist لحفظ السلة في localStorage
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            // إذا كان المنتج موجودًا، قم بزيادة الكمية
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            // إذا لم يكن موجودًا، أضفه للسلة بكمية 1
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // اسم الحفظ في localStorage
    }
  )
);