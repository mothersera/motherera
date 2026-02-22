
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
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [currentVariant, setCurrentVariant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (handle) {
      loadProduct();
    }
  }, [handle]);

  useEffect(() => {
    if (product) {
      if (product.images?.length) {
        setSelectedImage(product.images[0]);
      }
      
      // Initialize options and variant
      if (product.options && product.options.length > 0) {
        const initialOptions: Record<string, string> = {};
        product.options.forEach(opt => {
          initialOptions[opt.name] = opt.values[0];
        });
        setSelectedOptions(initialOptions);
      }
      
      if (product.variants && product.variants.length > 0) {
        setCurrentVariant(product.variants[0]);
      }
    }
  }, [product, currentVariant]);

  // Update variant when options change
  useEffect(() => {
    if (!product || !product.variants) return;
    
    const matchingVariant = product.variants.find(variant => {
      return variant.selectedOptions.every(selectedOpt => {
        return selectedOptions[selectedOpt.name] === selectedOpt.value;
      });
    });
    
    if (matchingVariant) {
      setCurrentVariant(matchingVariant);
      if (matchingVariant.image) {
        setSelectedImage(matchingVariant.image);
      }
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
    
    const price = parseFloat(currentVariant?.price?.amount || product.price);
    
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
    const variantIdToAdd = currentVariant?.id || product.variantId;
    
    if (!variantIdToAdd) {
      console.error("No variant ID found for product", product);
      alert("This product is currently unavailable for purchase.");
      return;
    }
    
    setIsAddingToCart(true);
    try {
      await addToCart(variantIdToAdd, quantity);
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
    <div className="min-h-screen bg-white pb-24 md:pb-20">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
        {/* Breadcrumb / Back */}
        <div className="mb-4 md:mb-8">
          <Link href="/dashboard/shop">
            <Button variant="ghost" size="sm" className="text-stone-500 hover:text-stone-900 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-stone-50 border border-stone-100 shadow-sm">
              <Image
                src={selectedImage?.src || product.images[0].src}
                alt={selectedImage?.alt || product.images[0].alt}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden cursor-pointer border-2 flex-shrink-0 ${selectedImage?.src === img.src ? 'border-rose-500' : 'border-transparent'}`}
                >
                  <Image src={img.src} alt={img.alt || ""} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <span className="text-xs md:text-sm font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full mb-3 md:mb-4 inline-block">
                {product.category}
              </span>
              <h1 className="text-2xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-3 md:mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                </div>
                <span className="text-stone-400 text-xs md:text-sm">({reviewCount} Reviews)</span>
              </div>
              <div className="flex items-end gap-3 md:gap-4 mb-6 md:mb-8">
                <span className="text-3xl md:text-4xl font-bold text-stone-900">
                  ₹{currentVariant?.price?.amount || product.price}
                </span>
                {product.compareAtPrice && Number(product.compareAtPrice) > Number(currentVariant?.price?.amount || product.price) && (
                  <span className="text-lg md:text-xl text-stone-400 line-through mb-1">₹{product.compareAtPrice}</span>
                )}
              </div>
            </div>

            <div className="prose prose-stone max-w-none mb-8 md:mb-10 text-stone-600 leading-relaxed text-sm md:text-base" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

            {/* Variant Selectors */}
            {product.options && product.options.length > 0 && product.options[0].name !== "Title" && (
              <div className="space-y-4 mb-8">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <h3 className="text-sm font-medium text-stone-900 mb-2">{option.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const isSelected = selectedOptions[option.name] === value;
                        return (
                          <button
                            key={value}
                            onClick={() => handleOptionChange(option.name, value)}
                            className={`px-4 py-2 rounded-full text-sm border transition-all ${
                              isSelected
                                ? "border-rose-600 bg-rose-50 text-rose-700 font-medium"
                                : "border-stone-200 hover:border-stone-300 text-stone-600"
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity & Actions - Sticky on Mobile */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:static md:p-0 md:bg-transparent md:border-none md:shadow-none z-40 mt-auto space-y-4 md:space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-200 rounded-full bg-stone-50 h-10 md:h-12">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors text-lg md:text-xl font-medium"
                  >
                    -
                  </button>
                  <span className="w-8 md:w-12 text-center font-bold text-stone-900 text-sm md:text-base">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors text-lg md:text-xl font-medium"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-stone-500 hidden md:block">
                  Total: <span className="font-bold text-stone-900">₹{(parseFloat(currentVariant?.price?.amount || product.price) * quantity).toFixed(2)}</span>
                </div>
                <div className="text-sm text-stone-500 md:hidden ml-auto">
                   <span className="font-bold text-stone-900 text-lg">₹{(parseFloat(currentVariant?.price?.amount || product.price) * quantity).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 h-12 md:h-14 text-base md:text-lg bg-stone-900 hover:bg-rose-600 rounded-full shadow-xl shadow-stone-200 hover:shadow-rose-200 transition-all duration-300"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" /> Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Add to Cart
                    </>
                  )}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-12 w-12 md:h-14 md:w-14 rounded-full border-stone-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 p-0 flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </div>
            </div>

            {/* Trust Badges - Add margin bottom for mobile to account for sticky bar */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-6 md:pt-8 border-t border-stone-100 mb-20 md:mb-0">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="text-xs md:text-sm">
                  <div className="font-bold text-stone-900">Quality Assured</div>
                  <div className="text-stone-500 text-[10px] md:text-xs">Certified safe for baby</div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Truck className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="text-xs md:text-sm">
                  <div className="font-bold text-stone-900">Fast Delivery</div>
                  <div className="text-stone-500 text-[10px] md:text-xs">2-4 business days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
