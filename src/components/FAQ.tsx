import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How long does the fragrance last in Malaysian humidity?',
    answer:
      'Because every bottle is compounded at a verified 20% Eau de Parfum (EDP) concentration with pure European oils, it delivers 6 to 8+ hours on skin and up to 12+ hours on clothing. Lighter scents (like Imagination & Acqua Di Gio) project for 6-8 hours, while deeper formulations (like Sauvage & Le Male) easily push 9-10+ hours.'
  },
  {
    question: 'Can I test and smell the perfumes before purchasing?',
    answer:
      'Absolutely! We believe in 100% sensory confidence. Our founders carry official tester strips and sample vials at all physical pickup stations (Arked Meranti and PSZ Library). You can spray, evaluate on your own skin chemistry, and confirm your purchase on the spot.'
  },
  {
    question: 'How does physical campus fulfillment work?',
    answer:
      'Zero shipping fees! Simply select your preferred campus hub when placing your order (Arked Meranti or PSZ Library Foyer). When your batch serial is compounded, we coordinate with you via WhatsApp to hand your bottle over during designated station hours.'
  },
  {
    question: 'What payment methods do you accept at collection?',
    answer:
      'We accept DuitNow QR (instant bank transfer from any Malaysian bank / Touch n Go eWallet) as well as exact cash upon collection at our campus stations.'
  },
  {
    question: 'What is the "Drop 01 · Founders Edition"?',
    answer:
      'Drop 01 is our official campus debut, capped at exactly 70 numbered bottles (#01/70 to #70/70). Every bottle in this drop includes physical compounding certification and access to exclusive future community refills and custom scent votings.'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-3">
          Got Questions?
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-[#D4C4B4]">
          Everything you need to know about our formulations, campus pickups, and orders.
        </p>
      </div>

      {/* Accordion list */}
      <div className="space-y-3.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="glass-panel rounded-2xl overflow-hidden border border-[#D4AF37]/20 transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
              >
                <span className="font-cinzel text-sm sm:text-base font-bold text-white">
                  {faq.question}
                </span>
                <span className="text-[#D4AF37] p-1 rounded-full bg-[#D4AF37]/10 flex-shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#C9B7A7] leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
