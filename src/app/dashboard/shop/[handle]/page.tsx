
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ShieldCheck, Truck, Star, Heart, ShoppingBag } from "lucide-react";
import { fetchProductByHandle, Product } from "@/lib/shopify";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const { handle } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { addToCart, openCart } = useCart();
  
  // Force scroll to top on mount and route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (handle) {
      loadProduct();
    }
  }, [handle]);

  const loadProduct = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProductByHandle(handle as string);
      setProduct(data);
    } catch (error) {
      console.error("Failed to load product", error);
    } finally {
      setIsLoading(false);
    }
  };

  const reviewCount = useMemo(() => {
    if (!product) return 128; // Default fallback
    
    const price = parseFloat(product.price);
    
    // Seed random generator with product id to ensure stable count per product
    // Simple hash function for string
    const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomFactor = (hash % 100) / 100; // 0.0 to 0.99
    
    if (price < 1500) {
      // Range: 100 - 200
      return Math.floor(100 + (randomFactor * 100));
    } else if (price >= 1500 && price <= 3500) {
      // Range: 150 - 350
      return Math.floor(150 + (randomFactor * 200));
    } else {
      // Range: 300 - 700 (price > 3500)
      return Math.floor(300 + (randomFactor * 400));
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    // Check if variantId is available
    if (!product.variantId) {
      console.error("No variant ID found for product", product);
      alert("This product is currently unavailable for purchase.");
      return;
    }
    
    setIsAddingToCart(true);
    try {
      await addToCart(product.variantId, quantity);
      openCart();
    } catch (error: any) {
      console.error("Failed to add to cart", error);
      alert(`Failed to add item to cart: ${error.message || "Unknown error"}`);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <h2 className="text-xl font-bold text-stone-900 mb-4">Product not found</h2>
        <Link href="/dashboard/shop">
          <Button variant="outline">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link href="/dashboard/shop">
            <Button variant="ghost" size="sm" className="text-stone-500 hover:text-stone-900 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-stone-50 border border-stone-100 shadow-sm">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnails (Mock) */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[product.images[0], product.images[0], product.images[0]].map((img, i) => (
                <div key={i} className={`relative w-24 h-24 rounded-xl overflow-hidden cursor-pointer border-2 ${i === 0 ? 'border-rose-500' : 'border-transparent'}`}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <span className="text-sm font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full mb-4 inline-block">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <span className="text-stone-400 text-sm">({reviewCount} Reviews)</span>
              </div>
              <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-bold text-stone-900">₹{product.price}</span>
                {product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price) && (
                  <span className="text-xl text-stone-400 line-through mb-1">₹{product.compareAtPrice}</span>
                )}
              </div>
            </div>

            <div className="prose prose-stone max-w-none mb-10 text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

            {/* Quantity & Actions */}
            <div className="mt-auto space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-200 rounded-full bg-stone-50">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors text-xl font-medium"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-stone-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors text-xl font-medium"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-stone-500">
                  Total: <span className="font-bold text-stone-900">₹{(parseFloat(product.price) * quantity).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 h-14 text-lg bg-stone-900 hover:bg-rose-600 rounded-full shadow-xl shadow-stone-200 hover:shadow-rose-200 transition-all duration-300"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                    </>
                  )}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 w-14 rounded-full border-stone-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 p-0 flex items-center justify-center"
                >
                  <Heart className="w-6 h-6" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-sm">
                    <div className="font-bold text-stone-900">Quality Assured</div>
                    <div className="text-stone-500 text-xs">Certified safe for baby</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="text-sm">
                    <div className="font-bold text-stone-900">Fast Delivery</div>
                    <div className="text-stone-500 text-xs">2-4 business days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
