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
  Building2
} from 'lucide-react';
import {
  getStoredOrders,
  getOperationsSummary,
  updateOrderStatus,
  type OrderRecord
} from '../utils/orderTracker';

interface FounderDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FounderDashboardModal: React.FC<FounderDashboardModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [summary, setSummary] = useState(getOperationsSummary());
  const [rendered, setRendered] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const refreshData = () => {
    setOrders(getStoredOrders());
    setSummary(getOperationsSummary());
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
      ? order.items.map(i => `${i.fullName || i.fragranceName} (${i.size} x${i.quantity})`).join(', ')
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
      'Total (RM)',
      'Pickup Hub',
      'Status',
      'Oil Used (ml)',
      'Alcohol Used (ml)',
      'Notes'
    ];

    const rows = orders.map(o => {
      const itemsSummary = o.items
        ? o.items.map(item => `${item.fullName || item.fragranceName} ${item.size}x${item.quantity}`).join(' | ')
        : 'N/A';
      return [
        o.id,
        new Date(o.timestamp).toLocaleString(),
        `"${o.studentName}"`,
        `"${o.studentPhone || ''}"`,
        `"${o.collegeHostel || ''}"`,
        `"${itemsSummary}"`,
        o.totalBottles || 1,
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

  const handleClearOrders = () => {
    if (confirm('Are you sure you want to reset all tracked test orders?')) {
      localStorage.removeItem('utm_fragrance_orders');
      refreshData();
    }
  };

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
                Operations &amp; Anti-Ghosting Command Dashboard
              </h3>
              <p className="text-xs text-[#D8C7B8]">
                Founder Master View • Live Customer Contacts, 1-Click WhatsApp Follow-up &amp; Inventory
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-left">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-[#1b050b] border border-[#D4AF37]/25 p-4 rounded-2xl">
              <div className="text-[10px] text-[#A59283] uppercase font-bold tracking-wider mb-1">
                Drop 01 Allocation
              </div>
              <div className="font-cinzel text-2xl font-bold text-white">
                {summary.totalBottlesSold} / {summary.batchCapacity}
              </div>
              <div className="text-[11px] text-[#F6E3B4] mt-1">
                {summary.remainingDrop01Bottles} bottles remaining
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
                {summary.activeOrdersCount} active ({summary.totalOrders - summary.activeOrdersCount} ghosted)
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
                Oil Used (20% EDP)
              </div>
              <div className="font-cinzel text-2xl font-bold text-cyan-400">
                {summary.totalOilUsedMl} ml
              </div>
              <div className="text-[11px] text-[#A59283] mt-1">
                + {summary.totalAlcoholUsedMl} ml alcohol
              </div>
            </div>

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

          {/* Customer Orders Table with Anti-Ghosting Follow-Up */}
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
                  <span>Export to Excel/CSV</span>
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
                                  {' '}<span className="text-[#D4AF37]">{item.size}</span>
                                  {' '}×{item.quantity}
                                  {' '}<span className="text-[#A59283]">(RM {item.price * item.quantity})</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-[#A59283] text-xs">Standard order</span>
                          )}
                        </td>

                        {/* Total Price */}
                        <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">
                          RM {order.totalPrice}
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

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1b050b] border-t border-[#D4AF37]/25 flex items-center justify-between text-xs text-[#A59283]">
          <span>Tip: If a customer ignores you on WhatsApp, change their status to "Ghosted" to immediately free their bottle slot.</span>
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
