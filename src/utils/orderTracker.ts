export interface OrderItem {
  fragranceId: string;
  fragranceName: string;
  fullName: string;
  brand: string;
  size: '30ml' | '50ml' | '100ml';
  concentration: 5 | 10 | 15 | 20 | 25 | 30; // Custom oil concentration percentage
  price: number;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  timestamp: string;
  studentName: string;
  studentPhone: string;
  collegeHostel: string;
  items: OrderItem[];
  totalBottles: number;
  originalPrice: number;
  discountCode?: string;
  discountAmount?: number;
  totalPrice: number;
  pickupStation: string;
  notes: string;
  oilConsumedMl: number;
  alcoholConsumedMl: number;
  status: 'Pending' | 'Compounded' | 'Collected' | 'Ghosted';
}

export interface LabInventoryStock {
  initialBottles: number;
  initialAlcoholMl: number;
  initialOilMl: number;
  initialAtomizers: number;
}

const STORAGE_KEY = 'utm_fragrance_orders';
const STOCK_STORAGE_KEY = 'utm_lab_initial_stock';
const DEFAULT_BATCH_CAPACITY = 70; // Drop 01 default

export const DEFAULT_LAB_STOCK: LabInventoryStock = {
  initialBottles: 70,
  initialAlcoholMl: 2800, // 2.8 Liters of cosmetic perfumer alcohol
  initialOilMl: 700,       // 700 ml of pure European fragrance oils
  initialAtomizers: 70,
};

export function getLabStock(): LabInventoryStock {
  try {
    const raw = localStorage.getItem(STOCK_STORAGE_KEY);
    if (!raw) return DEFAULT_LAB_STOCK;
    return { ...DEFAULT_LAB_STOCK, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_LAB_STOCK;
  }
}

export function saveLabStock(stock: LabInventoryStock) {
  try {
    localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(stock));
  } catch (err) {
    console.error('Failed to save lab stock to localStorage', err);
  }
}

export function getStoredOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveMultiItemOrder(order: {
  studentName: string;
  studentPhone: string;
  collegeHostel?: string;
  items: OrderItem[];
  originalPrice?: number;
  discountCode?: string;
  discountAmount?: number;
  totalPrice: number;
  pickupStation: string;
  notes: string;
}): OrderRecord {
  const orders = getStoredOrders();

  let totalOilConsumed = 0;
  let totalAlcoholConsumed = 0;
  let totalBottles = 0;

  order.items.forEach(item => {
    const sizeMl = parseInt(item.size, 10); // 30, 50, 100
    const conc = item.concentration || 20; // 5, 10, 15, 20, 25, 30
    
    // Exact volumetric calculation
    const oilPerBottle = (sizeMl * conc) / 100;
    const alcoholPerBottle = (sizeMl * (100 - conc)) / 100;

    totalOilConsumed += oilPerBottle * item.quantity;
    totalAlcoholConsumed += alcoholPerBottle * item.quantity;
    totalBottles += item.quantity;
  });

  const newOrder: OrderRecord = {
    id: `UTM-B01-${String(orders.length + 1).padStart(3, '0')}`,
    timestamp: new Date().toISOString(),
    studentName: order.studentName,
    studentPhone: order.studentPhone,
    collegeHostel: order.collegeHostel || 'UTM Campus',
    items: order.items,
    totalBottles,
    originalPrice: order.originalPrice ?? order.totalPrice,
    discountCode: order.discountCode,
    discountAmount: order.discountAmount || 0,
    totalPrice: order.totalPrice,
    pickupStation: order.pickupStation,
    notes: order.notes,
    oilConsumedMl: Number(totalOilConsumed.toFixed(1)),
    alcoholConsumedMl: Number(totalAlcoholConsumed.toFixed(1)),
    status: 'Pending',
  };

  orders.unshift(newOrder);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
  }

  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderRecord['status']) {
  const orders = getStoredOrders();
  const updated = orders.map(o => (o.id === orderId ? { ...o, status } : o));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update order status', err);
  }
  return updated;
}

export function getOperationsSummary() {
  const orders = getStoredOrders();
  const labStock = getLabStock();

  // Filter out ghosted/cancelled orders from actual capacity count
  const activeOrders = orders.filter(o => o.status !== 'Ghosted');
  const totalBottlesSold = activeOrders.reduce((sum, o) => sum + (o.totalBottles || 1), 0);
  const totalGrossRevenue = activeOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalOilUsedMl = Number(activeOrders.reduce((sum, o) => sum + o.oilConsumedMl, 0).toFixed(1));
  const totalAlcoholUsedMl = Number(activeOrders.reduce((sum, o) => sum + o.alcoholConsumedMl, 0).toFixed(1));

  // Profit calculation from Master Playbook: ~65.9% Net Margin
  const estimatedNetProfit = Math.round(totalGrossRevenue * 0.659);
  
  // Real-time laboratory inventory balances
  const remainingBottles = Math.max(0, labStock.initialBottles - totalBottlesSold);
  const remainingAlcoholMl = Math.max(0, Number((labStock.initialAlcoholMl - totalAlcoholUsedMl).toFixed(1)));
  const remainingOilMl = Math.max(0, Number((labStock.initialOilMl - totalOilUsedMl).toFixed(1)));
  const remainingAtomizers = Math.max(0, labStock.initialAtomizers - totalBottlesSold);

  // Per-fragrance oil consumption breakdown
  const oilBreakdown: Record<string, number> = {};
  activeOrders.forEach(o => {
    if (o.items) {
      o.items.forEach(item => {
        const sizeMl = parseInt(item.size, 10);
        const conc = item.concentration || 20;
        const oilMl = (sizeMl * conc * item.quantity) / 100;
        const key = item.fullName || item.fragranceName;
        oilBreakdown[key] = Number(((oilBreakdown[key] || 0) + oilMl).toFixed(1));
      });
    }
  });

  return {
    totalOrders: orders.length,
    activeOrdersCount: activeOrders.length,
    totalBottlesSold,
    batchCapacity: labStock.initialBottles || DEFAULT_BATCH_CAPACITY,
    remainingDrop01Bottles: remainingBottles,
    totalGrossRevenue,
    estimatedNetProfit,
    totalOilUsedMl,
    totalAlcoholUsedMl,
    labStock,
    remainingBottles,
    remainingAlcoholMl,
    remainingOilMl,
    remainingAtomizers,
    oilBreakdown,
  };
}
