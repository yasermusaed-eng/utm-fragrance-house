import React, { useState } from 'react';
import { FRAGRANCES, type Fragrance } from '../data/fragrances';
import { FragranceCard } from './FragranceCard';
import { Search } from 'lucide-react';

interface FragranceListProps {
  onSelectForOrder: (fragranceId: string) => void;
}

export const FragranceList: React.FC<FragranceListProps> = ({ onSelectForOrder }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedNotesId, setExpandedNotesId] = useState<string | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Debut Scents' },
    { id: 'aquatic', label: 'Fresh & Aquatic' },
    { id: 'sweet', label: 'Warm & Sweet' },
    { id: 'spicy', label: 'Spicy & Amber' },
    { id: 'woody', label: 'Woody & Floral' },
  ];

  const handleToggleNotes = (id: string) => {
    setExpandedNotesId(prev => (prev === id ? null : id));
  };

  const filteredFragrances = FRAGRANCES.filter((item: Fragrance) => {
    const matchesFilter = activeFilter === 'all' || item.family === activeFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.top.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.notes.heart.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.notes.base.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="scents" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-3">
          The Curated Lineup
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          6 Confirmed Debut Scents
        </h2>
        <p className="text-sm sm:text-base text-[#D4C4B4] leading-relaxed">
          Formulated directly from pure European fine fragrance oils. Every formulation has been tested in Johor Bahru’s tropical climate for projection, longevity, and all-day stability.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#D4AF37] text-[#140306] shadow-md shadow-[#D4AF37]/30'
                  : 'bg-[#1b050b] text-[#D8C7B8] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Note / Scent Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search scent, note, or brand..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#1b050b] border border-[#D4AF37]/25 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-[#8f7e71] focus:outline-none focus:border-[#F6E3B4] transition-colors"
          />
        </div>

      </div>

      {/* Fragrances Grid */}
      {filteredFragrances.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredFragrances.map(fragrance => (
            <FragranceCard
              key={fragrance.id}
              fragrance={fragrance}
              isNotesOpen={expandedNotesId === fragrance.id}
              onToggleNotes={() => handleToggleNotes(fragrance.id)}
              onSelectForOrder={onSelectForOrder}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel text-center py-12 rounded-2xl">
          <p className="text-sm text-[#D8C7B8]">No fragrances found matching "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="mt-3 text-xs text-[#D4AF37] underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}

    </section>
  );
};
