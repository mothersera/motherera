
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Loader2, ShoppingBag, Filter, Heart, Sparkles, Search } from "lucide-react";
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
      <div className="bg-white border-b border-stone-100 py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-rose-600 font-medium mb-3">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-sm uppercase tracking-wider">Mother Era Shop</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-4">
                Curated Essentials <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                  For You & Baby
                </span>
              </h1>
              <p className="text-stone-500 text-lg max-w-xl">
                Handpicked, safe, and premium products to support every step of your motherhood journey.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="w-full md:w-auto relative">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-stone-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
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
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center md:justify-start">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-stone-900 text-white shadow-lg scale-105" 
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:border-stone-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-3xl h-[400px] animate-pulse border border-stone-100" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-stone-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-stone-400">No products found</h3>
            <p className="text-stone-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence>
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
                    <Card className="h-full border-none shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl overflow-hidden bg-white ring-1 ring-stone-100 flex flex-col">
                      <div className="relative aspect-square overflow-hidden bg-stone-50">
                        {product.recommendedStage?.some(s => userStage.includes(s)) && (
                          <div className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Recommended
                          </div>
                        )}
                        {product.compareAtPrice && (
                          <div className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm text-stone-900 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm">
                            Sale
                          </div>
                        )}
                        {product.images[0] && (
                          <Image
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        )}
                      </div>
                      
                      <CardContent className="p-6 flex-grow">
                        <div className="text-xs font-medium text-stone-400 mb-2 uppercase tracking-wide">{product.category}</div>
                        <h3 className="font-serif font-bold text-lg text-stone-900 mb-2 leading-tight group-hover:text-rose-600 transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-stone-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                          {product.description}
                        </p>
                      </CardContent>
                      
                      <CardFooter className="p-6 pt-0 flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-stone-900">₹{product.price}</span>
                          {product.compareAtPrice && (
                            <span className="text-xs text-stone-400 line-through">₹{product.compareAtPrice}</span>
                          )}
                        </div>
                        <Button size="sm" className="rounded-full bg-stone-900 hover:bg-rose-600 transition-colors px-6">
                          View
                        </Button>
                      </CardFooter>
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
