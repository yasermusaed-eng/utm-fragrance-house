export interface OrderRecord {
  id: string;
  timestamp: string;
  studentName: string;
  fragranceId: string;
  fragranceName: string;
  brand: string;
  size: '30ml' | '50ml' | '100ml';
  quantity: number;
  totalPrice: number;
  pickupStation: string;
  notes: string;
  oilConsumedMl: number;
  alcoholConsumedMl: number;
  status: 'Pending' | 'Compounded' | 'Collected';
}

const STORAGE_KEY = 'utm_fragrance_orders';
const BATCH_CAPACITY = 70; // Drop 01 capacity

export function getStoredOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveOrder(order: Omit<OrderRecord, 'id' | 'timestamp' | 'oilConsumedMl' | 'alcoholConsumedMl' | 'status'>): OrderRecord {
  const orders = getStoredOrders();
  
  // Calculate resources: 20% EDP formulation
  let oilPerBottle = 10; // 50ml default
  let alcoholPerBottle = 40;
  if (order.size === '30ml') {
    oilPerBottle = 6;
    alcoholPerBottle = 24;
  } else if (order.size === '100ml') {
    oilPerBottle = 20;
    alcoholPerBottle = 80;
  }

  const newOrder: OrderRecord = {
    ...order,
    id: `UTM-B01-${String(orders.length + 1).padStart(3, '0')}`,
    timestamp: new Date().toISOString(),
    oilConsumedMl: oilPerBottle * order.quantity,
    alcoholConsumedMl: alcoholPerBottle * order.quantity,
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

export function getOperationsSummary() {
  const orders = getStoredOrders();
  const totalBottlesSold = orders.reduce((sum, o) => sum + o.quantity, 0);
  const totalGrossRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalOilUsedMl = orders.reduce((sum, o) => sum + o.oilConsumedMl, 0);
  const totalAlcoholUsedMl = orders.reduce((sum, o) => sum + o.alcoholConsumedMl, 0);

  // Profit calculation from Master Playbook: ~65.9% Net Margin
  const estimatedNetProfit = Math.round(totalGrossRevenue * 0.659);

  const remainingDrop01Bottles = Math.max(0, BATCH_CAPACITY - totalBottlesSold);

  return {
    totalOrders: orders.length,
    totalBottlesSold,
    remainingDrop01Bottles,
    batchCapacity: BATCH_CAPACITY,
    totalGrossRevenue,
    estimatedNetProfit,
    totalOilUsedMl,
    totalAlcoholUsedMl,
  };
}
