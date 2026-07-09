/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { BoutiqueView } from './components/BoutiqueView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { SVGTumbler } from './components/SVGTumbler';
import { PRODUCTS } from './data';
import { Star, ShieldCheck, Truck, RefreshCw, Layers, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const AppContent: React.FC = () => {
  const { currentPage, setCurrentPage, setSelectedProductId } = useCart();

  const handleProductQuickSelect = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopClick = () => {
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf8fe] font-sans text-neutral-800 antialiased selection:bg-[#0066FF] selection:text-white flex flex-col">
      {/* Sticky Top Glass Navigation */}
      <Navigation />

      {/* Slide-over Shopping Cart Panel */}
      <CartDrawer />

      {/* Page Routing */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <div className="space-y-0">
            {/* 1. Hero visual block */}
            <HeroSection />

            {/* 2. Interactive laboratory vacuum-shield feature specs section */}
            <FeaturesSection />

            {/* 3. Flagship Showcase Spotlight (The Aura Horizon) */}
            <section className="bg-[#faf8fe] py-24 border-t border-b border-neutral-100">
              <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Product 3D model container on the left - Span 5 */}
                <div className="lg:col-span-5 bg-white p-10 rounded-3xl border border-neutral-200/50 shadow-lg flex items-center justify-center relative overflow-hidden h-[420px] group">
                  <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase text-neutral-600">
                    🏆 Modèle Signature
                  </div>
                  <div className="w-64 h-64 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <SVGTumbler
                      productId="aura-horizon"
                      selectedColor={PRODUCTS[0].colors[2]} // Ocean Mist
                      engravingText="AURA"
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Information / Details Customizer preview on right - Span 7 */}
                <div className="lg:col-span-7 space-y-8 text-left">
                  <div className="space-y-3">
                    <span className="font-mono text-xs tracking-[0.3em] font-bold text-[#0066FF] uppercase">
                      L'Artisanat d'Exception
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
                      Le Tumbler Aura Horizon.
                    </h2>
                    <p className="text-neutral-500 leading-relaxed font-normal text-md md:text-lg">
                      Notre produit phare de 1,2 Litre, équipé d'une poignée de transport ergonomique moulée dans un polymère soft-grip de haute densité. Idéal pour vos voyages, trajets quotidiens et séances d'entraînement intenses.
                    </p>
                  </div>

                  {/* Highlights Bullet specifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-neutral-100 rounded-lg text-[#0066FF] mt-1 shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-black">Acier Recyclé à 90%</h4>
                        <p className="text-xs text-neutral-400 font-normal leading-relaxed">Conçu pour limiter l'empreinte carbone mondiale, chaque pièce d'inox provient de filières durables certifiées.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-neutral-100 rounded-lg text-[#0066FF] mt-1 shrink-0">
                        <Star className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-black">Paille Tritan Amovible</h4>
                        <p className="text-xs text-neutral-400 font-normal leading-relaxed">Paille brevetée grand débit offrant un confort optimal sans transfert de microplastiques néfastes.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleProductQuickSelect('aura-horizon')}
                    className="flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-neutral-900 shadow-md cursor-pointer transition-all"
                  >
                    <span>Configurer l'Aura Horizon</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>

            {/* 4. Secondary Catalog Quick Showcase Grid */}
            <section className="bg-white py-24">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-neutral-100 pb-10">
                  <div className="space-y-2">
                    <span className="font-mono text-xs tracking-[0.3em] font-bold text-[#0066FF] uppercase">
                      La Collection Complète
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
                      Conçus pour tous vos besoins.
                    </h2>
                  </div>
                  <button
                    onClick={handleShopClick}
                    className="text-xs font-bold text-[#0066FF] hover:underline uppercase tracking-wider flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Voir tout le catalogue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PRODUCTS.slice(1, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleProductQuickSelect(p.id)}
                      className="bg-[#faf8fe] rounded-3xl border border-neutral-200/40 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    >
                      <div className="bg-[#F5F5F7] rounded-2xl p-6 flex items-center justify-center relative overflow-hidden h-64 border border-neutral-200/10">
                        <span className="absolute top-3 left-3 text-[10px] font-bold font-mono tracking-wider uppercase text-neutral-400">
                          {p.specs.capacity}
                        </span>
                        <div className="w-44 h-44 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <SVGTumbler productId={p.id} selectedColor={p.colors[0]} animate={false} className="w-full h-full" />
                        </div>
                      </div>
                      <div className="pt-6 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-md font-bold text-black tracking-tight">{p.name}</h4>
                          <span className="text-xs font-bold font-mono text-neutral-400 bg-white border border-neutral-200 px-2.5 py-1 rounded-md">{p.basePrice} €</span>
                        </div>
                        <p className="text-xs text-neutral-500 font-normal line-clamp-1">{p.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* 5. Brand Trust Indicators Row */}
            <section className="bg-neutral-50 py-16 border-t border-b border-neutral-200/50">
              <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="p-3 bg-white rounded-xl text-[#0066FF] border border-neutral-200/60 shadow-sm">
                    <Truck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black uppercase tracking-wider font-mono">Livraison Express</h4>
                    <p className="text-xs text-neutral-400 pt-1 leading-relaxed font-normal">Expédition sous 24h/48h. Gratuite dès 50€ d'achat partout en Europe.</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="p-3 bg-white rounded-xl text-[#0066FF] border border-neutral-200/60 shadow-sm">
                    <RefreshCw className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black uppercase tracking-wider font-mono">Retours sous 30 Jours</h4>
                    <p className="text-xs text-neutral-400 pt-1 leading-relaxed font-normal">Un produit ne vous convient pas ? Retournez-le gratuitement sans questions.</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="p-3 bg-white rounded-xl text-[#0066FF] border border-neutral-200/60 shadow-sm">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black uppercase tracking-wider font-mono">Garantie Thermique</h4>
                    <p className="text-xs text-neutral-400 pt-1 leading-relaxed font-normal">Tous nos gobelets bénéficient d'une garantie à vie sur l'isolation sous vide.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'shop' && <BoutiqueView />}

        {currentPage === 'product' && <ProductDetailView />}

        {currentPage === 'checkout' && <CheckoutView />}
      </main>

      {/* Brand Editorial Footer */}
      <footer className="bg-black text-white py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-neutral-800 pb-16">
          
          {/* Column 1: Brand details - Span 5 */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm tracking-[0.3em] font-bold uppercase text-white">AURA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span className="font-sans text-xs tracking-[0.2em] font-light text-neutral-400 uppercase">PRECISION</span>
            </div>
            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-normal max-w-sm">
              L'ingénierie du vide thermique appliquée au design de vie contemporain. Nous concevons les meilleurs isolateurs thermiques de la planète pour limiter le plastique à usage unique.
            </p>
          </div>

          {/* Column 2: Quick links - Span 3 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-neutral-300">L'Atelier Aura</h4>
            <div className="flex flex-col space-y-2.5 text-xs text-neutral-400">
              <button onClick={() => setCurrentPage('shop')} className="text-left hover:text-white cursor-pointer">Boutique</button>
              <button onClick={() => handleProductQuickSelect('aura-horizon')} className="text-left hover:text-white cursor-pointer">Aura Horizon 1.2L</button>
              <button onClick={() => handleProductQuickSelect('aura-nomad')} className="text-left hover:text-white cursor-pointer">Aura Nomad 750ml</button>
            </div>
          </div>

          {/* Column 3: Engineering specs info - Span 4 */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-neutral-300">Normes de Précision</h4>
            <div className="space-y-1.5 text-xs text-neutral-400">
              <span className="block font-mono">Index d'étanchéité : IPX7 hermétique</span>
              <span className="block font-mono">Nuance d'Inox : Grade Alimentaire 18/8 304</span>
              <span className="block font-mono">Absence de BPA : 100% certifié SGS</span>
              <span className="block font-mono">Conception : Bureau d'études Paris, France</span>
            </div>
          </div>

        </div>

        {/* Legal bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Aura Precision Corp. Tous droits réservés.</span>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer">Conditions Générales de Vente</span>
            <span className="hover:text-white cursor-pointer">Charte de Confidentialité</span>
            <span className="hover:text-white cursor-pointer">Mentions Légales</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
