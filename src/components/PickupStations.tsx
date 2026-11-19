import React from 'react';
import { PICKUP_STATIONS } from '../data/fragrances';
import { Clock, ShieldCheck, Check } from 'lucide-react';

export const PickupStations: React.FC = () => {
  return (
    <section id="pickup" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-3">
          Zero-Fee Campus Logistics
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Fulfillment Stations at UTM
        </h2>
        <p className="text-sm sm:text-base text-[#D4C4B4] leading-relaxed">
          Skip expensive courier shipping fees and damaged packages. Collect your hand-compounded bottle directly at prime campus meeting points, inspect your bottle on the spot, and test smell before confirming.
        </p>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {PICKUP_STATIONS.map((station, idx) => (
          <div
            key={station.id}
            className="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center font-cinzel font-bold text-sm text-[#F6E3B4]">
                  0{idx + 1}
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Active Station
                </span>
              </div>

              <h3 className="font-cinzel text-xl font-bold text-white mb-2 group-hover:text-[#F6E3B4] transition-colors">
                {station.name}
              </h3>

              <div className="flex items-start gap-2 text-xs text-[#D8C7B8] font-medium mb-3">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>{station.detail}</span>
              </div>

              <p className="text-xs text-[#A59283] leading-relaxed">
                {station.desc}
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-2 text-[11px] text-[#C5B3A3]">
              <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Smell-test & Cash / QR on pickup</span>
            </div>
          </div>
        ))}
      </div>

      {/* Assurance banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#D4AF37]/30">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-cinzel text-base sm:text-lg font-bold text-white">
              Campus Scent Guarantee
            </h4>
            <p className="text-xs sm:text-sm text-[#C9B7A7]">
              Not sure which scent suits your skin chemistry? Our founders carry official tester strips at every pickup station. Test in person before taking your bottle home.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};
