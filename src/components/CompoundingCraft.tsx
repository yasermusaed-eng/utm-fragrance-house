import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

export const CompoundingCraft: React.FC = () => {
  return (
    <section id="craft" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Brand & Craft Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        
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
            At UTM Fragrance House, every 50ml flacon is compounded with <strong className="text-[#F6E3B4]">exactly 10ml of pure European oil concentrate</strong>, blended precisely with cosmetic-grade perfumer's alcohol. The result is verified 6–8+ hours of projection that carries through back-to-back lectures, library study sessions, and the evening breeze.
          </p>

          {/* Bullet proofs */}
          <div className="space-y-3">
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

        {/* Visual Poster / Craft Card */}
        <div className="relative">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl" />

            {/* Poster display */}
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-inner mb-6 aspect-[4/5] bg-[#120306]">
              <img
                src="/images/poster-updated.png"
                alt="UTM Fragrance House Official Poster"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Badge overlay info */}
            <div className="flex items-center justify-between text-xs text-[#E0D0C2] pt-2">
              <span className="flex items-center gap-1.5 font-semibold text-[#F6E3B4]">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                Universiti Teknologi Malaysia
              </span>
              <span className="text-[#A59283]">Batch 01 Official Certification</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
