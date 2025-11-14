export type CartItemType =
  | 'solo_equipo'
  | 'equipo_mas_instalacion';

export interface CartItem {
  id: string; // productId o productId-variationId
  productId: number;
  variationId?: number | null;
  name: string;
  slug: string;
  imageUrl?: string;
  quantity: number;

  // Precios
  basePrice: number; // precio solo equipo
  installationPrice?: number; // costo adicional instalación
  type: CartItemType;

  // Totales calculados
  lineBaseTotal: number; // basePrice * quantity
  lineInstallationTotal: number; // installationPrice * quantity si equipo_mas_instalacion
  lineGrandTotal: number; // suma de ambos

  // Meta Woo
  sku?: string;
  attributes?: Array<{ name: string; option: string }>;
}

export interface CartState {
  items: CartItem[];
  currency: 'CLP';

  subtotalEquipos: number;
  subtotalInstalacion: number;
  grandTotal: number;
}

export interface CartStore extends CartState {
  addItem: (
    item: Omit<
      CartItem,
      'lineBaseTotal' | 'lineInstallationTotal' | 'lineGrandTotal'
    >
  ) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleType: (id: string, type: CartItemType) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  recalcTotals: () => void;
}

export const calculateItemTotals = (item: Omit<CartItem, 'lineBaseTotal' | 'lineInstallationTotal' | 'lineGrandTotal'>): CartItem => {
  const lineBaseTotal = item.basePrice * item.quantity;
  const lineInstallationTotal =
    item.type === 'equipo_mas_instalacion' && item.installationPrice
      ? item.installationPrice * item.quantity
      : 0;
  const lineGrandTotal = lineBaseTotal + lineInstallationTotal;

  return {
    ...item,
    lineBaseTotal,
    lineInstallationTotal,
    lineGrandTotal,
  };
};

export const calculateCartTotals = (items: CartItem[]): {
  subtotalEquipos: number;
  subtotalInstalacion: number;
  grandTotal: number;
} => {
  const subtotalEquipos = items.reduce((sum, item) => sum + item.lineBaseTotal, 0);
  const subtotalInstalacion = items.reduce(
    (sum, item) => sum + item.lineInstallationTotal,
    0
  );
  const grandTotal = subtotalEquipos + subtotalInstalacion;

  return {
    subtotalEquipos,
    subtotalInstalacion,
    grandTotal,
  };
};
