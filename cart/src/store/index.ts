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

// Global event bus for communicating between micro apps
// @ts-ignore
const eventBus = window.fsEvents;

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
  eventBus.publish("cart", { cart: newCart });
  localStorage.setItem(STORAGE_ID, JSON.stringify(newCart));
};

// Initialize event bus with cart data
if (eventBus) {
  eventBus.subscribe("addItem", function (item: Product) {
    const { getState } = store;
    const { addItem } = getState();
    addItem(item);
  });
  eventBus.subscribe("removeItem", function (item: Product) {
    const { getState } = store;
    const { removeItem } = getState();
    removeItem(item.name, item?.quantity);
  });
  eventBus.publish("cart", { cart: getLocalState() });
}

export const store = create<State>((set) => ({
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
export const useStore = store;

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
