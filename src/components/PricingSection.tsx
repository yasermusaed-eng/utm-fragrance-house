import React from 'react';
import { SIZE_OPTIONS } from '../data/fragrances';
import { Check, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onOpenOrder: (preselectedSize?: '30ml' | '50ml' | '100ml') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenOrder }) => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-transparent via-[#140307] to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-3">
            Transparent Campus Pricing
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Engineered Bottle Sizes
          </h2>
          <p className="text-sm sm:text-base text-[#D4C4B4] leading-relaxed">
            Formulated based on our 132-student campus survey. Every bottle is hand-crimped with an airtight gold atomizer to prevent evaporation and preserve pure European fragrance notes.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {SIZE_OPTIONS.map(tier => {
            const isHero = tier.size === '50ml';

            return (
              <div
                key={tier.size}
                className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  isHero
                    ? 'bg-gradient-to-b from-[#2e0914] via-[#1a040b] to-[#120306] border-2 border-[#D4AF37] shadow-2xl shadow-[#D4AF37]/20 scale-100 md:-translate-y-2'
                    : 'glass-panel border border-[#D4AF37]/25'
                }`}
              >
                {/* Popular Pill */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#F6E3B4] to-[#D4AF37] text-[#140306] text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-cinzel text-2xl font-bold text-white">{tier.size}</span>
                    <span className="text-xs text-[#C5B3A3] font-semibold">{tier.label}</span>
                  </div>

                  <div className="flex items-baseline gap-1 my-5">
                    <span className="text-sm font-semibold text-[#D4AF37]">RM</span>
                    <span className="font-cinzel text-4xl sm:text-5xl font-extrabold text-white">
                      {tier.price}
                    </span>
                    <span className="text-xs text-[#A59283] ml-1">/ bottle</span>
                  </div>

                  <p className="text-xs text-[#C9B7A7] leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Feature Breakdown */}
                  <div className="space-y-3 pt-4 border-t border-white/10 mb-8 text-xs text-[#E0D0C2]">
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>
                        {tier.size === '30ml' && '~360 ultra-fine sprays (2 months daily)'}
                        {tier.size === '50ml' && '~600 ultra-fine sprays (4 months daily)'}
                        {tier.size === '100ml' && '~1,200 ultra-fine sprays (8+ months daily)'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>20% pure EDP concentration</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>Crimped metallic gold atomizer</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>Free pickup at Arked Meranti & PSZ</span>
                    </div>
                  </div>
                </div>

                {/* Select button */}
                <button
                  onClick={() => onOpenOrder(tier.size)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isHero
                      ? 'bg-gradient-to-r from-[#F6E3B4] via-[#D4AF37] to-[#A4771F] text-[#140306] hover:brightness-110 shadow-lg shadow-[#D4AF37]/25'
                      : 'bg-[#22070e] text-[#F6E3B4] border border-[#D4AF37]/40 hover:bg-[#340b15]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Choose {tier.size}</span>
                </button>

              </div>
            );
          })}

        </div>

        {/* Reassurance note */}
        <div className="text-center text-xs text-[#A59283] mt-8">
          * Cash on delivery / DuitNow QR instant transfer accepted at physical campus collection stations.
        </div>

      </div>
    </section>
  );
};
