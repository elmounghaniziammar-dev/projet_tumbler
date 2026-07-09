import React, { useState } from 'react';
import { PRODUCTS } from '../data';
import { Product, ColorOption } from '../types';
import { useCart } from '../context/CartContext';
import { SVGTumbler } from './SVGTumbler';
import { Star, SlidersHorizontal, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BoutiqueView: React.FC = () => {
  const { setCurrentPage, setSelectedProductId } = useCart();
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('featured');

  // Track the selected color for each product card independently!
  // Map of product.id -> color object
  const [cardSelectedColors, setCardSelectedColors] = useState<Record<string, ColorOption>>(() => {
    const initial: Record<string, ColorOption> = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = p.colors[0]; // default to first color
    });
    return initial;
  });

  const handleCardColorChange = (productId: string, color: ColorOption) => {
    setCardSelectedColors((prev) => ({
      ...prev,
      [productId]: color,
    }));
  };

  const handleProductDetailClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedSizeFilter === 'all') return true;
    if (selectedSizeFilter === 'compact') return product.specs.capacity.includes('450 ml');
    if (selectedSizeFilter === 'medium') return product.specs.capacity.includes('750 ml');
    if (selectedSizeFilter === 'large') {
      return product.specs.capacity.includes('1,2 L') || product.specs.capacity.includes('950 ml');
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === 'price-asc') return a.basePrice - b.basePrice;
    if (selectedSort === 'price-desc') return b.basePrice - a.basePrice;
    if (selectedSort === 'rating') return b.rating - a.rating;
    return a.featured === b.featured ? 0 : a.featured ? -1 : 1; // default featured
  });

  return (
    <section className="bg-[#faf8fe] py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Title Header */}
        <div className="border-b border-neutral-200/60 pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-mono text-xs tracking-[0.3em] font-bold text-[#0066FF] uppercase block">
              Aura Catalog
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
              L'atelier des Tumblers
            </h1>
            <p className="text-neutral-500 max-w-xl text-sm md:text-base">
              Explorez notre gamme de contenants thermiques haute performance. Chaque modèle répond à une exigence de précision, d'étanchéité et de durabilité écologique.
            </p>
          </div>
          
          {/* Size Filter Pills & Sort Select */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex bg-neutral-200/50 p-1 rounded-xl">
              {[
                { label: 'Tous', value: 'all' },
                { label: 'Compact', value: 'compact' },
                { label: 'Moyen', value: 'medium' },
                { label: 'Grand', value: 'large' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedSizeFilter(tab.value)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase cursor-pointer transition-all ${
                    selectedSizeFilter === tab.value
                      ? 'bg-white text-[#0066FF] shadow-sm'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="appearance-none bg-white border border-neutral-200 text-neutral-800 text-xs font-semibold tracking-wider uppercase px-4 py-3.5 pr-10 rounded-xl focus:border-[#0066FF] focus:outline-none cursor-pointer shadow-sm"
              >
                <option value="featured">Recommandé</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
                <option value="rating">Mieux notés</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-neutral-500 border-l border-neutral-200/80 my-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {sortedProducts.map((product) => {
              const selectedColor = cardSelectedColors[product.id] || product.colors[0];
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl border border-neutral-200/50 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300"
                >
                  
                  {/* Card Image Container with light grey backing */}
                  <div className="relative bg-[#F5F5F7] p-8 flex items-center justify-center overflow-hidden h-80 border-b border-neutral-100">
                    
                    {/* Badge Pill tag in corner (e.g. Best-seller) */}
                    {product.tag && (
                      <span className="absolute top-4 left-4 z-10 inline-flex items-center space-x-1 bg-white border border-neutral-200/80 shadow-sm px-3 py-1.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase text-black">
                        <Sparkles className="w-3 h-3 text-[#0066FF]" />
                        <span>{product.tag}</span>
                      </span>
                    )}

                    {/* Capacity Indicator in other corner */}
                    <span className="absolute top-4 right-4 z-10 text-[10px] font-semibold font-mono tracking-wider text-neutral-400 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-neutral-200/20">
                      {product.specs.capacity}
                    </span>

                    {/* Interactive SVGTumbler changes color in real-time when clicking circular color swatches */}
                    <div className="w-56 h-56 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                      <SVGTumbler
                        productId={product.id}
                        selectedColor={selectedColor}
                        animate={false}
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Card Content Information */}
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-black tracking-tight">{product.name}</h3>
                        <span className="text-lg font-extrabold text-black font-sans">{product.basePrice} €</span>
                      </div>
                      <p className="text-neutral-500 text-sm font-normal line-clamp-2">{product.subtitle}</p>
                    </div>

                    {/* Interactive Swatches Section on Card */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                      <div className="flex items-center space-x-2">
                        {product.colors.map((color) => {
                          const isActive = selectedColor.id === color.id;
                          return (
                            <button
                              key={color.id}
                              onClick={() => handleCardColorChange(product.id, color)}
                              className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                                isActive ? 'border-black scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                              }`}
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            >
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white mix-blend-difference" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Rating stars inline */}
                      <div className="flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 fill-black text-black" />
                        <span className="text-xs font-mono font-bold text-black">{product.rating}</span>
                        <span className="text-[10px] text-neutral-400">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Quick Purchase action button */}
                    <button
                      onClick={() => handleProductDetailClick(product.id)}
                      className="w-full bg-black text-white py-3.5 rounded-xl text-xs tracking-widest font-bold uppercase hover:bg-neutral-900 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <span>Configurer & Commander</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
