import React, { useState } from 'react';
import { Beaker, CheckCircle2, Award, Sliders } from 'lucide-react';

export const CompoundingCraft: React.FC = () => {
  const [selectedPercent, setSelectedPercent] = useState<number>(20);

  const concentrations = [
    { percent: 5, label: '5% EDC', name: 'Eau de Cologne', longevity: '2–3 Hours', radius: '0.8 Meters', note: 'Light intimate splash' },
    { percent: 10, label: '10% EDT', name: 'Eau de Toilette', longevity: '4–5 Hours', radius: '1.2 Meters', note: 'Fresh lecture wear' },
    { percent: 15, label: '15% EDP', name: 'Eau de Parfum', longevity: '6–7 Hours', radius: '1.6 Meters', note: 'Day-long study aroma' },
    { percent: 20, label: '20% Master EDP', name: 'Signature EDP', longevity: '7–9 Hours', radius: '2.0 Meters', note: 'House standard benchmark' },
    { percent: 25, label: '25% Extrait', name: 'Extrait de Parfum', longevity: '9–11 Hours', radius: '2.6 Meters', note: 'High intensity sillage' },
    { percent: 30, label: '30% Elixir', name: 'Pure Parfum Elixir', longevity: '12+ Hours', radius: '3.5+ Meters', note: 'Maximum room-filler' },
  ];

  const currentTier = concentrations.find(c => c.percent === selectedPercent) || concentrations[3];
  const oilMl = ((50 * selectedPercent) / 100).toFixed(1);
  const alcoholMl = ((50 * (100 - selectedPercent)) / 100).toFixed(1);

  return (
    <section id="craft" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Editorial Narrative */}
        <div className="text-left">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-3">
            Bespoke Laboratory Compounding
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Tailor-Made Oil Concentrations (5% to 30%)
          </h2>
          
          <p className="text-sm sm:text-base text-[#D8C7B8] leading-relaxed mb-6">
            Commercial clone perfumes dilute scents down to 5%–10% to cut costs, vanishing within 90 minutes in Johor’s tropical humidity.
          </p>

          <p className="text-sm sm:text-base text-[#D8C7B8] leading-relaxed mb-8">
            At UTM Fragrance House, we let you customize your exact compounding ratio—from a light <strong className="text-white">5% Eau de Cologne</strong> splash up to an intoxicating <strong className="text-[#F6E3B4]">30% Pure Parfum Elixir</strong>. Every single bottle is compounded volumetric-pipette fresh with pure European fine fragrance oils and cosmetic-grade perfumer's alcohol.
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
                <span className="text-xs text-[#A59283]">Laboratory-grade pipettes and graduated beakers for exact batch measurements.</span>
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

        {/* Code-Crafted Laboratory Specification Card with Live 5%-30% Switcher */}
        <div className="relative">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#22070e] to-[#120306]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Formulation Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#F6E3B4]">
                  <Beaker className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-white">50ml Compounding Simulator</h3>
                  <span className="text-[10px] text-[#A59283] uppercase tracking-wider">Formula Spec: {currentTier.name}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                Laboratory Grade
              </span>
            </div>

            {/* Interactive Percentage Switcher Pills */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#F6E3B4] font-semibold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Interactive Concentration Switcher</span>
                </span>
                <span className="text-[11px] text-[#D4AF37] font-mono">{selectedPercent}% Fine Oil</span>
              </div>

              <div className="grid grid-cols-6 gap-1.5">
                {concentrations.map(c => {
                  const isSelected = c.percent === selectedPercent;
                  return (
                    <button
                      key={c.percent}
                      type="button"
                      onClick={() => setSelectedPercent(c.percent)}
                      className={`py-2 px-1 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#F6E3B4] to-[#D4AF37] text-[#140306] border-[#F6E3B4] shadow-md shadow-[#D4AF37]/30 scale-102'
                          : 'bg-[#150408] text-[#C9B7A7] border-white/10 hover:border-[#D4AF37]/40'
                      }`}
                    >
                      <div>{c.percent}%</div>
                      <div className="text-[8px] font-normal opacity-80 leading-none mt-0.5">
                        {c.percent === 20 ? 'Standard' : c.percent <= 10 ? 'Light' : 'Intense'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual Ratio Bar */}
            <div className="mb-6 bg-[#16040a] p-3.5 rounded-2xl border border-white/5">
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#F6E3B4]">{selectedPercent}% Fine Fragrance Oil ({oilMl} ml)</span>
                <span className="text-[#A59283]">{100 - selectedPercent}% Perfumer's Alcohol ({alcoholMl} ml)</span>
              </div>
              <div className="w-full h-4 rounded-full bg-[#100205] p-0.5 border border-[#D4AF37]/30 flex overflow-hidden">
                <div
                  className="h-full rounded-l-full bg-gradient-to-r from-[#F6E3B4] to-[#D4AF37] shadow-[0_0_10px_#D4AF37] transition-all duration-500"
                  style={{ width: `${selectedPercent}%` }}
                />
                <div
                  className="h-full rounded-r-full bg-[#340b15] transition-all duration-500"
                  style={{ width: `${100 - selectedPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#8f7e71] mt-1.5">
                <span>Concentrated Projection Core</span>
                <span>Odorless Cosmetic Evaporative Carrier</span>
              </div>
            </div>

            {/* Technical Metric Cards - Dynamically updated */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 bg-[#140306] rounded-xl border border-white/5 transition-all">
                <span className="text-[10px] text-[#A59283] uppercase block font-semibold">Longevity Test</span>
                <span className="font-cinzel text-xl font-bold text-white transition-all">{currentTier.longevity}</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">{currentTier.note}</span>
              </div>

              <div className="p-3.5 bg-[#140306] rounded-xl border border-white/5">
                <span className="text-[10px] text-[#A59283] uppercase block font-semibold">Maceration Window</span>
                <span className="font-cinzel text-xl font-bold text-white">21 Days</span>
                <span className="text-[10px] text-[#D4AF37] block mt-0.5">Cold-temperature matured</span>
              </div>

              <div className="p-3.5 bg-[#140306] rounded-xl border border-white/5 transition-all">
                <span className="text-[10px] text-[#A59283] uppercase block font-semibold">Projection Radius</span>
                <span className="font-cinzel text-xl font-bold text-white transition-all">{currentTier.radius}</span>
                <span className="text-[10px] text-[#C5B3A3] block mt-0.5">Noticeable sillage trail</span>
              </div>

              <div className="p-3.5 bg-[#140306] rounded-xl border border-white/5">
                <span className="text-[10px] text-[#A59283] uppercase block font-semibold">Atomizer Crimp</span>
                <span className="font-cinzel text-xl font-bold text-white">Metallic Gold</span>
                <span className="text-[10px] text-[#D4AF37] block mt-0.5">Airtight pressure-sealed</span>
              </div>
            </div>

            {/* Footer Certification */}
            <div className="flex items-center justify-between text-xs text-[#E0D0C2] pt-4 border-t border-white/10">
              <span className="flex items-center gap-1.5 font-semibold text-[#F6E3B4]">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                Universiti Teknologi Malaysia
              </span>
              <span className="text-[11px] text-[#A59283] font-mono">LAB SPEC · 2026</span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
