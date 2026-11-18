import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, ShieldCheck, AlertCircle } from 'lucide-react';

interface FounderPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const FounderPinModal: React.FC<FounderPinModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const CORRECT_PIN = '8323';

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setRendered(true);
      const timer = setTimeout(() => {
        setAnimateIn(true);
        inputRef.current?.focus();
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setRendered(false), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!rendered) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin === CORRECT_PIN) {
      setError(false);
      onClose();
      onSuccess();
    } else {
      setError(true);
      setPin('');
      inputRef.current?.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);
    setError(false);
    if (value.length === 4) {
      if (value === CORRECT_PIN) {
        onClose();
        onSuccess();
      } else {
        setError(true);
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        animateIn
          ? 'bg-black/85 backdrop-blur-md opacity-100'
          : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`relative w-full max-w-sm bg-[#140306] border border-[#D4AF37]/50 rounded-3xl shadow-2xl p-6 sm:p-7 text-center transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) transform ${
          animateIn ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-8 opacity-0'
        } ${error ? 'animate-shake' : ''}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#A59283] hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E3B4] mx-auto mb-4 shadow-lg shadow-[#D4AF37]/10">
          <Lock className="w-6 h-6 text-[#D4AF37]" />
        </div>

        <h3 className="font-cinzel text-xl font-bold text-white mb-1.5">
          Founder Access
        </h3>
        <p className="text-xs text-[#A59283] mb-6">
          Enter 4-digit security PIN to unlock operations telemetry & inventory.
        </p>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={pin}
              onChange={handleChange}
              placeholder="••••"
              className={`w-full bg-[#1e060d] border ${
                error ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'border-[#D4AF37]/40 focus:border-[#F6E3B4]'
              } rounded-2xl py-3 px-4 text-center font-mono text-2xl tracking-[0.5em] text-white focus:outline-none transition-all placeholder-[#574447]`}
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-semibold animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Incorrect PIN. Access Denied.</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-[#140306] bg-gradient-to-r from-[#F6E3B4] via-[#D4AF37] to-[#A4771F] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Dashboard</span>
            </button>
          </div>
        </form>

        <div className="mt-4 text-[10px] text-[#635356]">
          Confidential UTM Fragrance House Operations
        </div>
      </div>
    </div>
  );
};
