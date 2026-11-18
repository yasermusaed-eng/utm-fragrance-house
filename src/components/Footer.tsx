import React from 'react';
import { MessageCircle, FileText, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b0103] border-t border-[#D4AF37]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#D4AF37] to-[#A4771F]">
                <img
                  src="/logo.jpg"
                  alt="UTM Fragrance House"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-cinzel text-base font-bold text-[#F6E3B4] block tracking-wider">
                  UTM FRAGRANCE HOUSE
                </span>
                <span className="text-[10px] text-[#D4AF37] tracking-[0.25em] font-semibold uppercase block">
                  JOHOR BAHRU • MALAYSIA
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A59283] max-w-sm leading-relaxed mb-6">
              Independent fine fragrance compounders founded at Universiti Teknologi Malaysia. Dedicated to bringing high-concentration (20% EDP) European perfumes to university students at fair, honest prices.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/utm.fragrance?vrfl=M2lzYzV2MGs5dmxk&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1f050b] border border-[#D4AF37]/30 flex items-center justify-center text-[#F6E3B4] hover:bg-[#D4AF37] hover:text-[#140306] transition-all"
                title="Instagram @utm.fragrance"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://chat.whatsapp.com/LEKvUz1JPeC3hlmNBKosi3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1f050b] border border-[#D4AF37]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-[#140306] transition-all"
                title="Official WhatsApp Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeTlOXCdGi7PYOfeCWrf5Vr_u39t1Qn9TE38ulO4Z1j-JQy-A/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1f050b] border border-[#D4AF37]/30 flex items-center justify-center text-[#F6E3B4] hover:bg-[#D4AF37] hover:text-[#140306] transition-all"
                title="Campus Fragrance Survey"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A59283]">
              <li>
                <a href="#scents" className="hover:text-[#F6E3B4] transition-colors">
                  Debut Scents (6 Formulations)
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#F6E3B4] transition-colors">
                  Flacon Pricing & Spray Counts
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-[#F6E3B4] transition-colors">
                  20% EDP Compounding Standards
                </a>
              </li>
              <li>
                <a href="#pickup" className="hover:text-[#F6E3B4] transition-colors">
                  Arked Meranti & PSZ Stations
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F6E3B4] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-white mb-4">
              Direct Inquiries
            </h4>
            <div className="space-y-2 text-xs text-[#A59283]">
              <p>Founder Direct WhatsApp:</p>
              <a
                href="https://wa.me/601140097486"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F6E3B4] hover:underline font-semibold block"
              >
                +60 11-4009 7486
              </a>
              <p className="pt-2">Campus Fulfillment:</p>
              <span className="text-[#C5B3A3] block">Universiti Teknologi Malaysia (UTM), 81310 Skudai, Johor</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8f7e71]">
          <p>© 2026 UTM Fragrance House. All Rights Reserved. Not affiliated with or endorsed by referenced designer trademark holders.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#D4AF37] hover:text-[#F6E3B4] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
