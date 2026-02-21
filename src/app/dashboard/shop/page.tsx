
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

const CATEGORIES = ['All', 'Baby Care', 'Feeding', 'Sleep', 'Hygiene & Safety', 'Mother Wellness'];

export default function ShopPage() {
  const { data: session } = useSession();
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
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium uppercase tracking-wider mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Curated for Mother & Baby</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 leading-tight">
              Essentials for Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                Beautiful Journey
              </span>
            </h1>
            
            <p className="text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
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
                    : "bg-white text-stone-500 border border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <span>Showing {filteredProducts.length} products</span>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-[2rem] h-[420px] animate-pulse border border-stone-100" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[2rem] border border-stone-100 border-dashed">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-stone-300" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">No products found</h3>
            <p className="text-stone-500">We couldn't find what you're looking for.</p>
            <Button 
              variant="link" 
              onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
              className="text-rose-600 mt-2"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/dashboard/shop/${product.handle}`} className="group h-full block">
                    <Card className="h-full border-none shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 rounded-[2rem] overflow-hidden bg-white flex flex-col relative group">
                      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                        {product.recommendedStage?.some(s => userStage.includes(s)) && (
                          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm flex items-center gap-1.5 border border-white/50">
                            <Sparkles className="w-3 h-3 text-amber-500" /> 
                            <span>For You</span>
                          </div>
                        )}

                        {product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price) && (
                          <div className="absolute top-4 right-4 z-10 bg-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
                            Sale
                          </div>
                        )}

                        {product.images[0] && (
                          <Image
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        )}
                        
                        {/* Quick View Overlay (Desktop) */}
                        <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 hidden lg:block">
                          <Button className="w-full rounded-full bg-white/90 backdrop-blur text-stone-900 hover:bg-stone-900 hover:text-white shadow-lg border border-white/50 transition-all duration-300">
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className="p-6 flex-grow flex flex-col">
                        <div className="text-[10px] font-bold text-rose-600 mb-2 uppercase tracking-widest">{product.category}</div>
                        <h3 className="font-serif font-bold text-lg text-stone-900 mb-2 leading-tight group-hover:text-rose-600 transition-colors line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-stone-500 text-sm line-clamp-2 mb-4 leading-relaxed flex-grow">
                          {product.description}
                        </p>
                        
                        <div className="flex items-end justify-between mt-auto pt-4 border-t border-stone-50">
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-stone-900">₹{product.price}</span>
                            {product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price) && (
                              <span className="text-xs text-stone-400 line-through">₹{product.compareAtPrice}</span>
                            )}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-300 lg:hidden">
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
