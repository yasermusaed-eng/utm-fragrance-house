import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, Menu, X, BarChart3 } from 'lucide-react';

interface NavbarProps {
  onOpenOrder: () => void;
  onOpenDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrder, onOpenDashboard }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#120306]/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Crest & Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#D4AF37] via-[#F6E3B4] to-[#A4771F] shadow-lg shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform">
            <img
              src="/logo.jpg"
              alt="UTM Fragrance House Crest"
              className="w-full h-full object-cover rounded-full bg-[#120306]"
            />
          </div>
          <div>
            <span className="font-cinzel tracking-[0.2em] text-sm sm:text-base font-bold text-[#F6E3B4] block leading-none">
              UTM FRAGRANCE
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] font-semibold uppercase block mt-1">
              HOUSE • JOHOR BAHRU
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <a
            href="#scents"
            className="text-[#E5D7CA] hover:text-[#F6E3B4] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            The Collection
          </a>
          <a
            href="#pricing"
            className="text-[#E5D7CA] hover:text-[#F6E3B4] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Sizes & Pricing
          </a>
          <a
            href="#craft"
            className="text-[#E5D7CA] hover:text-[#F6E3B4] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            20% EDP Craft
          </a>
          <a
            href="#pickup"
            className="text-[#E5D7CA] hover:text-[#F6E3B4] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Campus Hubs
          </a>
          <a
            href="#faq"
            className="text-[#E5D7CA] hover:text-[#F6E3B4] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            FAQ
          </a>
        </nav>

        {/* CTA Button Group */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              title="Founder Operations & Inventory Tracker"
              className="p-2.5 rounded-full text-[#D4AF37] hover:text-[#F6E3B4] bg-[#22070e] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onOpenOrder}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#140306] bg-gradient-to-r from-[#F6E3B4] via-[#D4AF37] to-[#A4771F] hover:brightness-110 shadow-lg shadow-[#D4AF37]/25 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-Order Drop 01</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F6E3B4] hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#160408]/98 border-b border-[#D4AF37]/30 px-6 py-6 space-y-4 backdrop-blur-xl">
          <a
            href="#scents"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#E5D7CA] hover:text-[#F6E3B4] text-base py-1 font-medium"
          >
            The Collection (6 Scents)
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#E5D7CA] hover:text-[#F6E3B4] text-base py-1 font-medium"
          >
            Sizes & Pricing (from RM 39)
          </a>
          <a
            href="#craft"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#E5D7CA] hover:text-[#F6E3B4] text-base py-1 font-medium"
          >
            20% EDP Formulation
          </a>
          <a
            href="#pickup"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#E5D7CA] hover:text-[#F6E3B4] text-base py-1 font-medium"
          >
            Campus Pickup Stations
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#E5D7CA] hover:text-[#F6E3B4] text-base py-1 font-medium"
          >
            Frequently Asked Questions
          </a>

          {onOpenDashboard && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Founder Operations & Resource Tracker</span>
            </button>
          )}

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider text-[#140306] bg-gradient-to-r from-[#F6E3B4] via-[#D4AF37] to-[#A4771F] flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pre-Order on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
