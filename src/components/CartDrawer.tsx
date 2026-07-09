import React from 'react';
import { useCart } from '../context/CartContext';
import { SVGTumbler } from './SVGTumbler';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    setCurrentPage,
    setCheckoutStep,
  } = useCart();

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setCheckoutStep('shipping');
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black backdrop-blur-xs cursor-pointer"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-neutral-200 flex flex-col justify-between"
          >
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-neutral-200/80 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-5 h-5 text-[#0066FF]" />
                <h2 className="text-lg font-bold text-black tracking-tight uppercase font-mono">
                  Mon Panier ({cartItemsCount})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Items List (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 bg-neutral-100 rounded-full text-neutral-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-md font-bold text-black">Votre panier est vide</h3>
                    <p className="text-neutral-400 text-xs max-w-[240px]">
                      Explorez l'atelier pour configurer votre premier gobelet isotherme.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentPage('shop');
                    }}
                    className="text-xs font-bold text-[#0066FF] hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    Découvrir l'Atelier
                  </button>
                </div>
              ) : (
                cartItems.map((item) => {
                  const accessoryPrice = item.selectedAccessory?.price || 0;
                  const engravingPrice = item.engravingText ? 8 : 0;
                  const singlePrice = item.product.basePrice + accessoryPrice + engravingPrice;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-stretch space-x-4 pb-6 border-b border-neutral-100"
                    >
                      {/* Thumbnail with product grey backing */}
                      <div className="w-24 bg-[#F5F5F7] rounded-xl flex items-center justify-center p-2 border border-neutral-100 h-24 shrink-0">
                        <SVGTumbler
                          productId={item.product.id}
                          selectedColor={item.selectedColor}
                          engravingText={item.engravingText}
                          accessoryId={item.selectedAccessory?.id}
                          animate={false}
                          className="w-full h-full"
                        />
                      </div>

                      {/* Info & Adjustments */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-bold text-black tracking-tight">{item.product.name}</h4>
                            <span className="text-sm font-bold text-black font-sans">{singlePrice * item.quantity} €</span>
                          </div>
                          <span className="block text-[10px] text-neutral-400 font-semibold uppercase font-mono mt-0.5">
                            Finition : {item.selectedColor.name}
                          </span>
                          {item.selectedAccessory && (
                            <span className="block text-[10px] text-neutral-400 font-semibold uppercase font-mono">
                              Accessoire : {item.selectedAccessory.name}
                            </span>
                          )}
                          {item.engravingText && (
                            <span className="inline-flex items-center space-x-1 mt-1 px-1.5 py-0.5 rounded bg-neutral-100 text-[9px] font-mono font-bold uppercase text-[#0066FF]">
                              <span>Gravure : "{item.engravingText}"</span>
                            </span>
                          )}
                        </div>

                        {/* Adjuster controls */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-neutral-200 rounded-lg bg-white">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-sm text-neutral-400 hover:text-black cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-1 w-6 text-center font-mono text-xs font-bold text-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-sm text-neutral-400 hover:text-black cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Supprimer du panier"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer Summary & Checkout CTA */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-6">
                
                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Sous-total</span>
                    <span className="font-mono">{cartTotal} €</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Frais de port</span>
                    <span className="font-mono text-emerald-600">
                      {cartTotal >= 50 ? 'GRATUIT' : '4,90 €'}
                    </span>
                  </div>
                  <div className="h-[1px] bg-neutral-200" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-black">Total</span>
                    <span className="text-lg font-extrabold text-black font-sans">
                      {cartTotal >= 50 ? cartTotal : cartTotal + 4.9} €
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Checkout CTA */}
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full bg-[#0066FF] hover:bg-[#0050cc] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-[#0066FF]/15 transition-all cursor-pointer"
                  >
                    <span>Passer au Paiement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Security disclaimer */}
                  <div className="flex items-center justify-center space-x-1.5 text-[10px] text-neutral-400 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Transactions sécurisées SSL 256 bits</span>
                  </div>
                </div>

              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
