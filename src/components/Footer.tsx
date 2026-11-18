import React from 'react';
import { MessageCircle, ArrowUp, BarChart3 } from 'lucide-react';

interface FooterProps {
  onOpenDashboard?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDashboard }) => {
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

            {/* Official Social Icons (High Contrast & Clear) */}
            <div className="flex items-center gap-4">
              
              {/* Instagram Official - High Contrast Gold & Gradient */}
              <a
                href="https://www.instagram.com/utm.fragrance?vrfl=M2lzYzV2MGs5dmxk&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#20060d] border border-[#D4AF37]/40 hover:border-[#F6E3B4] hover:bg-[#340b15] transition-all shadow-md"
                title="Instagram @utm.fragrance"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center p-1 text-white shadow-sm">
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-[#F6E3B4] group-hover:text-white transition-colors">
                  @utm.fragrance
                </span>
              </a>

              {/* WhatsApp Community Channel */}
              <a
                href="https://chat.whatsapp.com/LEKvUz1JPeC3hlmNBKosi3"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#20060d] border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#0c2414] transition-all shadow-md"
                title="Official WhatsApp Community Channel"
              >
                <div className="w-6 h-6 rounded-lg bg-[#25D366] flex items-center justify-center text-[#140306]">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-semibold text-[#25D366] group-hover:text-emerald-300 transition-colors">
                  WhatsApp VIP
                </span>
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

          {/* Direct Contact & Founder View */}
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
              
              {/* Founder Operations Tracker Trigger */}
              {onOpenDashboard && (
                <div className="pt-3">
                  <button
                    onClick={onOpenDashboard}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#D4AF37] hover:text-[#F6E3B4] cursor-pointer"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Founder Operations Tracker</span>
                  </button>
                </div>
              )}
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
