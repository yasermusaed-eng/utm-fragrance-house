import React from 'react';
import { Sparkles, ShieldCheck, MapPin, ArrowDown, Droplets } from 'lucide-react';

interface HeroProps {
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background radial gradients for luxury ambiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#6e1224]/30 via-[#2f0710]/20 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#D4AF37]/8 blur-[100px] pointer-events-none rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Founders Drop Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#20060c] border border-[#D4AF37]/40 shadow-inner mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#F6E3B4] uppercase">
            Drop 01 · Founders Edition · Limited 70 Bottles
          </span>
        </div>

        {/* Brand Main Title */}
        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] mb-6">
          Fine European Perfumes.{' '}
          <span className="gold-gradient-text block mt-2">
            Compounded For UTM.
          </span>
        </h1>

        {/* Value Proposition Description */}
        <p className="text-sm sm:text-base md:text-lg text-[#E0D0C2] max-w-2xl mx-auto font-light leading-relaxed mb-10">
          We imported pure grade-A European fragrance oils and compound every single bottle at{' '}
          <strong className="text-[#F6E3B4] font-semibold">20% Eau de Parfum (EDP) concentration</strong>. 
          No water-down shortcuts. Uncompromising 6–8+ hours sillage designed for Malaysia's tropical climate.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenOrder}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase text-[#140306] bg-gradient-to-r from-[#F6E3B4] via-[#D4AF37] to-[#A4771F] hover:brightness-110 shadow-xl shadow-[#D4AF37]/20 active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create WhatsApp Order</span>
          </button>

          <a
            href="#scents"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm tracking-wider text-[#F6E3B4] bg-[#22070e]/80 border border-[#D4AF37]/35 hover:bg-[#340b15] hover:border-[#F6E3B4]/60 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore 6 Debut Scents</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        {/* Trust Badges & Engineered Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          
          <div className="glass-panel p-4 sm:p-5 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-3">
              <Droplets className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-cinzel">20% EDP</div>
            <div className="text-xs text-[#C5B3A3] mt-1">Authentic oil concentration with gold atomizers</div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-cinzel">6–8+ Hrs</div>
            <div className="text-xs text-[#C5B3A3] mt-1">Verified sillage through full lectures & gym</div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-3">
              <span className="text-sm font-bold">RM</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-cinzel">From RM 39</div>
            <div className="text-xs text-[#C5B3A3] mt-1">Student-conscious pricing with 3 flacon sizes</div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-3">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-cinzel">0 RM Pickup</div>
            <div className="text-xs text-[#C5B3A3] mt-1">Arked Meranti & PSZ Library physical hubs</div>
          </div>

        </div>

      </div>
    </section>
  );
};
