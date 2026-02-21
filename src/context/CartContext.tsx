
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  Cart, 
  createCart, 
  addToCart as shopifyAddToCart, 
  removeFromCart as shopifyRemoveFromCart, 
  updateCartLine as shopifyUpdateCartLine,
  getCart
} from "@/lib/shopify";

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateCartItem: (lineId: string, quantity: number) => Promise<void>;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize cart from local storage
  useEffect(() => {
    const initializeCart = async () => {
      const storedCartId = localStorage.getItem("shopify_cart_id");
      
      if (storedCartId) {
        const existingCart = await getCart(storedCartId);
        if (existingCart) {
          setCart(existingCart);
          return;
        }
      }
      
      // Create new cart if none exists or fetch failed
      const newCart = await createCart();
      localStorage.setItem("shopify_cart_id", newCart.id);
      setCart(newCart);
    };

    initializeCart();
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      let currentCartId = cart?.id;

      if (!currentCartId) {
        const newCart = await createCart();
        currentCartId = newCart.id;
        localStorage.setItem("shopify_cart_id", newCart.id);
      }

      const updatedCart = await shopifyAddToCart(currentCartId, variantId, quantity);
      setCart(updatedCart);
      openCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cart?.id) return;
    
    setIsLoading(true);
    try {
      const updatedCart = await shopifyRemoveFromCart(cart.id, [lineId]);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (lineId: string, quantity: number) => {
    if (!cart?.id) return;

    setIsLoading(true);
    try {
      if (quantity === 0) {
        await removeFromCart(lineId);
        return;
      }
      
      const updatedCart = await shopifyUpdateCartLine(cart.id, lineId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cartCount = cart?.totalQuantity || 0;

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        isOpen, 
        isLoading,
        openCart, 
        closeCart, 
        addToCart, 
        removeFromCart, 
        updateCartItem,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
