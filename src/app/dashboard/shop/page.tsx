
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Loader2, ShoppingBag, Filter, Heart, Sparkles, Search, ArrowLeft } from "lucide-react";
import { fetchProducts, Product } from "@/lib/shopify";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { CurrencySelector } from "@/components/shop/CurrencySelector";

const CATEGORIES = ['All', 'Baby Care', 'Feeding', 'Sleep', 'Hygiene & Safety', 'Mother Wellness'];

export default function ShopPage() {
  const { data: session } = useSession();
  const { convertAndFormat } = useCurrency();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const userStage = session?.user?.motherhoodStage || 'general';

  useEffect(() => {
    loadProducts();
  }, [activeCategory]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProducts(activeCategory === 'All' ? undefined : activeCategory, userStage);
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50/50 pb-20">
      {/* Header */}
      <div className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffe4e6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[10px] md:text-xs font-medium uppercase tracking-wider mb-2 md:mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Curated for Mother & Baby</span>
            </div>
            
            <h1 className="text-3xl md:text-6xl font-serif font-bold text-stone-900 leading-tight">
              Essentials for Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                Beautiful Journey
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
              Discover safe, premium, and lovingly selected products designed to support you through every stage of motherhood.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-purple-200 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-rose-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search for pumps, bottles, care..." 
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-stone-200 shadow-sm focus:border-rose-300 focus:ring-4 focus:ring-rose-50 outline-none transition-all text-stone-900 placeholder:text-stone-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto no-scrollbar mask-gradient">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat 
                    ? "bg-stone-900 text-white shadow-lg shadow-stone-200 scale-105" 
                    : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:border-stone-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <CurrencySelector />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Skeletons
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-stone-200 h-64 rounded-2xl mb-4" />
                  <div className="bg-stone-200 h-4 w-3/4 rounded mb-2" />
                  <div className="bg-stone-200 h-4 w-1/2 rounded" />
                </div>
              ))
            ) : (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="group border-stone-100 hover:border-rose-100 hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300 overflow-hidden h-full flex flex-col bg-white rounded-2xl">
                    <CardHeader className="p-0 relative aspect-square overflow-hidden bg-stone-50">
                      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-rose-500 shadow-sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <Image
                        src={product.images[0]?.src || '/placeholder.jpg'}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.tags?.includes('Best Seller') && (
                        <div className="absolute top-3 left-3 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border border-amber-200/50">
                          Best Seller
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="p-5 flex-1 flex flex-col gap-2">
                      <h3 className="font-serif text-lg font-medium text-stone-900 line-clamp-2 group-hover:text-rose-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-stone-900">
                          {convertAndFormat(parseFloat(product.variants[0]?.price?.amount || "0"))}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <span>In Stock</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button 
                        asChild 
                        className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-xl h-11 shadow-lg shadow-stone-200 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <Link href={`/dashboard/shop/${product.handle}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
