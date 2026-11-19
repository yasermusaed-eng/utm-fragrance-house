import React from 'react';
import { Award, CheckCircle2, Beaker } from 'lucide-react';

export const CompoundingCraft: React.FC = () => {
  return (
    <section id="craft" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Brand & Craft Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div>
          <span className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-3">
            The Formulation Standard
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            No Dilution Shortcuts.{' '}
            <span className="gold-gradient-text block">True 20% EDP Ratio.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#D8C7B8] leading-relaxed mb-6">
            Most commercial body sprays and cheap clones sold online are diluted at mere 5% to 10% (Eau de Cologne / Eau de Toilette), fading within 90 minutes in Johor’s humid heat.
          </p>

          <p className="text-sm sm:text-base text-[#D8C7B8] leading-relaxed mb-8">
            At UTM Fragrance House, every 50ml bottle is compounded with <strong className="text-[#F6E3B4]">exactly 10ml of pure European oil concentrate</strong>, blended precisely with cosmetic-grade perfumer's alcohol. The result is verified 6–8+ hours of projection that carries through back-to-back lectures, library study sessions, and the evening breeze.
          </p>

          {/* Bullet proofs */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">Pure European Fragrance Extracts</strong>
                <span className="text-xs text-[#A59283]">Imported fine oil bases matching luxury niche olfactive profiles.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">Precision Volumetric Compounding</strong>
                <span className="text-xs text-[#A59283]">Laboratory-grade pipettes and graduated beakers for batch consistency.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">Hermetically Crimped Gold Atomizers</strong>
                <span className="text-xs text-[#A59283]">Zero leakage or volatile evaporation inside your backpack.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Code-Crafted Laboratory Specification Card (Replaces the old poster) */}
        <div className="relative">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#22070e] to-[#120306]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl" />

            {/* Formulation Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#F6E3B4]">
                  <Beaker className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-white">50ml Compounding Blueprint</h3>
                  <span className="text-[10px] text-[#A59283] uppercase tracking-wider">Formula Spec: EDP-20-JB</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                Laboratory Grade
              </span>
            </div>

            {/* Visual Ratio Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#F6E3B4]">20% Fine Fragrance Oil (10 ml)</span>
                <span className="text-[#A59283]">80% Perfumer's Alcohol (40 ml)</span>
              </div>
              <div className="w-full h-4 rounded-full bg-[#1b050b] p-0.5 border border-[#D4AF37]/30 flex overflow-hidden">
                <div className="h-full w-[20%] rounded-l-full bg-gradient-to-r from-[#F6E3B4] to-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
                <div className="h-full w-[80%] rounded-r-full bg-[#340b15]" />
              </div>
              <div className="flex justify-between text-[10px] text-[#8f7e71] mt-1.5">
                <span>Concentrated Projection Core</span>
                <span>Odorless Cosmetic Evaporative Carrier</span>
              </div>
            </div>

            {/* Technical Metric Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 bg-[#140306] rounded-xl border border-white/5">
                <span className="text-[10px] text-[#A59283] uppercase block font-semibold">Longevity Test</span>
                <span className="font-cinzel text-lg font-bold text-white">6–8+ Hours</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">Tropical humidity verified</span>
              </div>

              <div className="p-3.5 bg-[#140306] rounded-xl border border-white/5">
                <span className="text-[10px] text-[#A59283] uppercase block font-semibold">Maceration Window</span>
                <span className="font-cinzel text-lg font-bold text-white">21 Days</span>
                <span className="text-[10px] text-[#D4AF37] block mt-0.5">Cold-temperature matured</span>
              </div>

              <div className="p-3.5 bg-[#140306] rounded-xl border border-white/5">
                <span className="text-[10px] text-[#A59283] uppercase block font-semibold">Projection Radius</span>
                <span className="font-cinzel text-lg font-bold text-white">2.0 Meters</span>
                <span className="text-[10px] text-[#C5B3A3] block mt-0.5">Noticeable personal aura</span>
              </div>

              <div className="p-3.5 bg-[#140306] rounded-xl border border-white/5">
                <span className="text-[10px] text-[#A59283] uppercase block font-semibold">Atomizer Crimp</span>
                <span className="font-cinzel text-lg font-bold text-white">Metallic Gold</span>
                <span className="text-[10px] text-[#D4AF37] block mt-0.5">Airtight pressure-sealed</span>
              </div>
            </div>

            {/* Footer Certification */}
            <div className="flex items-center justify-between text-xs text-[#E0D0C2] pt-4 border-t border-white/10">
              <span className="flex items-center gap-1.5 font-semibold text-[#F6E3B4]">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                Universiti Teknologi Malaysia
              </span>
              <span className="text-[11px] text-[#A59283] font-mono">BATCH B01 · 2026</span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
