import React, { useState, useEffect } from 'react';
import { X, Sparkles, MessageCircle, MapPin, CheckCircle, Package } from 'lucide-react';
import { FRAGRANCES, SIZE_OPTIONS, PICKUP_STATIONS } from '../data/fragrances';
import confetti from 'canvas-confetti';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedFragranceId?: string;
  preselectedSize?: '30ml' | '50ml' | '100ml';
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  isOpen,
  onClose,
  preselectedFragranceId,
  preselectedSize,
}) => {
  const [selectedFragranceId, setSelectedFragranceId] = useState<string>(
    preselectedFragranceId || FRAGRANCES[0].id
  );
  const [selectedSize, setSelectedSize] = useState<'30ml' | '50ml' | '100ml'>(
    preselectedSize || '50ml'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [pickupStationId, setPickupStationId] = useState<string>(PICKUP_STATIONS[0].id);
  const [studentName, setStudentName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (preselectedFragranceId) setSelectedFragranceId(preselectedFragranceId);
  }, [preselectedFragranceId]);

  useEffect(() => {
    if (preselectedSize) setSelectedSize(preselectedSize);
  }, [preselectedSize]);

  if (!isOpen) return null;

  const currentFragrance = FRAGRANCES.find(f => f.id === selectedFragranceId) || FRAGRANCES[0];
  const currentSizeOption = SIZE_OPTIONS.find(s => s.size === selectedSize) || SIZE_OPTIONS[1];
  const currentStation = PICKUP_STATIONS.find(p => p.id === pickupStationId) || PICKUP_STATIONS[0];

  const unitPrice = currentSizeOption.price;
  const totalPrice = unitPrice * quantity;

  // Founder WhatsApp number (+60 11-4009 7486)
  const FOUNDER_WHATSAPP = '601140097486';

  const generateWhatsAppMessage = () => {
    const greeting = studentName.trim()
      ? `Hi UTM Fragrance House! My name is ${studentName.trim()}.`
      : `Hi UTM Fragrance House!`;

    const message = `${greeting}
I would like to place an order for Drop 01:

✨ Fragrance: ${currentFragrance.name} (${currentFragrance.brand})
📦 Flacon Size: ${currentSizeOption.size} (${currentSizeOption.label})
🔢 Quantity: ${quantity} bottle(s)
💰 Total: RM ${totalPrice} (Cash on Delivery / DuitNow QR)
📍 Preferred Campus Pickup: ${currentStation.name} (${currentStation.detail})
${notes.trim() ? `📝 Special Note: ${notes.trim()}` : ''}

Please confirm my reservation and batch serial number. Thank you!`;

    return message;
  };

  const handleSendOrder = () => {
    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F6E3B4', '#851628'],
    });

    const encodedText = encodeURIComponent(generateWhatsAppMessage());
    const whatsappUrl = `https://wa.me/${FOUNDER_WHATSAPP}?text=${encodedText}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#140306] border border-[#D4AF37]/40 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#2a070f] via-[#1a040a] to-[#2a070f] border-b border-[#D4AF37]/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E3B4]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white leading-none">
                WhatsApp Order Creator
              </h3>
              <p className="text-xs text-[#D8C7B8] mt-1">
                Drop 01 Reservation • Free Campus Pickup
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#A59283] hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-left">
          
          {/* Step 1: Fragrance Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#F6E3B4] mb-2.5">
              1. Choose Fragrance
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {FRAGRANCES.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFragranceId(f.id)}
                  type="button"
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedFragranceId === f.id
                      ? 'bg-[#310913] border-[#D4AF37] shadow-md shadow-[#D4AF37]/20 text-white'
                      : 'bg-[#1b050b]/80 border-white/10 text-[#C9B7A7] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="text-[10px] text-[#D4AF37] font-semibold truncate">{f.brand.replace('Inspired by ', '')}</div>
                  <div className="text-sm font-bold font-cinzel text-white truncate">{f.name}</div>
                  <div className="text-[10px] text-[#A59283] truncate">{f.familyLabel}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Flacon Size Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#F6E3B4] mb-2.5">
              2. Select Flacon Size
            </label>
            <div className="grid grid-cols-3 gap-3">
              {SIZE_OPTIONS.map(s => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  type="button"
                  className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                    selectedSize === s.size
                      ? 'bg-[#310913] border-[#D4AF37] text-white shadow-md'
                      : 'bg-[#1b050b]/80 border-white/10 text-[#C9B7A7] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="font-cinzel text-lg font-bold text-white">{s.size}</div>
                  <div className="text-xs font-semibold text-[#D4AF37]">RM {s.price}</div>
                  <div className="text-[10px] text-[#A59283] mt-0.5">{s.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Quantity */}
          <div className="flex items-center justify-between bg-[#1a040b] p-3.5 rounded-xl border border-white/5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F6E3B4] block">
                3. Quantity
              </span>
              <span className="text-[11px] text-[#A59283]">Bottles to compound</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-[#27060f] border border-[#D4AF37]/30 text-white font-bold flex items-center justify-center hover:bg-[#3d0b17]"
              >
                -
              </button>
              <span className="font-cinzel text-lg font-bold text-white w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-[#27060f] border border-[#D4AF37]/30 text-white font-bold flex items-center justify-center hover:bg-[#3d0b17]"
              >
                +
              </button>
            </div>
          </div>

          {/* Step 4: Pickup Station */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#F6E3B4] mb-2.5">
              4. Campus Pickup Hub (0 RM Fee)
            </label>
            <div className="space-y-2">
              {PICKUP_STATIONS.map(st => (
                <button
                  key={st.id}
                  onClick={() => setPickupStationId(st.id)}
                  type="button"
                  className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                    pickupStationId === st.id
                      ? 'bg-[#310913] border-[#D4AF37] text-white shadow-md'
                      : 'bg-[#1b050b]/80 border-white/10 text-[#C9B7A7] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <div>
                      <div className="text-xs font-bold text-white">{st.name}</div>
                      <div className="text-[11px] text-[#A59283]">{st.detail}</div>
                    </div>
                  </div>
                  {pickupStationId === st.id && (
                    <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Details: Name and Custom Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#D8C7B8] mb-1">
                Your Name / Nickname (Optional)
              </label>
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                placeholder="e.g. Adam / Sarah"
                className="w-full bg-[#1b050b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#78695d] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#D8C7B8] mb-1">
                Special Requests (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Gift wrap, test smell first"
                className="w-full bg-[#1b050b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#78695d] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Price Calculation Summary */}
          <div className="bg-[#1b050b] border border-[#D4AF37]/30 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-xs text-[#C5B3A3]">
              <span>{currentFragrance.name} ({currentSizeOption.size} × {quantity})</span>
              <span>RM {totalPrice}</span>
            </div>
            <div className="flex justify-between text-xs text-[#C5B3A3]">
              <span>Campus Delivery ({currentStation.name.split(' ')[0]})</span>
              <span className="text-emerald-400 font-semibold">FREE (RM 0.00)</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
              <span className="font-cinzel font-bold text-white text-sm">Total Due on Pickup</span>
              <span className="font-cinzel font-extrabold text-2xl text-[#F6E3B4]">
                RM {totalPrice}
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer / Submit Button */}
        <div className="p-5 bg-gradient-to-r from-[#24060d] to-[#140306] border-t border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-[#A59283] flex items-center gap-2">
            <Package className="w-4 h-4 text-[#D4AF37]" />
            <span>Opens WhatsApp directly with founder +60 11-4009 7486</span>
          </div>

          <button
            onClick={handleSendOrder}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#140306] bg-gradient-to-r from-[#F6E3B4] via-[#D4AF37] to-[#A4771F] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-[#D4AF37]/20 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Order via WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
