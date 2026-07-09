import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, REVIEWS } from '../data';
import { SVGTumbler } from './SVGTumbler';
import { Star, ShieldCheck, Flame, Wind, ShoppingBag, ArrowLeft, RotateCcw, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const ProductDetailView: React.FC = () => {
  const { selectedProductId, setCurrentPage, addToCart, setSelectedProductId } = useCart();
  
  // Find current product or fallback to flagship
  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  // Selected configurations
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedAccessory, setSelectedAccessory] = useState(product.accessories[0]);
  const [engravingText, setEngravingText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  // If selectedProductId changes, reset configuration to product defaults
  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedAccessory(product.accessories[0]);
    setEngravingText('');
    setQuantity(1);
  }, [selectedProductId, product]);

  const engravingCharge = engravingText ? 8 : 0;
  const totalPrice = (product.basePrice + (selectedAccessory?.price || 0) + engravingCharge) * quantity;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedAccessory, engravingText);
  };

  const handleBackToShop = () => {
    setSelectedProductId(null);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Back Link */}
        <button
          onClick={handleBackToShop}
          className="inline-flex items-center space-x-2 text-sm font-semibold tracking-wide text-neutral-500 hover:text-black transition-colors mb-10 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Retour à la Boutique</span>
        </button>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Large Live Customized Preview (Columns 1 to 6) */}
          <div className="lg:col-span-6 flex flex-col items-center bg-[#F5F5F7] rounded-3xl p-8 md:p-16 border border-neutral-100 shadow-inner sticky top-24">
            
            {/* Design Studio Title Overlay */}
            <div className="w-full flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] animate-pulse"></span>
                <span className="font-mono text-[9px] tracking-[0.25em] font-extrabold text-neutral-400 uppercase">
                  Aura custom studio v1.2
                </span>
              </div>
              <button
                onClick={() => {
                  setEngravingText('');
                  setSelectedColor(product.colors[0]);
                  setSelectedAccessory(product.accessories[0]);
                }}
                className="inline-flex items-center space-x-1.5 text-[10px] font-mono tracking-widest text-neutral-400 hover:text-[#0066FF] uppercase transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Réinitialiser</span>
              </button>
            </div>

            {/* Render Customizable SVGTumbler with laser-engraving text overlay */}
            <div className="w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center relative">
              <SVGTumbler
                productId={product.id}
                selectedColor={selectedColor}
                engravingText={engravingText}
                accessoryId={selectedAccessory?.id}
                className="w-full h-full"
              />
              
              {/* Overlay Label for Engraving Position */}
              {engravingText && (
                <div className="absolute bottom-4 bg-black text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-md shadow-md animate-bounce">
                  Gravure laser active
                </div>
              )}
            </div>

            {/* Spec Quick Badges under Preview */}
            <div className="w-full grid grid-cols-3 gap-3 mt-10">
              <div className="bg-white/80 p-3 rounded-xl border border-neutral-200/50 text-center flex flex-col justify-center items-center">
                <Flame className="w-4 h-4 text-[#0066FF] mb-1" />
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Froid</span>
                <span className="text-xs font-bold text-black">{product.specs.retentionCold}</span>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-neutral-200/50 text-center flex flex-col justify-center items-center">
                <Wind className="w-4 h-4 text-orange-400 mb-1" />
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Chaud</span>
                <span className="text-xs font-bold text-black">{product.specs.retentionHot}</span>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-neutral-200/50 text-center flex flex-col justify-center items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Garantie</span>
                <span className="text-xs font-bold text-black">À vie</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Configuration Panel (Columns 7 to 12) */}
          <div className="lg:col-span-6 space-y-10">
            
            {/* Product Meta Info */}
            <div className="space-y-4">
              <span className="inline-flex bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider font-mono uppercase text-neutral-600">
                {product.specs.capacity}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-black tracking-tight">{product.name}</h1>
              <p className="text-xl font-light text-neutral-400">{product.subtitle}</p>

              {/* Rating stars */}
              <div className="flex items-center space-x-2 pt-1">
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-black text-black" />
                  ))}
                </div>
                <span className="text-sm font-bold font-mono text-black">{product.rating}</span>
                <span className="text-neutral-300">|</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
                >
                  {product.reviewsCount} avis certifiés
                </button>
              </div>
            </div>

            {/* Price block */}
            <div className="p-6 bg-[#faf8fe] rounded-2xl border border-neutral-200/40 flex items-center justify-between">
              <div>
                <span className="block text-xs font-mono text-neutral-400 uppercase tracking-wider">Prix configuré</span>
                <span className="text-3xl font-extrabold text-black">{totalPrice} €</span>
              </div>
              <span className="text-xs text-neutral-400 text-right">
                TVA de 20% incluse <br />
                Livraison gratuite dès 50€
              </span>
            </div>

            {/* Customizer Selector 1: Color options */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                  1. Couleur de finition
                </span>
                <span className="text-xs font-semibold text-black">{selectedColor.name}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`h-11 px-4 rounded-xl border flex items-center space-x-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-black bg-neutral-50 shadow-sm'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <span className="w-5.5 h-5.5 rounded-full border border-black/10 shadow-inner block" style={{ backgroundColor: color.hex }} />
                      <span className="text-xs font-semibold text-neutral-800">{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customizer Selector 2: Accessories */}
            {product.accessories.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                    2. Accessoire couvercle / base
                  </span>
                  {selectedAccessory && (
                    <span className="text-xs font-semibold text-neutral-500">
                      {selectedAccessory.price > 0 ? `+${selectedAccessory.price} €` : 'Inclus'}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.accessories.map((acc) => {
                    const isSelected = selectedAccessory?.id === acc.id;
                    return (
                      <button
                        key={acc.id}
                        onClick={() => setSelectedAccessory(acc)}
                        className={`text-left p-4 rounded-xl border flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-black bg-neutral-50 shadow-sm'
                            : 'border-neutral-200 hover:border-neutral-400 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-black">{acc.name}</span>
                          <span className="text-xs font-mono text-neutral-500">
                            {acc.price > 0 ? `+${acc.price} €` : 'Inclus'}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-400 leading-relaxed font-normal">{acc.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Customizer Selector 3: Premium Laser Engraving */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 flex items-center space-x-1.5">
                  <span>3. Personnalisation gravure</span>
                  <span className="text-[10px] bg-[#0066FF] text-white px-1.5 py-0.5 rounded font-bold uppercase">Atelier Paris</span>
                </span>
                <span className="text-xs font-semibold text-neutral-500">
                  {engravingText ? '+8,00 €' : 'Optionnel'}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    maxLength={16}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                    placeholder="TEXTE À GRAVER (16 CARACTÈRES MAX)"
                    className="w-full bg-white border border-neutral-200 text-xs font-mono uppercase tracking-widest p-4 rounded-xl focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] focus:outline-none placeholder-neutral-400 shadow-sm"
                  />
                  {engravingText && (
                    <button
                      onClick={() => setEngravingText('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black font-mono text-[10px] tracking-wider uppercase"
                    >
                      Effacer
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-neutral-400 flex items-start space-x-1.5 leading-relaxed font-normal">
                  <AlertCircle className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>La gravure permanente est effectuée au laser de précision CO2 dans notre atelier parisien. Comptez 24h de délai additionnel.</span>
                </p>
              </div>
            </div>

            {/* Quantity and Actions Bar */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-6 border-t border-neutral-100">
              {/* Quantity selector counter */}
              <div className="flex items-center border border-neutral-200 rounded-xl bg-white h-14">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-lg font-bold text-neutral-500 hover:text-black transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono font-bold text-sm text-black select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-lg font-bold text-neutral-500 hover:text-black transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Basket Action */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center space-x-3 bg-[#0066FF] text-white rounded-xl font-bold uppercase text-xs tracking-widest h-14 hover:bg-[#0050cc] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-[#0066FF]/15"
              >
                <ShoppingBag className="w-4.5 h-4.5 stroke-[2]" />
                <span>Ajouter au Panier</span>
              </button>
            </div>

            {/* Editorial Information Tabs */}
            <div className="pt-10 border-t border-neutral-100">
              <div className="flex border-b border-neutral-200">
                {[
                  { id: 'desc', label: 'Description' },
                  { id: 'specs', label: 'Fiche Technique' },
                  { id: 'reviews', label: 'Avis Clients' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 text-xs tracking-wider uppercase font-bold mr-8 relative cursor-pointer ${
                      activeTab === tab.id ? 'text-black' : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.span
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {activeTab === 'desc' && (
                  <p className="text-neutral-500 text-sm leading-relaxed font-normal">
                    {product.description}
                  </p>
                )}

                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div className="border-b border-neutral-100 pb-2">
                      <span className="block text-[10px] font-mono text-neutral-400 uppercase">Capacité</span>
                      <span className="font-semibold text-black">{product.specs.capacity}</span>
                    </div>
                    <div className="border-b border-neutral-100 pb-2">
                      <span className="block text-[10px] font-mono text-neutral-400 uppercase">Matériau de base</span>
                      <span className="font-semibold text-black">{product.specs.material}</span>
                    </div>
                    <div className="border-b border-neutral-100 pb-2">
                      <span className="block text-[10px] font-mono text-neutral-400 uppercase">Poids (à vide)</span>
                      <span className="font-semibold text-black">{product.specs.weight}</span>
                    </div>
                    <div className="border-b border-neutral-100 pb-2">
                      <span className="block text-[10px] font-mono text-neutral-400 uppercase">Dimensions</span>
                      <span className="font-semibold text-black">{product.specs.dimensions}</span>
                    </div>
                    <div className="border-b border-neutral-100 pb-2">
                      <span className="block text-[10px] font-mono text-neutral-400 uppercase">Sans Bisphénol-A</span>
                      <span className="font-semibold text-black">{product.specs.bpaFree ? 'Oui (100% Sans BPA)' : 'Non'}</span>
                    </div>
                    <div className="border-b border-neutral-100 pb-2">
                      <span className="block text-[10px] font-mono text-neutral-400 uppercase">Lave-vaisselle</span>
                      <span className="font-semibold text-black">{product.specs.dishwasherSafe ? 'Compatible (Panier haut)' : 'Lavage main conseillé'}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {REVIEWS.map((rev, i) => (
                      <div key={i} className="border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <div>
                            <span className="font-bold text-black text-sm block">{rev.name}</span>
                            <span className="text-[10px] font-mono text-neutral-400 uppercase">{rev.role}</span>
                          </div>
                          <span className="text-xs text-neutral-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center space-x-0.5 mb-2">
                          {[...Array(rev.rating)].map((_, rIdx) => (
                            <Star key={rIdx} className="w-3.5 h-3.5 fill-black text-black" />
                          ))}
                        </div>
                        <p className="text-neutral-500 text-xs md:text-sm leading-relaxed font-normal">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
