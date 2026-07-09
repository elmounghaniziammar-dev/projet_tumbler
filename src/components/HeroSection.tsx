import React from 'react';
import { SVGTumbler } from './SVGTumbler';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data';
import { ArrowRight, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, setSelectedProductId } = useCart();
  const flagship = PRODUCTS[0]; // Aura Horizon

  const handleShopClick = () => {
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomiseClick = () => {
    setSelectedProductId(flagship.id);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tech features to render as floating badges
  const techBadges = [
    { text: "12h Chaud / 24h Glacé", icon: Flame, x: "left-6 md:-left-12", y: "top-1/4" },
    { text: "Acier Recyclé 18/8", icon: Sparkles, x: "right-6 md:-right-12", y: "top-1/3" },
    { text: "100% Anti-fuites", icon: ShieldAlert, x: "left-12 md:-left-4", y: "bottom-1/4" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#faf8fe] py-16 md:py-32">
      {/* Subtle architectural mesh grid background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Floating circular light blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#0066FF] opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-black opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Text Content - Columns 1 to 7 */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 z-10">
          
          {/* Label / Micro Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white border border-neutral-200/80 px-4 py-1.5 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse"></span>
            <span className="font-mono text-[10px] tracking-[0.25em] font-semibold text-neutral-500 uppercase">
              L'ingénierie thermique réinventée
            </span>
          </motion.div>

          {/* Large Editorial Headline */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-black leading-[1.05]"
            >
              La pureté <br />
              <span className="text-[#0066FF]">Aura Precision</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-500 max-w-xl font-normal leading-relaxed"
            >
              Plus qu'un simple tumbler isotherme, une déclaration de style et une prouesse technologique. Conservez vos boissons à température idéale avec une précision de qualité aérospatiale.
            </motion.p>
          </div>

          {/* Performance specs inline */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center space-x-12 pt-4 border-t border-b border-neutral-200/50 py-4 w-full sm:w-auto"
          >
            <div>
              <div className="font-mono text-xs tracking-wider text-neutral-400 uppercase">Froid extrême</div>
              <div className="text-xl font-bold text-black font-sans">24 HEURES</div>
            </div>
            <div className="h-8 w-[1px] bg-neutral-200" />
            <div>
              <div className="font-mono text-xs tracking-wider text-neutral-400 uppercase">Chaud intense</div>
              <div className="text-xl font-bold text-black font-sans">12 HEURES</div>
            </div>
            <div className="h-8 w-[1px] bg-neutral-200" />
            <div>
              <div className="font-mono text-xs tracking-wider text-neutral-400 uppercase">Matériau</div>
              <div className="text-xl font-bold text-[#0066FF] font-sans">90% RECYCLÉ</div>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
          >
            {/* Primary Action Button */}
            <button
              onClick={handleShopClick}
              className="flex items-center justify-center space-x-3 bg-black text-white px-8 py-4 rounded-xl font-medium shadow-xl hover:bg-neutral-900 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <span>Découvrir la Collection</span>
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Customizer Button */}
            <button
              onClick={handleCustomiseClick}
              className="flex items-center justify-center space-x-2 border border-neutral-300 bg-white text-black hover:bg-neutral-50 hover:border-black px-8 py-4 rounded-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Personnaliser en ligne</span>
            </button>
          </motion.div>
        </div>

        {/* Visual Showcase - Columns 8 to 12 */}
        <div className="lg:col-span-5 relative flex items-center justify-center mt-12 lg:mt-0">
          
          {/* Main Visual Circle Ring Accent */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-neutral-200/50 flex items-center justify-center pointer-events-none z-0">
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-neutral-300/30 animate-[spin_100s_linear_infinite]" />
            <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#0066FF]/5 filter blur-3xl" />
          </div>

          {/* Interactive floating technological annotations */}
          {techBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.15, duration: 0.5 }}
              className={`absolute ${badge.x} ${badge.y} bg-white/80 backdrop-blur-md border border-neutral-200 shadow-lg px-4 py-2 rounded-xl flex items-center space-x-2.5 z-20 pointer-events-none`}
            >
              <badge.icon className="w-4 h-4 text-[#0066FF]" />
              <span className="text-[11px] tracking-wide font-semibold text-neutral-800 uppercase font-mono">{badge.text}</span>
            </motion.div>
          ))}

          {/* High-Fidelity SVG Tumbler with hover motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 60, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center z-10 cursor-pointer"
            onClick={handleCustomiseClick}
          >
            <SVGTumbler
              productId={flagship.id}
              selectedColor={flagship.colors[2]} // Blue Ocean
              engravingText="PURE COLD"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
