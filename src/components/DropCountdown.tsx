import React, { useState, useEffect } from 'react';
import { Flame, Award } from 'lucide-react';

export const DropCountdown: React.FC = () => {
  // Drop Date: 30 November 2026 at 18:00 MYT (UTC+8)
  const targetDate = new Date('2026-11-30T18:00:00+08:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2c0812] via-[#1b050b] to-[#2c0812] border border-[#D4AF37]/35 p-6 sm:p-8 shadow-2xl">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Left Info */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
              <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
              <span>Limited Founders Batch</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              Drop 01 Official Release
            </h3>
            <p className="text-xs sm:text-sm text-[#D8C7B8] max-w-md mt-1">
              Strictly capped at 70 numbered bottles (<span className="text-[#F6E3B4] font-semibold">#01/70 to #70/70</span>). 
              Each bottle includes physical compounding certificate & serial stamp.
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center bg-[#130306]/90 border border-[#D4AF37]/25 rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[62px] sm:min-w-[72px]">
              <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#F6E3B4]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#A59283] font-medium">Days</span>
            </div>
            <span className="text-[#D4AF37] font-bold text-xl">:</span>
            <div className="flex flex-col items-center bg-[#130306]/90 border border-[#D4AF37]/25 rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[62px] sm:min-w-[72px]">
              <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#F6E3B4]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#A59283] font-medium">Hours</span>
            </div>
            <span className="text-[#D4AF37] font-bold text-xl">:</span>
            <div className="flex flex-col items-center bg-[#130306]/90 border border-[#D4AF37]/25 rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[62px] sm:min-w-[72px]">
              <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#F6E3B4]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#A59283] font-medium">Mins</span>
            </div>
            <span className="text-[#D4AF37] font-bold text-xl">:</span>
            <div className="flex flex-col items-center bg-[#130306]/90 border border-[#D4AF37]/25 rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[62px] sm:min-w-[72px]">
              <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#F6E3B4]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#A59283] font-medium">Secs</span>
            </div>
          </div>

          {/* Allocation badge */}
          <div className="flex items-center gap-3 bg-[#3d0d19]/60 border border-[#D4AF37]/30 rounded-xl px-4 py-3">
            <Award className="w-5 h-5 text-[#F6E3B4]" />
            <div className="text-left">
              <div className="text-xs font-bold text-white">Founder Allocation</div>
              <div className="text-[11px] text-[#E0D0C2]">Pre-Orders Open Online</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
