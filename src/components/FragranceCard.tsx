import React from 'react';
import type { Fragrance } from '../data/fragrances';
import { Clock, Wind, Sparkles, ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface FragranceCardProps {
  fragrance: Fragrance;
  isNotesOpen: boolean;
  onToggleNotes: () => void;
  onSelectForOrder: (fragranceId: string) => void;
}

export const FragranceCard: React.FC<FragranceCardProps> = ({
  fragrance,
  isNotesOpen,
  onToggleNotes,
  onSelectForOrder,
}) => {
  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between relative group transition-all duration-300">
      
      {/* Top Banner Gradient & Accent */}
      <div className={`h-2 w-full bg-gradient-to-r ${fragrance.colorGradient}`} />

      {/* Perfume Bottle Product Visual */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#1c050b]/90 to-[#100205] p-5 flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/15">
        {/* Ambient radial glow */}
        <div className="absolute inset-0 bg-radial from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />
        
        <img
          src={fragrance.image}
          alt={`${fragrance.fullName} bottle`}
          className="h-full w-auto max-h-[170px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] group-hover:scale-108 transition-transform duration-500 z-10"
          onError={(e) => {
            // Graceful fallback if image is loading
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Top-Right Badge */}
        <div className="absolute top-3.5 right-3.5 z-20">
          <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#120306]/90 border border-[#D4AF37]/40 text-[#F6E3B4] font-semibold backdrop-blur-md shadow-lg">
            {fragrance.badge || 'Batch 01'}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        
        {/* Scent Family & Brand */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37]">
            {fragrance.brand}
          </span>
          <span className="text-[11px] font-medium text-[#C5B3A3]">
            {fragrance.familyLabel}
          </span>
        </div>

        {/* Perfume Identity */}
        <div className="mb-3">
          <h3 className="font-cinzel text-2xl font-bold text-white group-hover:text-[#F6E3B4] transition-colors">
            {fragrance.fullName}
          </h3>
          <div className="text-xs text-[#E0D0C2] font-medium mt-1">
            {fragrance.subtitle}
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-[#C9B7A7] leading-relaxed mb-5">
          {fragrance.description}
        </p>

        {/* Performance Badges: Longevity & Projection */}
        <div className="grid grid-cols-2 gap-2 bg-[#120306]/80 p-3 rounded-xl border border-white/5 mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            <div>
              <div className="text-[10px] text-[#A59283] uppercase">Longevity</div>
              <div className="text-xs font-semibold text-white">{fragrance.longevity}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            <div>
              <div className="text-[10px] text-[#A59283] uppercase">Projection</div>
              <div className="text-xs font-semibold text-white">{fragrance.projection.split(' ')[0]}</div>
            </div>
          </div>
        </div>

        {/* Scent Notes Pyramid Accordion Toggle */}
        <div className="mb-5">
          <button
            type="button"
            onClick={onToggleNotes}
            className="w-full flex items-center justify-between text-xs font-semibold text-[#D4AF37] hover:text-[#F6E3B4] py-2 px-3 rounded-lg bg-[#250810]/70 border border-[#D4AF37]/20 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>{isNotesOpen ? `Hide Scent Notes` : `Explore Scent Notes (Top · Heart · Base)`}</span>
            </span>
            {isNotesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Animated Accordion Container */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isNotesOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-3.5 bg-[#140306]/95 border border-[#D4AF37]/25 rounded-xl space-y-2.5 text-xs shadow-inner">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6E3B4] block mb-0.5">
                  Top Notes (First 15–30 Mins)
                </span>
                <span className="text-[#C9B7A7]">{fragrance.notes.top.join(' • ')}</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6E3B4] block mb-0.5">
                  Heart / Middle (Hours 1–4)
                </span>
                <span className="text-[#C9B7A7]">{fragrance.notes.heart.join(' • ')}</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6E3B4] block mb-0.5">
                  Base Notes (Dry Down 6–10 Hours)
                </span>
                <span className="text-[#C9B7A7]">{fragrance.notes.base.join(' • ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Occasion / Recommended For */}
        <div className="text-[11px] text-[#A59283] italic mb-6">
          <strong className="text-[#E0D0C2] not-italic font-medium">Best for: </strong>
          {fragrance.recommendedFor}
        </div>

      </div>

      {/* Action Button pinned at bottom */}
      <div className="p-6 pt-0 sm:p-7 sm:pt-0">
        <button
          type="button"
          onClick={() => onSelectForOrder(fragrance.id)}
          className="w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-[#140306] bg-gradient-to-r from-[#F6E3B4] via-[#D4AF37] to-[#A4771F] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/15 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pre-Order {fragrance.fullName}</span>
        </button>
      </div>

    </div>
  );
};
