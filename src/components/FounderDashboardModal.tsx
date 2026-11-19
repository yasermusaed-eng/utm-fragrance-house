import React, { useState, useEffect } from 'react';
import {
  X,
  TrendingUp,
  DollarSign,
  Download,
  PackageCheck,
  RefreshCw,
  Phone,
  MessageCircle,
  Building2,
  Tag,
  Search,
  CheckCircle,
  Clock,
  Boxes,
  Edit3,
  Droplets,
  Save
} from 'lucide-react';
import {
  getStoredOrders,
  getOperationsSummary,
  updateOrderStatus,
  saveLabStock,
  type OrderRecord,
  type LabInventoryStock
} from '../utils/orderTracker';
import { SURVEY_DISCOUNT_CODES, getUsedCodesMap } from '../data/discountCodes';

interface FounderDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FounderDashboardModal: React.FC<FounderDashboardModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [summary, setSummary] = useState(getOperationsSummary());
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'vouchers'>('inventory');
  const [voucherSearch, setVoucherSearch] = useState<string>('');
  const [usedCodesMap, setUsedCodesMap] = useState<Record<string, string>>({});

  // Stock edit state
  const [isEditingStock, setIsEditingStock] = useState<boolean>(false);
  const [stockForm, setStockForm] = useState<LabInventoryStock>({
    initialBottles: 70,
    initialAlcoholMl: 2800,
    initialOilMl: 700,
    initialAtomizers: 70,
  });

  const [rendered, setRendered] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const refreshData = () => {
    const loadedOrders = getStoredOrders();
    const loadedSummary = getOperationsSummary();
    setOrders(loadedOrders);
    setSummary(loadedSummary);
    setUsedCodesMap(getUsedCodesMap());
    setStockForm(loadedSummary.labStock);
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
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

  const handleStatusChange = (orderId: string, status: OrderRecord['status']) => {
    updateOrderStatus(orderId, status);
    refreshData();
  };

  const handleSaveStock = (e: React.FormEvent) => {
    e.preventDefault();
    saveLabStock(stockForm);
    setIsEditingStock(false);
    refreshData();
  };

  // 1-Click WhatsApp Follow-up to customer
  const handleFollowUpCustomer = (order: OrderRecord) => {
    const rawPhone = order.studentPhone.replace(/\D/g, '');
    let cleanPhone = rawPhone;
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '60' + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith('60')) {
      cleanPhone = '60' + cleanPhone;
    }

    const itemsSummary = order.items
      ? order.items.map(i => `${i.fullName || i.fragranceName} (${i.size} ${i.concentration || 20}% x${i.quantity})`).join(', ')
      : 'perfumes';

    const followUpMsg = `Salam & Hi ${order.studentName}! 👋

This is Yaser from UTM Fragrance House. 
We received your Drop 01 reservation (Order #${order.id}) for:
${itemsSummary} — Total RM ${order.totalPrice}

Preferred Pickup: ${order.pickupStation} (${order.collegeHostel || 'UTM Campus'})

Because Drop 01 is strictly limited to 70 numbered bottles, we wanted to confirm your slot so we can hand-compound and serial-stamp your bottle. 

Could you please confirm your reservation? Thank you! 🙏`;

    const encoded = encodeURIComponent(followUpMsg);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert('No orders placed yet to export.');
      return;
    }

    const headers = [
      'Order ID',
      'Date',
      'Customer',
      'Phone',
      'College/Location',
      'Items',
      'Total Bottles',
      'Original Price (RM)',
      'Promo Code',
      'Discount (RM)',
      'Final Total (RM)',
      'Pickup Hub',
      'Status',
      'Oil Used (ml)',
      'Alcohol Used (ml)',
      'Notes'
    ];

    const rows = orders.map(o => {
      const itemsSummary = o.items
        ? o.items.map(item => `${item.fullName || item.fragranceName} ${item.size} (${item.concentration || 20}% oil) x${item.quantity}`).join(' | ')
        : 'N/A';
      return [
        o.id,
        new Date(o.timestamp).toLocaleString(),
        `"${o.studentName}"`,
        `"${o.studentPhone || ''}"`,
        `"${o.collegeHostel || ''}"`,
        `"${itemsSummary}"`,
        o.totalBottles || 1,
        o.originalPrice ?? o.totalPrice,
        `"${o.discountCode || 'None'}"`,
        o.discountAmount || 0,
        o.totalPrice,
        `"${o.pickupStation}"`,
        o.status,
        o.oilConsumedMl,
        o.alcoholConsumedMl,
        `"${o.notes || ''}"`,
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `UTM_Fragrance_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export 129 VIP Vouchers CSV for Mail Merge
  const handleExportVouchersCSV = () => {
    const vouchersList = Object.values(SURVEY_DISCOUNT_CODES);
    const headers = ['Email', 'Discount_Code', 'Discount_Percent', 'Survey_Language', 'Status', 'Redeemed_Details'];
    const rows = vouchersList.map(v => {
      const redeemed = usedCodesMap[v.code];
      return [
        v.email,
        v.code,
        '20%',
        v.surveyLanguage,
        redeemed ? 'Redeemed' : 'Unused',
        `"${redeemed || ''}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `UTM_Survey_20Percent_Vouchers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearOrders = () => {
    if (confirm('Are you sure you want to reset all tracked test orders?')) {
      localStorage.removeItem('utm_fragrance_orders');
      refreshData();
    }
  };

  // Vouchers list computation
  const allVouchers = Object.values(SURVEY_DISCOUNT_CODES);
  const redeemedVouchersCount = allVouchers.filter(v => !!usedCodesMap[v.code]).length;
  const filteredVouchers = allVouchers.filter(v =>
    v.email.toLowerCase().includes(voucherSearch.toLowerCase()) ||
    v.code.toLowerCase().includes(voucherSearch.toLowerCase())
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-out ${
        animateIn
          ? 'bg-black/85 backdrop-blur-md opacity-100'
          : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`relative w-full max-w-5xl bg-[#140306] border border-[#D4AF37]/50 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) transform ${
          animateIn ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-6 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#2c0813] via-[#1a040b] to-[#2c0813] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E3B4]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                Laboratory Inventory &amp; Operations Command
              </h3>
              <p className="text-xs text-[#D8C7B8]">
                Founder Real-Time Stock • Bottles, Oil &amp; Alcohol Consumed • 1-Click WhatsApp Follow-up
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#A59283] hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-white/10 bg-[#17040a] flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-[#D4AF37] text-[#F6E3B4]'
                : 'border-transparent text-[#A59283] hover:text-white'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Raw Materials &amp; Stock</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#D4AF37] text-[#F6E3B4]'
                : 'border-transparent text-[#A59283] hover:text-white'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vouchers')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'vouchers'
                ? 'border-[#D4AF37] text-[#F6E3B4]'
                : 'border-transparent text-[#A59283] hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>VIP Survey Vouchers ({allVouchers.length})</span>
            {redeemedVouchersCount > 0 && (
              <span className="bg-emerald-950 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                {redeemedVouchersCount} redeemed
              </span>
            )}
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-left">
          
          {/* Top KPI Cards - Real-time metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-[#1b050b] border border-[#D4AF37]/25 p-4 rounded-2xl">
              <div className="text-[10px] text-[#A59283] uppercase font-bold tracking-wider mb-1">
                Customers &amp; Bottles Sold
              </div>
              <div className="font-cinzel text-2xl font-bold text-white">
                {summary.totalBottlesSold} <span className="text-sm font-normal text-[#A59283]">bottles</span>
              </div>
              <div className="text-[11px] text-[#F6E3B4] mt-1">
                Across {summary.activeOrdersCount} customer order(s)
              </div>
            </div>

            <div className="bg-[#1b050b] border border-[#D4AF37]/25 p-4 rounded-2xl">
              <div className="text-[10px] text-[#A59283] uppercase font-bold tracking-wider mb-1">
                Gross Orders Value
              </div>
              <div className="font-cinzel text-2xl font-bold text-[#F6E3B4]">
                RM {summary.totalGrossRevenue}
              </div>
              <div className="text-[11px] text-[#A59283] mt-1">
                Avg RM {summary.activeOrdersCount > 0 ? Math.round(summary.totalGrossRevenue / summary.activeOrdersCount) : 0} per student
              </div>
            </div>

            <div className="bg-[#1b050b] border border-[#D4AF37]/25 p-4 rounded-2xl">
              <div className="text-[10px] text-[#A59283] uppercase font-bold tracking-wider mb-1">
                Projected Net Profit
              </div>
              <div className="font-cinzel text-2xl font-bold text-emerald-400">
                RM {summary.estimatedNetProfit}
              </div>
              <div className="text-[11px] text-[#A59283] mt-1">
                65.9% Net margin model
              </div>
            </div>

            <div className="bg-[#1b050b] border border-[#D4AF37]/25 p-4 rounded-2xl">
              <div className="text-[10px] text-[#A59283] uppercase font-bold tracking-wider mb-1">
                Materials Consumed
              </div>
              <div className="font-cinzel text-2xl font-bold text-cyan-400">
                {summary.totalOilUsedMl} ml
              </div>
              <div className="text-[11px] text-[#A59283] mt-1">
                Oil + {summary.totalAlcoholUsedMl} ml Alcohol
              </div>
            </div>

          </div>

          {/* ================= TAB 1: RAW MATERIALS & LABORATORY INVENTORY ================= */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              
              {/* Material Inventory Stock Head */}
              <div className="bg-[#1b050b] border border-[#D4AF37]/30 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                      <Boxes className="w-5 h-5 text-[#D4AF37]" />
                      <span>Physical Laboratory Raw Material Stock</span>
                    </h4>
                    <p className="text-xs text-[#A59283] mt-0.5">
                      Tracks what you have in the lab vs what orders have consumed in real-time.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditingStock(!isEditingStock)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F6E3B4] text-xs font-semibold hover:bg-[#D4AF37] hover:text-[#140306] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingStock ? 'Close Editor' : 'Edit Initial Stock'}</span>
                  </button>
                </div>

                {/* Edit Form Drawer */}
                {isEditingStock && (
                  <form onSubmit={handleSaveStock} className="mb-6 p-4 bg-[#140306] rounded-2xl border border-[#D4AF37]/40 space-y-3">
                    <div className="text-xs font-bold text-[#F6E3B4] uppercase tracking-wider mb-2">
                      Set Your Current Laboratory Starting Stock
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] text-[#A59283] uppercase mb-1">Total Bottles</label>
                        <input
                          type="number"
                          value={stockForm.initialBottles}
                          onChange={e => setStockForm({ ...stockForm, initialBottles: Number(e.target.value) })}
                          className="w-full bg-[#1b050b] border border-white/10 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#A59283] uppercase mb-1">Perfumer Alcohol (ml)</label>
                        <input
                          type="number"
                          value={stockForm.initialAlcoholMl}
                          onChange={e => setStockForm({ ...stockForm, initialAlcoholMl: Number(e.target.value) })}
                          className="w-full bg-[#1b050b] border border-white/10 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#A59283] uppercase mb-1">Total Oil Stock (ml)</label>
                        <input
                          type="number"
                          value={stockForm.initialOilMl}
                          onChange={e => setStockForm({ ...stockForm, initialOilMl: Number(e.target.value) })}
                          className="w-full bg-[#1b050b] border border-white/10 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#A59283] uppercase mb-1">Gold Atomizers</label>
                        <input
                          type="number"
                          value={stockForm.initialAtomizers}
                          onChange={e => setStockForm({ ...stockForm, initialAtomizers: Number(e.target.value) })}
                          className="w-full bg-[#1b050b] border border-white/10 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F6E3B4] to-[#D4AF37] text-[#140306] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Starting Stock</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Live Gauges Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Flacon Bottles */}
                  <div className="p-4 bg-[#140306] rounded-2xl border border-white/5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#A59283] tracking-wider block">
                      Empty Glass Bottles
                    </span>
                    <div className="flex items-baseline justify-between">
                      <span className="font-cinzel text-3xl font-extrabold text-white">
                        {summary.remainingBottles}
                      </span>
                      <span className="text-xs text-[#A59283]">
                        of {summary.labStock.initialBottles} available
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#D4AF37] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (summary.remainingBottles / (summary.labStock.initialBottles || 1)) * 100)}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-emerald-400">
                      {summary.totalBottlesSold} bottles compounded/sold
                    </div>
                  </div>

                  {/* Perfumer's Alcohol */}
                  <div className="p-4 bg-[#140306] rounded-2xl border border-white/5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#A59283] tracking-wider block">
                      Perfumer Alcohol (99.8%)
                    </span>
                    <div className="flex items-baseline justify-between">
                      <span className="font-cinzel text-3xl font-extrabold text-cyan-400">
                        {summary.remainingAlcoholMl} <span className="text-sm font-normal">ml</span>
                      </span>
                      <span className="text-xs text-[#A59283]">
                        of {summary.labStock.initialAlcoholMl} ml
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (summary.remainingAlcoholMl / (summary.labStock.initialAlcoholMl || 1)) * 100)}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-[#A59283]">
                      Used: <strong className="text-white">{summary.totalAlcoholUsedMl} ml</strong>
                    </div>
                  </div>

                  {/* Fragrance Oils */}
                  <div className="p-4 bg-[#140306] rounded-2xl border border-white/5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#A59283] tracking-wider block">
                      Pure European Fragrance Oils
                    </span>
                    <div className="flex items-baseline justify-between">
                      <span className="font-cinzel text-3xl font-extrabold text-[#F6E3B4]">
                        {summary.remainingOilMl} <span className="text-sm font-normal">ml</span>
                      </span>
                      <span className="text-xs text-[#A59283]">
                        of {summary.labStock.initialOilMl} ml
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#F6E3B4] to-[#D4AF37] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (summary.remainingOilMl / (summary.labStock.initialOilMl || 1)) * 100)}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-[#A59283]">
                      Used: <strong className="text-white">{summary.totalOilUsedMl} ml</strong>
                    </div>
                  </div>

                  {/* Gold Atomizers & Caps */}
                  <div className="p-4 bg-[#140306] rounded-2xl border border-white/5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#A59283] tracking-wider block">
                      Crimped Atomizers &amp; Caps
                    </span>
                    <div className="flex items-baseline justify-between">
                      <span className="font-cinzel text-3xl font-extrabold text-amber-300">
                        {summary.remainingAtomizers}
                      </span>
                      <span className="text-xs text-[#A59283]">
                        of {summary.labStock.initialAtomizers} left
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (summary.remainingAtomizers / (summary.labStock.initialAtomizers || 1)) * 100)}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-[#A59283]">
                      Crimped: <strong className="text-white">{summary.totalBottlesSold} units</strong>
                    </div>
                  </div>

                </div>

              </div>

              {/* Specific Fragrance Oil Consumption Breakdown */}
              <div className="bg-[#1b050b] border border-[#D4AF37]/25 rounded-3xl p-6">
                <h4 className="font-cinzel text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#D4AF37]" />
                  <span>Oil Consumption Breakdown by Fragrance</span>
                </h4>
                <p className="text-xs text-[#A59283] mb-4">
                  Shows exact milliliters of European fine oil pipetted into bottles per perfume formulation.
                </p>

                {Object.keys(summary.oilBreakdown).length === 0 ? (
                  <div className="p-6 bg-[#140306] rounded-2xl border border-white/5 text-center text-xs text-[#78695d]">
                    No perfume orders recorded yet. As orders are submitted, each scent's oil consumption will be tracked here.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(summary.oilBreakdown).map(([name, ml]) => (
                      <div key={name} className="p-3 bg-[#140306] rounded-xl border border-white/5 flex items-center justify-between">
                        <span className="text-xs text-white font-medium truncate max-w-[170px]">{name}</span>
                        <span className="font-cinzel font-bold text-sm text-[#F6E3B4]">{ml} ml</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Equity & Profit Distribution Breakdown */}
              <div className="bg-[#1c060d] border border-white/10 rounded-2xl p-5">
                <h4 className="font-cinzel text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                  <span>Projected Milestone Profit Distribution (Playbook Model)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#130306] rounded-xl border border-white/5">
                    <span className="text-[#A59283] block">Seed Partner (Dad · 50%)</span>
                    <span className="font-cinzel text-base font-bold text-[#F6E3B4]">
                      RM {Math.round(summary.estimatedNetProfit * 0.5)}
                    </span>
                  </div>
                  <div className="p-3 bg-[#130306] rounded-xl border border-white/5">
                    <span className="text-[#A59283] block">Operations &amp; Tech (You · 27%)</span>
                    <span className="font-cinzel text-base font-bold text-emerald-400">
                      RM {Math.round(summary.estimatedNetProfit * 0.27)}
                    </span>
                  </div>
                  <div className="p-3 bg-[#130306] rounded-xl border border-white/5">
                    <span className="text-[#A59283] block">Marketing &amp; Outreach (23%)</span>
                    <span className="font-cinzel text-base font-bold text-[#F6E3B4]">
                      RM {Math.round(summary.estimatedNetProfit * 0.23)}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 2: ORDERS TABLE ================= */}
          {activeTab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <h4 className="font-cinzel text-sm font-bold text-white flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Recorded Customer Orders ({orders.length})</span>
                </h4>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F6E3B4] text-xs font-semibold hover:bg-[#D4AF37] hover:text-[#140306] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Orders to Excel/CSV</span>
                  </button>

                  {orders.length > 0 && (
                    <button
                      onClick={handleClearOrders}
                      className="p-1.5 text-xs text-rose-400 hover:text-rose-300 rounded hover:bg-rose-950/30 cursor-pointer"
                      title="Reset test orders"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="bg-[#1b050b] border border-white/5 rounded-2xl p-8 text-center text-xs text-[#A59283]">
                  No orders recorded yet. When customers submit through the website, their full contact details and order lines will be recorded here immediately.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-xs text-[#D8C7B8]">
                    <thead className="bg-[#24070f] text-[#F6E3B4] uppercase text-[10px] tracking-wider border-b border-white/10">
                      <tr>
                        <th className="py-2.5 px-3">Order ID</th>
                        <th className="py-2.5 px-3">Customer Contact</th>
                        <th className="py-2.5 px-3">Campus Location</th>
                        <th className="py-2.5 px-3">Items Ordered</th>
                        <th className="py-2.5 px-3">Total</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-center">1-Click Follow-Up</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-[#140306]">
                      {orders.map(order => (
                        <tr
                          key={order.id}
                          className={`hover:bg-white/[0.02] align-top transition-colors ${
                            order.status === 'Ghosted' ? 'opacity-40' : ''
                          }`}
                        >
                          {/* Order ID */}
                          <td className="py-3 px-3 font-mono text-[#D4AF37] whitespace-nowrap">
                            {order.id}
                            <div className="text-[10px] text-[#78695d]">
                              {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>

                          {/* Customer & Phone */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="text-white font-medium">{order.studentName}</div>
                            {order.studentPhone ? (
                              <a
                                href={`tel:${order.studentPhone}`}
                                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{order.studentPhone}</span>
                              </a>
                            ) : (
                              <span className="text-[10px] text-[#78695d]">No phone recorded</span>
                            )}
                          </td>

                          {/* Campus Location */}
                          <td className="py-3 px-3 text-[11px]">
                            <div className="flex items-center gap-1 text-[#D8C7B8]">
                              <Building2 className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                              <span>{order.collegeHostel || 'UTM Campus'}</span>
                            </div>
                            <div className="text-[10px] text-[#A59283] mt-0.5">{order.pickupStation.replace(' Hub', '')}</div>
                          </td>

                          {/* Items Ordered */}
                          <td className="py-3 px-3">
                            {order.items && order.items.length > 0 ? (
                              <ul className="space-y-0.5">
                                {order.items.map((item, i) => (
                                  <li key={i} className="text-[11px] text-[#C5B3A3]">
                                    <span className="text-white font-semibold">{item.fullName || item.fragranceName}</span>
                                    {' '}<span className="text-[#D4AF37]">{item.size} ({item.concentration || 20}% oil)</span>
                                    {' '}×{item.quantity}
                                    {' '}<span className="text-[#A59283]">(RM {item.price * item.quantity})</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-[#A59283] text-xs">Standard order</span>
                            )}
                          </td>

                          {/* Total Price with Promo breakdown */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="font-semibold text-white">RM {order.totalPrice}</div>
                            {order.discountCode && (
                              <div className="text-[10px] text-emerald-400">
                                -RM {order.discountAmount} ({order.discountCode})
                              </div>
                            )}
                          </td>

                          {/* Order Status Selector */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={e => handleStatusChange(order.id, e.target.value as OrderRecord['status'])}
                              className={`text-[10px] font-bold uppercase rounded-lg px-2 py-1 border cursor-pointer focus:outline-none ${
                                order.status === 'Collected'
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                                  : order.status === 'Compounded'
                                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
                                  : order.status === 'Ghosted'
                                  ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                                  : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                              }`}
                            >
                              <option value="Pending" className="bg-[#140306] text-amber-300">Pending</option>
                              <option value="Compounded" className="bg-[#140306] text-cyan-300">Compounded</option>
                              <option value="Collected" className="bg-[#140306] text-emerald-300">Collected</option>
                              <option value="Ghosted" className="bg-[#140306] text-rose-300">Ghosted (Ignored)</option>
                            </select>
                          </td>

                          {/* 1-Click WhatsApp Follow-up button */}
                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            {order.studentPhone ? (
                              <button
                                type="button"
                                onClick={() => handleFollowUpCustomer(order)}
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-[#140306] text-[11px] font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                                title="Send follow-up WhatsApp to confirm their order"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Ping on WhatsApp</span>
                              </button>
                            ) : (
                              <span className="text-[10px] text-[#78695d]">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: VIP SURVEY VOUCHERS REGISTRY ================= */}
          {activeTab === 'vouchers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-white flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#D4AF37]" />
                    <span>Survey VIP 20% Voucher Registry ({allVouchers.length} Total)</span>
                  </h4>
                  <p className="text-xs text-[#A59283] mt-0.5">
                    129 unique students from the campus surveys. Each code is one-time use only.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleExportVouchersCSV}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F6E3B4] to-[#D4AF37] text-[#140306] text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Vouchers CSV (For Mail Merge)</span>
                </button>
              </div>

              {/* Search Bar & Summary Stats */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#19040b] p-3 rounded-2xl border border-white/5">
                <div className="relative w-full sm:w-80">
                  <Search className="w-3.5 h-3.5 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={voucherSearch}
                    onChange={e => setVoucherSearch(e.target.value)}
                    placeholder="Search by student email or voucher code..."
                    className="w-full bg-[#120306] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#78695d] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[#A59283]">Redeemed:</span>
                    <strong className="text-emerald-400 font-bold">{redeemedVouchersCount}</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[#A59283]">Unused:</span>
                    <strong className="text-white font-bold">{allVouchers.length - redeemedVouchersCount}</strong>
                  </div>
                </div>
              </div>

              {/* Vouchers Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 max-h-[460px] overflow-y-auto">
                <table className="w-full text-left text-xs text-[#D8C7B8]">
                  <thead className="bg-[#24070f] text-[#F6E3B4] uppercase text-[10px] tracking-wider border-b border-white/10 sticky top-0 z-10">
                    <tr>
                      <th className="py-2.5 px-3">Voucher Code</th>
                      <th className="py-2.5 px-3">Student Email</th>
                      <th className="py-2.5 px-3">Language</th>
                      <th className="py-2.5 px-3">Discount</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-[#140306]">
                    {filteredVouchers.map(v => {
                      const isRedeemed = !!usedCodesMap[v.code];
                      return (
                        <tr key={v.code} className="hover:bg-white/[0.02]">
                          <td className="py-2.5 px-3 font-mono text-[#D4AF37] font-semibold">
                            {v.code}
                          </td>
                          <td className="py-2.5 px-3 text-white">
                            {v.email}
                          </td>
                          <td className="py-2.5 px-3 text-[#A59283]">
                            {v.surveyLanguage}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-emerald-400">
                            20% OFF
                          </td>
                          <td className="py-2.5 px-3">
                            {isRedeemed ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/30">
                                Redeemed: {usedCodesMap[v.code]}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                                Unused (Active)
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1b050b] border-t border-[#D4AF37]/25 flex items-center justify-between text-xs text-[#A59283]">
          <span>
            {activeTab === 'inventory'
              ? 'Raw materials update automatically as orders are placed. Use "Edit Initial Stock" to adjust starting inventory.'
              : activeTab === 'orders'
              ? 'Tip: If a customer ignores you on WhatsApp, switch their status to "Ghosted" to immediately free their bottle slot.'
              : 'All 129 survey codes are registered. The website rejects invalid codes and prevents reusing codes.'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
