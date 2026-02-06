import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],

  addItem: (product, variant = null) => {
    const cart = get().cart;
    const cartItemId = variant ? `${product.id}-${variant.size}` : product.id;

    const existingItem = cart.find((item) => item.cartItemId === cartItemId);

    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [
          ...cart,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            image: product.image,
            price: variant ? variant.price : product.price,
            variant: variant,
            quantity: 1,
          },
        ],
      });
    }
  },

  removeItem: (cartItemId) => {
    const cart = get().cart;
    const existingItem = cart.find((item) => item.cartItemId === cartItemId);

    if (existingItem.quantity > 1) {
      set({
        cart: cart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      });
    } else {
      set({
        cart: cart.filter((item) => item.cartItemId !== cartItemId),
      });
    }
  },

  getItemQuantity: (productId, variantSize = null) => {
    const cartItemId = variantSize ? `${productId}-${variantSize}` : productId;
    const item = get().cart.find((i) => i.cartItemId === cartItemId);
    return item ? item.quantity : 0;
  },
  
  getTotalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
}));