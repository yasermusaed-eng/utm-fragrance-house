import React, { useState, useEffect } from 'react';
import { X, TrendingUp, DollarSign, Download, PackageCheck, RefreshCw } from 'lucide-react';
import { getStoredOrders, getOperationsSummary, type OrderRecord } from '../utils/orderTracker';

interface FounderDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FounderDashboardModal: React.FC<FounderDashboardModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [summary, setSummary] = useState(getOperationsSummary());
  const [rendered, setRendered] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOrders(getStoredOrders());
      setSummary(getOperationsSummary());
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

  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert('No orders placed yet to export.');
      return;
    }

    const headers = ['Order ID', 'Date', 'Customer', 'Items', 'Total Bottles', 'Total (RM)', 'Pickup Hub', 'Oil Used (ml)', 'Alcohol Used (ml)', 'Notes'];
    const rows = orders.map(o => {
      const itemsSummary = o.items
        ? o.items.map(item => `${item.fragranceName} ${item.size}x${item.quantity}`).join(' | ')
        : 'N/A';
      return [
        o.id,
        new Date(o.timestamp).toLocaleString(),
        `"${o.studentName}"`,
        `"${itemsSummary}"`,
        o.totalBottles || 1,
        o.totalPrice,
        `"${o.pickupStation}"`,
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
      setOrders([]);
      setSummary(getOperationsSummary());
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
        className={`relative w-full max-w-4xl bg-[#140306] border border-[#D4AF37]/50 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) transform ${
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
                Operations & Resource Planning Tracker
              </h3>
              <p className="text-xs text-[#D8C7B8]">
                Founder Master View • In/Out Material Consumption & Revenue
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
                {summary.remainingDrop01Bottles} flacons remaining
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
                Across {summary.totalOrders} order(s)
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
                <span className="text-[#A59283] block">Operations & Tech (You · 27%)</span>
                <span className="font-cinzel text-base font-bold text-emerald-400">
                  RM {Math.round(summary.estimatedNetProfit * 0.27)}
                </span>
              </div>
              <div className="p-3 bg-[#130306] rounded-xl border border-white/5">
                <span className="text-[#A59283] block">Marketing & Outreach (23%)</span>
                <span className="font-cinzel text-base font-bold text-[#F6E3B4]">
                  RM {Math.round(summary.estimatedNetProfit * 0.23)}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
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
                No orders recorded yet. When you or customers submit through the WhatsApp modal, each order will be logged here with its resource and profit footprint.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-xs text-[#D8C7B8]">
                  <thead className="bg-[#24070f] text-[#F6E3B4] uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Items Ordered</th>
                      <th className="py-2.5 px-3">Bottles</th>
                      <th className="py-2.5 px-3">Total</th>
                      <th className="py-2.5 px-3">Hub</th>
                      <th className="py-2.5 px-3">Oil Used</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-[#140306]">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-white/[0.02] align-top">
                        <td className="py-2.5 px-3 font-mono text-[#D4AF37] whitespace-nowrap">{order.id}</td>
                        <td className="py-2.5 px-3 text-white font-medium whitespace-nowrap">{order.studentName}</td>
                        <td className="py-2.5 px-3">
                          {order.items && order.items.length > 0 ? (
                            <ul className="space-y-0.5">
                              {order.items.map((item, i) => (
                                <li key={i} className="text-[11px] text-[#C5B3A3]">
                                  <span className="text-white font-semibold">{item.fragranceName}</span>
                                  {' '}<span className="text-[#D4AF37]">{item.size}</span>
                                  {' '}×{item.quantity}
                                  {' '}<span className="text-[#A59283]">(RM {item.price * item.quantity})</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-[#A59283] text-xs">Legacy order</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-white font-semibold">{order.totalBottles || 1}</td>
                        <td className="py-2.5 px-3 font-semibold text-white whitespace-nowrap">RM {order.totalPrice}</td>
                        <td className="py-2.5 px-3 text-[11px] text-[#A59283] max-w-[120px] truncate">{order.pickupStation.replace(' Hub', '')}</td>
                        <td className="py-2.5 px-3 text-cyan-400 whitespace-nowrap">{order.oilConsumedMl} ml</td>
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
          <span>Data saved locally in browser. Export CSV anytime to sync with Google Sheets.</span>
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
