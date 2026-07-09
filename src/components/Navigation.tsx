import React from 'react';
import { ShoppingBag, ChevronRight, Menu, X, Sliders } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navigation: React.FC = () => {
  const { cartItems, currentPage, setCurrentPage, setIsCartOpen, setSelectedProductId } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Accueil', page: 'home' as const },
    { label: 'Boutique', page: 'shop' as const },
  ];

  const handleLinkClick = (page: 'home' | 'shop') => {
    setCurrentPage(page);
    setSelectedProductId(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomiseClick = () => {
    setCurrentPage('product');
    setSelectedProductId('aura-horizon'); // Default flagship product for customization
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Logo Brand Name */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center space-x-2 text-black cursor-pointer group"
          >
            <span className="font-mono text-sm tracking-[0.3em] font-bold uppercase transition-colors group-hover:text-neutral-600">
              AURA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse"></span>
            <span className="font-sans text-xs tracking-[0.2em] font-light text-neutral-500 uppercase">
              PRECISION
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`text-sm tracking-wide font-medium relative py-1 cursor-pointer transition-colors ${
                  currentPage === link.page
                    ? 'text-[#0066FF]'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {link.label}
                {currentPage === link.page && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066FF] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            {/* CTA Studio Personnalisation */}
            <button
              onClick={handleCustomiseClick}
              className="flex items-center space-x-2 text-xs tracking-widest font-semibold uppercase bg-neutral-100 text-neutral-800 px-4 py-2 rounded-full border border-neutral-200 hover:border-[#0066FF] hover:bg-neutral-50 hover:text-[#0066FF] transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Personnaliser</span>
            </button>
          </nav>

          {/* Right Utilities (Cart, Mobile Menu toggle) */}
          <div className="flex items-center space-x-4">
            {/* Basket Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-neutral-100 text-black transition-colors cursor-pointer"
              aria-label="Voir le panier"
            >
              <ShoppingBag className="w-5.5 h-5.5 stroke-[1.75]" />
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#0066FF] text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-30 md:hidden bg-white/95 backdrop-blur-2xl border-b border-neutral-200 shadow-xl"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className="flex items-center justify-between text-lg font-medium text-left text-neutral-800 hover:text-black py-2 border-b border-neutral-100 cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </button>
              ))}
              
              <button
                onClick={handleCustomiseClick}
                className="flex items-center justify-center space-x-2 text-sm tracking-wider font-bold uppercase bg-black text-white py-4 rounded-xl shadow-lg hover:bg-neutral-900 transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                <span>Atelier de Personnalisation</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
