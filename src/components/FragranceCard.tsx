import React, { useState } from 'react';
import type { Fragrance } from '../data/fragrances';
import { Clock, Wind, Sparkles, ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface FragranceCardProps {
  fragrance: Fragrance;
  onSelectForOrder: (fragranceId: string) => void;
}

export const FragranceCard: React.FC<FragranceCardProps> = ({ fragrance, onSelectForOrder }) => {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col h-full relative group">
      
      {/* Top Banner Gradient & Accent */}
      <div className={`h-2 w-full bg-gradient-to-r ${fragrance.colorGradient}`} />

      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        
        {/* Top Meta: Badge & Scent Family */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#F6E3B4] font-semibold">
            {fragrance.badge || 'Batch 01'}
          </span>
          <span className="text-[11px] font-medium text-[#C5B3A3]">
            {fragrance.familyLabel}
          </span>
        </div>

        {/* Perfume Identity */}
        <div className="mb-3">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-1">
            {fragrance.brand}
          </div>
          <h3 className="font-cinzel text-2xl font-bold text-white group-hover:text-[#F6E3B4] transition-colors">
            {fragrance.name}
          </h3>
          <div className="text-xs text-[#E0D0C2] font-medium mt-1">
            {fragrance.subtitle}
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-[#C9B7A7] leading-relaxed mb-5 flex-grow">
          {fragrance.description}
        </p>

        {/* Performance Badges: Longevity & Sillage */}
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
              <div className="text-[10px] text-[#A59283] uppercase">Sillage</div>
              <div className="text-xs font-semibold text-white">{fragrance.sillage.split(' ')[0]}</div>
            </div>
          </div>
        </div>

        {/* Scent Notes Pyramid Accordion Toggle */}
        <div className="mb-5">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="w-full flex items-center justify-between text-xs font-semibold text-[#D4AF37] hover:text-[#F6E3B4] py-2 px-3 rounded-lg bg-[#250810]/70 border border-[#D4AF37]/20 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>{showNotes ? 'Hide Olfactory Pyramid' : 'Explore Scent Notes (Top · Heart · Base)'}</span>
            </span>
            {showNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showNotes && (
            <div className="mt-3 p-3.5 bg-[#140306]/95 border border-[#D4AF37]/20 rounded-xl space-y-2.5 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6E3B4] block">
                  Top Notes (First 15–30 Mins)
                </span>
                <span className="text-[#C9B7A7]">{fragrance.notes.top.join(' • ')}</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6E3B4] block">
                  Heart / Middle (Hours 1–4)
                </span>
                <span className="text-[#C9B7A7]">{fragrance.notes.heart.join(' • ')}</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6E3B4] block">
                  Base Notes (Dry Down 6–10 Hours)
                </span>
                <span className="text-[#C9B7A7]">{fragrance.notes.base.join(' • ')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Occasion / Recommended For */}
        <div className="text-[11px] text-[#A59283] italic mb-6">
          <strong className="text-[#E0D0C2] not-italic font-medium">Best for: </strong>
          {fragrance.recommendedFor}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelectForOrder(fragrance.id)}
          className="w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-[#140306] bg-gradient-to-r from-[#F6E3B4] via-[#D4AF37] to-[#A4771F] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/15 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pre-Order {fragrance.name}</span>
        </button>

      </div>
    </div>
  );
};
