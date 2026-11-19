import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  MessageCircle,
  MapPin,
  CheckCircle,
  Package,
  Plus,
  Minus,
  ShoppingCart,
  ChevronRight,
  Phone,
  User,
  Clock,
  AlertTriangle,
  Building2,
  ExternalLink
} from 'lucide-react';
import { FRAGRANCES, SIZE_OPTIONS, PICKUP_STATIONS } from '../data/fragrances';
import { saveMultiItemOrder, type OrderItem, type OrderRecord } from '../utils/orderTracker';
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

const UTM_COLLEGES = [
  'KTDI (Kolej Tun Dr. Ismail)',
  'KDOJ (Kolej Dato Onn Jaafar)',
  'Kolej 9 & 10',
  'KTR (Kolej Tun Razak)',
  'KDSE (Kolej Datin Seri Endon)',
  'KRP (Kolej Rahman Putra)',
  'KTHO (Kolej Tun Hussein Onn)',
  'Kolej Perdana',
  'Taman Universiti (Off Campus)',
  'Skudai / Other Outside Campus'
];

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  isOpen,
  onClose,
  preselectedFragranceId,
}) => {
  const FOUNDER_WHATSAPP = '601140097486';

  // ----- Cart state -----
  const [cart, setCart] = useState<Record<string, CartRow>>({});

  // ----- Customer Form state -----
  const [studentName, setStudentName] = useState<string>('');
  const [studentPhone, setStudentPhone] = useState<string>('');
  const [collegeHostel, setCollegeHostel] = useState<string>(UTM_COLLEGES[0]);
  const [pickupStationId, setPickupStationId] = useState<string>(PICKUP_STATIONS[0].id);
  const [notes, setNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // Post-submit confirmation screen
  const [submittedOrder, setSubmittedOrder] = useState<OrderRecord | null>(null);

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

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCart({});
      setStudentName('');
      setStudentPhone('');
      setCollegeHostel(UTM_COLLEGES[0]);
      setNotes('');
      setFormError('');
      setSubmittedOrder(null);
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
  const generateWhatsAppMessage = (orderId?: string) => {
    const greeting = studentName.trim()
      ? `Hi UTM Fragrance House! My name is ${studentName.trim()}.`
      : `Hi UTM Fragrance House!`;

    const itemLines = cartRows
      .map((row, idx) => {
        const frag = FRAGRANCES.find(f => f.id === row.fragranceId)!;
        const sizeOpt = SIZE_OPTIONS.find(s => s.size === row.size)!;
        const lineTotal = sizeOpt.price * row.quantity;
        return (
          `ITEM ${idx + 1}: ${frag.fullName} (${frag.brand})\n` +
          `- Size: ${sizeOpt.size} (${sizeOpt.label}) x ${row.quantity} bottle(s) - RM ${lineTotal}`
        );
      })
      .join('\n\n');

    const noteLine = notes.trim() ? `\nSpecial Request: ${notes.trim()}` : '';

    return (
      `${greeting}\n` +
      `I would like to place an order for Drop 01:\n\n` +
      (orderId ? `Order Reference: ${orderId}\n` : '') +
      `Contact: ${studentPhone.trim()}\n` +
      `College/Location: ${collegeHostel}\n\n` +
      `${itemLines}\n\n` +
      `Total: RM ${totalPrice} (Cash on Delivery / DuitNow QR)\n` +
      `Preferred Pickup: ${currentStation.name} (${currentStation.detail.replace('•', '-')})` +
      `${noteLine}\n\n` +
      `*I confirm that I will pick up and complete payment at the station.* Please assign my numbered bottle serial stamp. Thank you!`
    );
  };

  // ----- Submit -----
  const handleSendOrder = () => {
    if (cartRows.length === 0) {
      setFormError('Please select at least one fragrance to pre-order.');
      return;
    }
    if (!studentName.trim()) {
      setFormError('Please enter your full name or nickname so we can register your bottle.');
      return;
    }
    if (!studentPhone.trim()) {
      setFormError('Please enter your WhatsApp phone number so we can coordinate your pickup.');
      return;
    }

    setFormError('');

    // Build OrderItem[] for tracker
    const items: OrderItem[] = cartRows.map(row => {
      const frag = FRAGRANCES.find(f => f.id === row.fragranceId)!;
      return {
        fragranceId: row.fragranceId,
        fragranceName: frag.name,
        fullName: frag.fullName,
        brand: frag.brand,
        size: row.size,
        price: priceFor(row.size),
        quantity: row.quantity,
      };
    });

    const saved = saveMultiItemOrder({
      studentName: studentName.trim(),
      studentPhone: studentPhone.trim(),
      collegeHostel,
      items,
      totalPrice,
      pickupStation: currentStation.name,
      notes: notes.trim(),
    });

    setSubmittedOrder(saved);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F6E3B4', '#851628'],
    });

    const encodedText = encodeURIComponent(generateWhatsAppMessage(saved.id));
    window.open(`https://wa.me/${FOUNDER_WHATSAPP}?text=${encodedText}`, '_blank', 'noopener,noreferrer');
  };

  const handleReopenWhatsApp = () => {
    if (!submittedOrder) return;
    const encodedText = encodeURIComponent(generateWhatsAppMessage(submittedOrder.id));
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
                {submittedOrder ? 'Reservation Registered' : 'Build Your Order'}
              </h3>
              <p className="text-xs text-[#D8C7B8] mt-1">
                Drop 01 Official Release • Free Campus Pickup
              </p>
            </div>
          </div>

          {/* Cart badge or Close */}
          <div className="flex items-center gap-3">
            {!submittedOrder && cartCount > 0 && (
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

        {/* ================= IF SUBMITTED: POST-ORDER CONFIRMATION SCREEN ================= */}
        {submittedOrder ? (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-center flex-1">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                Batch Reservation Number
              </span>
              <h4 className="font-cinzel text-3xl font-extrabold text-white">
                {submittedOrder.id}
              </h4>
              <p className="text-xs text-[#D8C7B8] mt-2 max-w-md mx-auto">
                Thank you <strong className="text-white">{submittedOrder.studentName}</strong>! Your bottle reservation has been recorded in our laboratory inventory.
              </p>
            </div>

            {/* Anti-Ghosting Reminder Box */}
            <div className="bg-[#240810] border border-[#D4AF37]/40 rounded-2xl p-5 text-left space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#F6E3B4] uppercase tracking-wide">
                    Action Required: Confirm on WhatsApp
                  </h5>
                  <p className="text-xs text-[#D8C7B8] mt-1 leading-relaxed">
                    Because Drop 01 is strictly capped at 70 numbered bottles, reservations are held for <strong>30 minutes</strong>. 
                    Please ensure you press <strong>SEND</strong> on WhatsApp so the founder can assign your physical certificate & serial stamp.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row justify-between text-xs text-[#C5B3A3] gap-2">
                <span>Contact: <strong className="text-white">{submittedOrder.studentPhone}</strong></span>
                <span>Station: <strong className="text-white">{submittedOrder.pickupStation}</strong></span>
                <span>Total: <strong className="text-[#F6E3B4]">RM {submittedOrder.totalPrice}</strong></span>
              </div>
            </div>

            {/* Reopen WhatsApp CTA */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleReopenWhatsApp}
                className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#140306] bg-gradient-to-r from-[#F6E3B4] via-[#D4AF37] to-[#A4771F] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat &amp; Send Order</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl font-semibold text-xs text-[#A59283] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                Done / Return to Website
              </button>
            </div>
          </div>
        ) : (
          /* ================= NORMAL ORDER FORM BODY ================= */
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-left flex-1">

            {/* Anti-Ghosting / Urgency Banner */}
            <div className="bg-[#240810]/80 border border-[#D4AF37]/30 rounded-2xl p-4 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[#F6E3B4] block mb-0.5">
                  Drop 01 Official Reservation Notice
                </span>
                <span className="text-[#C9B7A7] leading-relaxed">
                  Only 70 numbered bottles are available. Reserved slots are held for 30 minutes until confirmed via WhatsApp. Free pickup &amp; pay on collection at your chosen campus hub.
                </span>
              </div>
            </div>

            {/* ── STEP 1: Choose Fragrances ── */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#F6E3B4] mb-2.5">
                1. Choose Fragrances
                <span className="ml-2 text-[#A59283] normal-case font-normal">— tap to add or remove</span>
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
                        alt={f.fullName}
                        className="w-10 h-10 object-contain rounded-lg bg-[#140306] p-0.5 border border-white/5 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] text-[#D4AF37] font-semibold truncate">{f.brand}</div>
                        <div className="text-xs font-bold font-cinzel text-white truncate">{f.fullName}</div>
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
                  2. Bottle Size &amp; Quantity
                </label>
                <div className="space-y-3">
                  {cartRows.map(row => {
                    const frag = FRAGRANCES.find(f => f.id === row.fragranceId)!;
                    const lineTotal = priceFor(row.size) * row.quantity;
                    return (
                      <div key={row.fragranceId} className="bg-[#1b050b] border border-[#D4AF37]/20 rounded-2xl p-4">
                        {/* Fragrance header with Full Name & Brand */}
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={frag.image}
                            alt={frag.fullName}
                            className="w-10 h-10 object-contain rounded-lg bg-[#140306] border border-white/5 p-0.5 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] text-[#D4AF37] font-semibold">{frag.brand}</div>
                            <div className="font-cinzel text-sm font-bold text-white truncate">{frag.fullName}</div>
                          </div>
                          <div className="font-cinzel text-sm font-bold text-[#F6E3B4]">RM {lineTotal}</div>
                        </div>

                        {/* Bottle Size selector */}
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
                          <span className="text-[11px] text-[#A59283]">Number of Bottles</span>
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
                <p className="text-xs text-[#78695d]">Select at least one fragrance above to start your order</p>
              </div>
            )}

            {/* ── STEP 3: Campus Pickup Station ── */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#F6E3B4] mb-2.5">
                3. Campus Pickup Hub
                <span className="ml-2 text-emerald-400 normal-case font-normal">0 RM fee • Inspect before pay</span>
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

            {/* ── STEP 4: Anti-Ghosting Contact Details ── */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#F6E3B4] mb-2.5">
                4. Your Contact Details
                <span className="ml-2 text-[#A59283] normal-case font-normal">— required for serial registration</span>
              </label>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#D8C7B8] mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Full Name / Nickname <strong className="text-rose-400">*</strong></span>
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      placeholder="e.g. Yaser Musaed"
                      className="w-full bg-[#1b050b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#78695d] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* WhatsApp Phone Number */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#D8C7B8] mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Phone Number <strong className="text-rose-400">*</strong></span>
                    </label>
                    <input
                      type="tel"
                      value={studentPhone}
                      onChange={e => setStudentPhone(e.target.value)}
                      placeholder="e.g. 011-4009 7486"
                      className="w-full bg-[#1b050b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#78695d] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* College / Dorm Location */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#D8C7B8] mb-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Residential College / Campus Location</span>
                  </label>
                  <select
                    value={collegeHostel}
                    onChange={e => setCollegeHostel(e.target.value)}
                    className="w-full bg-[#1b050b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    {UTM_COLLEGES.map(c => (
                      <option key={c} value={c} className="bg-[#140306] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#D8C7B8] mb-1">
                    Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="e.g. Gift box, want to smell tester first before purchase"
                    className="w-full bg-[#1b050b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#78695d] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300">
                {formError}
              </div>
            )}

            {/* ── Order Summary ── */}
            {cartRows.length > 0 && (
              <div className="bg-[#1b050b] border border-[#D4AF37]/30 rounded-2xl p-4 space-y-2">
                {cartRows.map(row => {
                  const frag = FRAGRANCES.find(f => f.id === row.fragranceId)!;
                  const lineTotal = priceFor(row.size) * row.quantity;
                  return (
                    <div key={row.fragranceId} className="flex justify-between text-xs text-[#C5B3A3]">
                      <span>{frag.fullName} · {row.size} × {row.quantity}</span>
                      <span>RM {lineTotal}</span>
                    </div>
                  );
                })}
                <div className="flex justify-between text-xs text-[#C5B3A3]">
                  <span>Campus Pickup ({currentStation.name.split(' ')[0]})</span>
                  <span className="text-emerald-400 font-semibold">FREE (RM 0.00)</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="font-cinzel font-bold text-white text-sm">Total Due on Pickup</span>
                  <span className="font-cinzel font-extrabold text-2xl text-[#F6E3B4]">RM {totalPrice}</span>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Modal Footer */}
        {!submittedOrder && (
          <div className="p-5 bg-gradient-to-r from-[#24060d] to-[#140306] border-t border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
            <div className="text-[11px] text-[#A59283] flex items-center gap-2">
              <Package className="w-4 h-4 text-[#D4AF37]" />
              <span>Direct reservation to founder (+60 11-4009 7486)</span>
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
        )}

      </div>
    </div>
  );
};
