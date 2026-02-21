
"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartIcon() {
  const { openCart, cartCount } = useCart();

  return (
    <button 
      onClick={openCart}
      className="relative p-2 rounded-full hover:bg-stone-100 transition-colors group"
    >
      <ShoppingBag className="w-5 h-5 text-stone-600 group-hover:text-rose-600 transition-colors" />
      
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white"
          >
            {cartCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
