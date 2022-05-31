import create from "zustand";

type Product = {
  name: string;
  quantity?: number;
};

interface State {
  cart: Array<Product>;
  addItem: (item: Product) => void;
  removeItem: (item: Product["name"], quantity?: number) => void;
}

const validItem = (item: Product) => {
  return !!item && typeof item === "object" && typeof item?.name === "string";
};

const STORAGE_ID = "fruit-shop-cart";

const getLocalState = (): Array<Product> => {
  const rawData = localStorage.getItem(STORAGE_ID);
  if (rawData) {
    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  }
  return [];
};

const updateLocalState = (newCart: Array<Product>): void => {
  localStorage.setItem(STORAGE_ID, JSON.stringify(newCart));
};

export const useStore = create<State>((set) => ({
  cart: getLocalState(),
  addItem: (newItem) => {
    if (validItem(newItem)) {
      set((state) => {
        const cart = [...state.cart];
        const existingIndex = cart.findIndex(
          (item) => item.name === newItem.name
        );
        if (existingIndex > -1) {
          const existing = cart[existingIndex];
          cart[existingIndex] = {
            ...existing,
            quantity: (existing?.quantity || 0) + 1,
          };
        } else {
          cart.push({ quantity: 1, ...newItem });
        }
        updateLocalState(cart);
        return { cart };
      });
    }
  },
  removeItem: (itemName, quantity = 1) => {
    if (itemName && typeof itemName === "string") {
      set((state) => {
        const cart = [...state.cart];
        const existingIndex = cart.findIndex((item) => item.name === itemName);
        if (existingIndex > -1) {
          const existing = cart[existingIndex];
          if (!existing?.quantity || existing?.quantity <= quantity) {
            cart.splice(existingIndex, 1);
          } else {
            cart[existingIndex] = {
              ...existing,
              quantity: existing.quantity - quantity,
            };
          }
        }
        updateLocalState(cart);
        return { cart };
      });
    }
  },
}));

export const useCartCount = (product?: string): number => {
  const products = useStore((store) => store.cart);
  const count = products.reduce((acc, cur) => {
    let curCount = acc;
    if (!product || product === cur.name) {
      curCount += cur?.quantity || 0;
    }
    return curCount;
  }, 0);
  return count || 0;
};

export default useStore;
