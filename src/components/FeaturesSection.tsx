import React, { useState } from 'react';
import { Shield, Sparkles, Thermometer, Wind, Droplets, PenTool, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FeaturesSection: React.FC = () => {
  const [thermalMode, setThermalMode] = useState<'cold' | 'hot'>('cold');

  const technicalGrid = [
    {
      title: "Matériaux Qualité Chirurgicale",
      desc: "Acier inoxydable 18/8 de qualité alimentaire qui ne rouille pas, ne transfère pas les goûts et résiste aux chocs de la vie quotidienne.",
      icon: Shield,
    },
    {
      title: "Étanchéité Certifiée 100%",
      desc: "Des joints d'étanchéité en silicone médical brevetés empêchent la moindre fuite, même lorsque le gobelet est complètement retourné.",
      icon: Droplets,
    },
    {
      title: "Isolation Sous Vide Temp-Shield",
      desc: "L'absence totale d'air entre les deux parois d'acier élimine la conduction thermique, évitant également toute condensation externe.",
      icon: Wind,
    },
    {
      title: "Gravure Laser Permanente",
      desc: "Un atelier de gravure sur-mesure de haute précision à Paris. Gravez votre prénom ou un mot fétiche directement dans l'acier.",
      icon: PenTool,
    },
  ];

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="font-mono text-xs tracking-[0.3em] font-bold text-[#0066FF] uppercase">
            Aura Engineering Labs
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
            L'anatomie d'un froid parfait.
          </h2>
          <p className="text-neutral-500 font-normal text-md md:text-lg">
            Chaque millimètre de nos tumblers a été conçu avec la rigueur d'un laboratoire technologique pour une expérience d'hydratation sans compromis.
          </p>
        </div>

        {/* 1. Interactive Thermal Vacuum Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28 bg-[#faf8fe] rounded-3xl p-8 md:p-16 border border-neutral-100 shadow-sm">
          
          {/* Controls & Explanation - Column Span 5 */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex bg-[#0066FF]/10 text-[#0066FF] text-[10px] font-mono tracking-widest px-3 py-1 rounded-full font-bold uppercase">
              Simulateur de Vide
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
              Comment fonctionne notre double paroi ?
            </h3>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
              En retirant l'air situé entre les deux parois de métal, nous créons un vide thermique absolu. Sans matière pour conduire l'énergie, le transfert de température s'arrête instantanément.
            </p>

            {/* Selector Tabs */}
            <div className="flex bg-neutral-200/50 p-1 rounded-xl w-full max-w-[280px]">
              <button
                onClick={() => setThermalMode('cold')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all ${
                  thermalMode === 'cold'
                    ? 'bg-white text-[#0066FF] shadow-md'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                <Wind className="w-3.5 h-3.5" />
                <span>Mode Glacé</span>
              </button>
              <button
                onClick={() => setThermalMode('hot')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all ${
                  thermalMode === 'hot'
                    ? 'bg-white text-orange-500 shadow-md'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                <Thermometer className="w-3.5 h-3.5" />
                <span>Mode Chaud</span>
              </button>
            </div>

            {/* Specs detail boxes */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-4 rounded-xl border border-neutral-200/50 shadow-sm">
                <span className="block text-xs font-mono text-neutral-400 uppercase tracking-wider">Index d'Isolation</span>
                <span className="block text-lg font-bold text-black pt-1">99.8% Étanche</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-neutral-200/50 shadow-sm">
                <span className="block text-xs font-mono text-neutral-400 uppercase tracking-wider">Vide Inter-paroi</span>
                <span className="block text-lg font-bold text-[#0066FF] pt-1">10⁻⁵ Torr</span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation graphic - Column Span 7 */}
          <div className="lg:col-span-7 flex justify-center relative bg-white rounded-2xl border border-neutral-200/50 shadow-lg py-12 px-6 h-96">
            
            {/* Legend indicators */}
            <div className="absolute top-4 left-6 flex space-x-4 text-xs font-mono text-neutral-400">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200 border border-neutral-400"></span>
                <span>Acier 18/8</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-100 border border-cyan-400"></span>
                <span>Barrière de vide</span>
              </span>
            </div>

            {/* Dynamic visualizers */}
            <div className="flex items-center justify-between w-full max-w-[420px] relative">
              {/* Outside Temperature waves (Entering from Left) */}
              <div className="flex flex-col space-y-6 items-end w-24">
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-neutral-400 mb-2">Milieu Externe</span>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [0, 8, 0],
                      opacity: [0.3, 0.9, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                    className={`h-1.5 rounded-full w-12 ${
                      thermalMode === 'cold' ? 'bg-orange-400' : 'bg-cyan-400'
                    }`}
                  />
                ))}
              </div>

              {/* Cross Section Wall Graphic */}
              <div className="flex items-center space-x-1 bg-neutral-100 rounded-xl py-6 px-4 border border-neutral-200 shadow-inner">
                {/* Wall 1 (Outer Steel) */}
                <div className="w-4 h-56 bg-neutral-300 rounded-md flex flex-col justify-between items-center py-2 text-[9px] font-mono text-neutral-600 font-bold">
                  <span>A</span><span>C</span><span>I</span><span>E</span><span>R</span>
                </div>

                {/* VACUUM ZONE with glowing particles */}
                <div className="w-16 h-56 bg-gradient-to-r from-neutral-200 via-white to-neutral-200 border-l border-r border-neutral-300 relative overflow-hidden flex items-center justify-center">
                  <span className="absolute text-[9px] font-mono font-bold tracking-widest text-[#0066FF] rotate-90 opacity-70">
                    VIDE ABSOLU
                  </span>
                  {/* Floating particle bubbles reflecting blocked heat */}
                  {[...Array(6)].map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={`absolute w-1.5 h-1.5 rounded-full ${
                        thermalMode === 'cold' ? 'bg-orange-300/60' : 'bg-cyan-300/60'
                      }`}
                      animate={{
                        y: [-20, 20, -20],
                        opacity: [0.1, 0.7, 0.1],
                      }}
                      transition={{
                        duration: 3 + idx,
                        repeat: Infinity,
                        delay: idx * 0.5,
                      }}
                      style={{
                        left: `${15 + idx * 12}%`,
                        top: `${20 + idx * 10}%`,
                      }}
                    />
                  ))}
                  {/* Bounced Arrow representing reflection */}
                  <motion.div
                    className="absolute z-10"
                    animate={{
                      x: [-40, -10, -40],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <span className="font-mono text-[10px] font-bold text-red-500">◀ BLOC</span>
                  </motion.div>
                </div>

                {/* Wall 2 (Inner Steel) */}
                <div className="w-4 h-56 bg-neutral-400 rounded-md flex flex-col justify-between items-center py-2 text-[9px] font-mono text-white font-bold">
                  <span>I</span><span>N</span><span>O</span><span>X</span>
                </div>
              </div>

              {/* Inside Liquid Temperature Indicator (Right Side) */}
              <div className="flex flex-col space-y-2 items-start w-28">
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-neutral-400 mb-2">Contenu Interne</span>
                <AnimatePresence mode="wait">
                  {thermalMode === 'cold' ? (
                    <motion.div
                      key="cold"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-[#0066FF]/10 border border-[#0066FF]/30 p-4 rounded-xl text-left w-full"
                    >
                      <span className="block text-xs font-mono text-[#0066FF] uppercase tracking-wide">État Liquide</span>
                      <span className="block text-xl font-bold text-[#0066FF]">4°C Constant</span>
                      <span className="block text-[10px] text-neutral-500 pt-1">Aucune condensation</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hot"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl text-left w-full"
                    >
                      <span className="block text-xs font-mono text-orange-500 uppercase tracking-wide">État Liquide</span>
                      <span className="block text-xl font-bold text-orange-500">85°C Constant</span>
                      <span className="block text-[10px] text-neutral-500 pt-1">Paroi extérieure froide</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>

        {/* 2. Technical Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technicalGrid.map((feat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-2xl border border-neutral-200/60 shadow-sm flex flex-col items-start space-y-4 hover:shadow-md transition-all duration-300"
            >
              <div className="p-3 bg-[#faf8fe] rounded-xl text-black border border-neutral-100 group-hover:bg-[#0066FF] transition-all">
                <feat.icon className="w-5.5 h-5.5 text-black" />
              </div>
              <h4 className="text-lg font-bold text-black tracking-tight">{feat.title}</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
