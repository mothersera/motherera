
"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { isOpen, closeCart, cart, removeFromCart, updateCartItem, isLoading } = useCart();

  const handleQuantityChange = (lineId: string, quantity: number) => {
    if (quantity < 1) return;
    updateCartItem(lineId, quantity);
  };

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col h-full border-l border-stone-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-rose-600" />
                <h2 className="text-xl font-serif font-bold text-stone-900">Your Cart</h2>
                <span className="text-xs font-medium bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                  {cart?.totalQuantity || 0} items
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!cart || cart.lines.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-stone-400">
                  <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-stone-300" />
                  </div>
                  <p className="text-lg font-medium text-stone-900">Your cart is empty</p>
                  <p className="text-sm">Looks like you haven't added anything yet.</p>
                  <Button 
                    variant="outline" 
                    onClick={closeCart}
                    className="mt-4 rounded-full border-stone-200 hover:bg-stone-50 text-stone-900"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.lines.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className="flex gap-4 group"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 bg-stone-50 rounded-xl overflow-hidden flex-shrink-0 border border-stone-100">
                        {item.merchandise.image && (
                          <Image
                            src={item.merchandise.image.url}
                            alt={item.merchandise.image.altText || item.merchandise.product.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <h3 className="font-medium text-stone-900 line-clamp-1">
                            {item.merchandise.product.title}
                          </h3>
                          <p className="text-xs text-stone-500 mt-0.5 mb-2">
                            {item.merchandise.title !== "Default Title" ? item.merchandise.title : ""}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 border border-stone-200 rounded-full px-2 py-1 bg-white">
                            <button
                              onClick={() => updateCartItem(item.id, item.quantity - 1)}
                              disabled={isLoading || item.quantity <= 1}
                              className="w-5 h-5 flex items-center justify-center text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartItem(item.id, item.quantity + 1)}
                              disabled={isLoading}
                              className="w-5 h-5 flex items-center justify-center text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-stone-900">
                              ₹{parseFloat(item.merchandise.price.amount) * item.quantity}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              disabled={isLoading}
                              className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart && cart.lines.length > 0 && (
              <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-4">
                <div className="flex items-center justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900 text-lg">
                    ₹{cart.cost.subtotalAmount.amount}
                  </span>
                </div>
                
                <p className="text-xs text-stone-400 text-center">
                  Shipping and taxes calculated at checkout.
                </p>

                <Button 
                  className="w-full rounded-full bg-stone-900 hover:bg-rose-600 text-white h-12 text-base font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      Checkout
                      <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-1">
                        ₹{cart.cost.subtotalAmount.amount}
                      </span>
                    </>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
