import React, { useState, useEffect } from 'react';
import { X, Sparkles, MessageCircle, MapPin, CheckCircle, Package, Plus, Minus, ShoppingCart, ChevronRight } from 'lucide-react';
import { FRAGRANCES, SIZE_OPTIONS, PICKUP_STATIONS } from '../data/fragrances';
import { saveMultiItemOrder, type OrderItem } from '../utils/orderTracker';
import confetti from 'canvas-confetti';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedFragranceId?: string;
}

// A cart row: one fragrance + one size + quantity
interface CartRow {
  fragranceId: string;
  size: '30ml' | '50ml' | '100ml';
  quantity: number;
}

// Return price for a size
function priceFor(size: '30ml' | '50ml' | '100ml'): number {
  const opt = SIZE_OPTIONS.find(s => s.size === size);
  return opt ? opt.price : 65;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  isOpen,
  onClose,
  preselectedFragranceId,
}) => {
  const FOUNDER_WHATSAPP = '601140097486';

  // ----- Cart state -----
  // Key: fragranceId. Each selected fragrance starts with size=50ml, qty=1
  const [cart, setCart] = useState<Record<string, CartRow>>({});

  // ----- Other form state -----
  const [pickupStationId, setPickupStationId] = useState<string>(PICKUP_STATIONS[0].id);
  const [studentName, setStudentName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // ----- Animation state -----
  const [rendered, setRendered] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Pre-select fragrance if passed in from card button
  useEffect(() => {
    if (isOpen && preselectedFragranceId) {
      setCart(prev => {
        if (prev[preselectedFragranceId]) return prev;
        return {
          ...prev,
          [preselectedFragranceId]: {
            fragranceId: preselectedFragranceId,
            size: '50ml',
            quantity: 1,
          },
        };
      });
    }
  }, [isOpen, preselectedFragranceId]);

  // Reset cart when modal closes so next open is fresh (keep preselect logic above)
  useEffect(() => {
    if (!isOpen) {
      setCart({});
      setStudentName('');
      setNotes('');
      setPickupStationId(PICKUP_STATIONS[0].id);
    }
  }, [isOpen]);

  // Spring-in animation
  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      const timer = setTimeout(() => setAnimateIn(true), 20);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setRendered(false), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!rendered) return null;

  // ----- Cart helpers -----
  const isInCart = (fragranceId: string) => !!cart[fragranceId];

  const toggleFragrance = (fragranceId: string) => {
    setCart(prev => {
      if (prev[fragranceId]) {
        const next = { ...prev };
        delete next[fragranceId];
        return next;
      }
      return {
        ...prev,
        [fragranceId]: { fragranceId, size: '50ml', quantity: 1 },
      };
    });
  };

  const updateSize = (fragranceId: string, size: '30ml' | '50ml' | '100ml') => {
    setCart(prev => ({
      ...prev,
      [fragranceId]: { ...prev[fragranceId], size },
    }));
  };

  const updateQty = (fragranceId: string, delta: number) => {
    setCart(prev => {
      const current = prev[fragranceId];
      const next = Math.max(1, current.quantity + delta);
      return { ...prev, [fragranceId]: { ...current, quantity: next } };
    });
  };

  // ----- Computed totals -----
  const cartRows = Object.values(cart);
  const cartCount = cartRows.reduce((s, r) => s + r.quantity, 0);
  const totalPrice = cartRows.reduce((s, r) => s + priceFor(r.size) * r.quantity, 0);
  const currentStation = PICKUP_STATIONS.find(p => p.id === pickupStationId) || PICKUP_STATIONS[0];

  // ----- WhatsApp message generator -----
  const generateWhatsAppMessage = () => {
    const greeting = studentName.trim()
      ? `Hi UTM Fragrance House! My name is ${studentName.trim()}.`
      : `Hi UTM Fragrance House!`;

    const itemLines = cartRows
      .map((row, idx) => {
        const frag = FRAGRANCES.find(f => f.id === row.fragranceId)!;
        const sizeOpt = SIZE_OPTIONS.find(s => s.size === row.size)!;
        const lineTotal = sizeOpt.price * row.quantity;
        return (
          `ITEM ${idx + 1}: ${frag.name} (${frag.brand})\n` +
          `- Size: ${sizeOpt.size} (${sizeOpt.label}) x ${row.quantity} bottle(s) - RM ${lineTotal}`
        );
      })
      .join('\n\n');

    const noteLine = notes.trim() ? `\nSpecial Request: ${notes.trim()}` : '';

    return (
      `${greeting}\n` +
      `I would like to place an order for Drop 01:\n\n` +
      `${itemLines}\n\n` +
      `Total: RM ${totalPrice} (Cash on Delivery / DuitNow QR)\n` +
      `Preferred Pickup: ${currentStation.name} (${currentStation.detail.replace('•', '-')})` +
      `${noteLine}\n\n` +
      `Please confirm my reservation and batch serial number. Thank you!`
    );
  };

  // ----- Submit -----
  const handleSendOrder = () => {
    if (cartRows.length === 0) return;

    // Build OrderItem[] for tracker
    const items: OrderItem[] = cartRows.map(row => {
      const frag = FRAGRANCES.find(f => f.id === row.fragranceId)!;
      return {
        fragranceId: row.fragranceId,
        fragranceName: frag.name,
        brand: frag.brand,
        size: row.size,
        price: priceFor(row.size),
        quantity: row.quantity,
      };
    });

    saveMultiItemOrder({
      studentName: studentName.trim() || 'Anonymous Student',
      items,
      totalPrice,
      pickupStation: currentStation.name,
      notes: notes.trim(),
    });

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F6E3B4', '#851628'],
    });

    const encodedText = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/${FOUNDER_WHATSAPP}?text=${encodedText}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-out ${
        animateIn
          ? 'bg-black/80 backdrop-blur-md opacity-100'
          : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`relative w-full max-w-2xl bg-[#140306] border border-[#D4AF37]/40 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          animateIn
            ? 'scale-100 translate-y-0 opacity-100 shadow-[0_20px_60px_-15px_rgba(212,175,55,0.3)]'
            : 'scale-90 translate-y-8 opacity-0'
        }`}
      >

        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#2a070f] via-[#1a040a] to-[#2a070f] border-b border-[#D4AF37]/25 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E3B4]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white leading-none">
                Build Your Order
              </h3>
              <p className="text-xs text-[#D8C7B8] mt-1">
                Drop 01 Reservation • Free Campus Pickup
              </p>
            </div>
          </div>

          {/* Cart badge */}
          <div className="flex items-center gap-3">
            {cartCount > 0 && (
              <div className="flex items-center gap-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-full px-3 py-1">
                <ShoppingCart className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-xs font-bold text-[#F6E3B4]">{cartCount} bottle{cartCount !== 1 ? 's' : ''}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 text-[#A59283] hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-left flex-1">

          {/* ── STEP 1: Choose Fragrances ── */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#F6E3B4] mb-2.5">
              1. Choose Fragrances
              <span className="ml-2 text-[#A59283] normal-case font-normal">— tap to add / remove</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {FRAGRANCES.map(f => {
                const selected = isInCart(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleFragrance(f.id)}
                    type="button"
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2.5 relative ${
                      selected
                        ? 'bg-[#310913] border-[#D4AF37] shadow-md shadow-[#D4AF37]/20'
                        : 'bg-[#1b050b]/80 border-white/10 text-[#C9B7A7] hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      className="w-10 h-10 object-contain rounded-lg bg-[#140306] p-0.5 border border-white/5 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] text-[#D4AF37] font-semibold truncate">{f.brand.replace('Inspired by ', '')}</div>
                      <div className="text-xs font-bold font-cinzel text-white truncate">{f.name}</div>
                      <div className="text-[9px] text-[#A59283] truncate">{f.familyLabel}</div>
                    </div>
                    {/* Checkmark overlay */}
                    {selected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#D4AF37] flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-[#140306]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── STEP 2: Configure each selected fragrance ── */}
          {cartRows.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#F6E3B4] mb-2.5">
                2. Size &amp; Quantity per Fragrance
              </label>
              <div className="space-y-3">
                {cartRows.map(row => {
                  const frag = FRAGRANCES.find(f => f.id === row.fragranceId)!;
                  const lineTotal = priceFor(row.size) * row.quantity;
                  return (
                    <div key={row.fragranceId} className="bg-[#1b050b] border border-[#D4AF37]/20 rounded-2xl p-4">
                      {/* Frag header */}
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={frag.image}
                          alt={frag.name}
                          className="w-10 h-10 object-contain rounded-lg bg-[#140306] border border-white/5 p-0.5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] text-[#D4AF37] font-semibold">{frag.brand.replace('Inspired by ', '')}</div>
                          <div className="font-cinzel text-sm font-bold text-white">{frag.name}</div>
                        </div>
                        <div className="font-cinzel text-sm font-bold text-[#F6E3B4]">RM {lineTotal}</div>
                      </div>

                      {/* Size selector */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {SIZE_OPTIONS.map(s => (
                          <button
                            key={s.size}
                            type="button"
                            onClick={() => updateSize(row.fragranceId, s.size)}
                            className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                              row.size === s.size
                                ? 'bg-[#310913] border-[#D4AF37] text-white shadow-sm'
                                : 'bg-[#130306] border-white/10 text-[#C9B7A7] hover:border-[#D4AF37]/40'
                            }`}
                          >
                            <div className="font-cinzel text-xs font-bold text-white">{s.size}</div>
                            <div className="text-[9px] font-semibold text-[#D4AF37]">RM {s.price}</div>
                          </button>
                        ))}
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#A59283]">Bottles</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQty(row.fragranceId, -1)}
                            className="w-7 h-7 rounded-lg bg-[#27060f] border border-[#D4AF37]/30 text-white font-bold flex items-center justify-center hover:bg-[#3d0b17] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-cinzel text-sm font-bold text-white w-5 text-center">{row.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(row.fragranceId, 1)}
                            className="w-7 h-7 rounded-lg bg-[#27060f] border border-[#D4AF37]/30 text-white font-bold flex items-center justify-center hover:bg-[#3d0b17] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty state nudge */}
          {cartRows.length === 0 && (
            <div className="bg-[#1b050b] border border-dashed border-[#D4AF37]/20 rounded-2xl p-6 text-center">
              <ShoppingCart className="w-8 h-8 text-[#D4AF37]/30 mx-auto mb-2" />
              <p className="text-xs text-[#78695d]">Select at least one fragrance above to continue</p>
            </div>
          )}

          {/* ── STEP 3: Campus Pickup Station ── */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#F6E3B4] mb-2.5">
              {cartRows.length > 0 ? '3' : '2'}. Campus Pickup Hub
              <span className="ml-2 text-emerald-400 normal-case font-normal">0 RM fee</span>
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
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── STEP 4: Name & Notes ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#D8C7B8] mb-1">
                Your Name / Nickname (Optional)
              </label>
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                placeholder="e.g. Yaser / Sarah"
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
                placeholder="e.g. Gift wrap, test first"
                className="w-full bg-[#1b050b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#78695d] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* ── Order Summary ── */}
          {cartRows.length > 0 && (
            <div className="bg-[#1b050b] border border-[#D4AF37]/30 rounded-2xl p-4 space-y-2">
              {cartRows.map(row => {
                const frag = FRAGRANCES.find(f => f.id === row.fragranceId)!;
                const lineTotal = priceFor(row.size) * row.quantity;
                return (
                  <div key={row.fragranceId} className="flex justify-between text-xs text-[#C5B3A3]">
                    <span>{frag.name} · {row.size} × {row.quantity}</span>
                    <span>RM {lineTotal}</span>
                  </div>
                );
              })}
              <div className="flex justify-between text-xs text-[#C5B3A3]">
                <span>Campus Pickup</span>
                <span className="text-emerald-400 font-semibold">FREE (RM 0.00)</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <span className="font-cinzel font-bold text-white text-sm">Total Due on Pickup</span>
                <span className="font-cinzel font-extrabold text-2xl text-[#F6E3B4]">RM {totalPrice}</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-gradient-to-r from-[#24060d] to-[#140306] border-t border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div className="text-[11px] text-[#A59283] flex items-center gap-2">
            <Package className="w-4 h-4 text-[#D4AF37]" />
            <span>Sends directly to founder (+60 11-4009 7486)</span>
          </div>

          <button
            type="button"
            onClick={handleSendOrder}
            disabled={cartRows.length === 0}
            className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all ${
              cartRows.length > 0
                ? 'text-[#140306] bg-gradient-to-r from-[#F6E3B4] via-[#D4AF37] to-[#A4771F] hover:brightness-110 active:scale-95 shadow-[#D4AF37]/20 cursor-pointer'
                : 'text-[#78695d] bg-[#1b050b] border border-white/10 cursor-not-allowed'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>
              {cartRows.length > 0
                ? `Confirm & Open WhatsApp (RM ${totalPrice})`
                : 'Add fragrances to continue'}
            </span>
            {cartRows.length > 0 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
};
