import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  CartItem,
  CartStore,
} from '../types';
import { calculateCartTotals } from '../types';
import { trackEvent } from '../utils/tracking';
import { env } from '../config/env';

const INSTALLATION_EXTRA_PERCENT = env.installation.extraPercent;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      items: [],
      currency: 'CLP',
      subtotalEquipos: 0,
      subtotalInstalacion: 0,
      grandTotal: 0,

      /**
       * Recalcula totales de todos los items y del carrito
       */
      recalcTotals: () => {
        const items = get().items.map((item) => {
          // Asegurar que installationPrice existe
          const installationPrice =
            item.installationPrice ||
            item.basePrice * INSTALLATION_EXTRA_PERCENT;

          const lineBaseTotal = item.basePrice * item.quantity;
          const lineInstallationTotal =
            item.type === 'equipo_mas_instalacion'
              ? installationPrice * item.quantity
              : 0;
          const lineGrandTotal = lineBaseTotal + lineInstallationTotal;

          return {
            ...item,
            installationPrice,
            lineBaseTotal,
            lineInstallationTotal,
            lineGrandTotal,
          };
        });

        const totals = calculateCartTotals(items);

        set({
          items,
          ...totals,
        });
      },

      /**
       * Agrega un item al carrito
       */
      addItem: (newItem) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) => item.id === newItem.id
        );

        // Si installationPrice no existe, calcularlo
        const installationPrice =
          newItem.installationPrice ||
          newItem.basePrice * INSTALLATION_EXTRA_PERCENT;

        if (existingItemIndex >= 0) {
          // El item ya existe, actualizar cantidad
          const updatedItems = [...items];
          const existingItem = updatedItems[existingItemIndex];
          const newQuantity = existingItem.quantity + newItem.quantity;

          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
            lineBaseTotal: existingItem.basePrice * newQuantity,
            lineInstallationTotal:
              existingItem.type === 'equipo_mas_instalacion'
                ? (existingItem.installationPrice || installationPrice) *
                  newQuantity
                : 0,
            lineGrandTotal: 0, // Se recalculará
          };

          set({ items: updatedItems });
        } else {
          // Agregar nuevo item
          const itemWithTotals: CartItem = {
            ...newItem,
            installationPrice,
            lineBaseTotal: newItem.basePrice * newItem.quantity,
            lineInstallationTotal:
              newItem.type === 'equipo_mas_instalacion'
                ? installationPrice * newItem.quantity
                : 0,
            lineGrandTotal: 0, // Se recalculará
          };

          set({ items: [...items, itemWithTotals] });
        }

        // Recalcular totales
        get().recalcTotals();

        // Track event
        trackEvent({
          name: 'add_to_cart',
          payload: {
            productId: newItem.productId,
            type: newItem.type,
            price: newItem.basePrice,
            quantity: newItem.quantity,
          },
        });
      },

      /**
       * Actualiza la cantidad de un item
       */
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const items = get().items;
        const updatedItems = items.map((item) => {
          if (item.id !== id) return item;

          const installationPrice =
            item.installationPrice ||
            item.basePrice * INSTALLATION_EXTRA_PERCENT;

          return {
            ...item,
            quantity,
            lineBaseTotal: item.basePrice * quantity,
            lineInstallationTotal:
              item.type === 'equipo_mas_instalacion'
                ? installationPrice * quantity
                : 0,
            lineGrandTotal: 0, // Se recalculará
          };
        });

        set({ items: updatedItems });
        get().recalcTotals();
      },

      /**
       * Cambia el tipo de compra de un item (solo equipo vs equipo + instalación)
       */
      toggleType: (id, type) => {
        const items = get().items;
        const updatedItems = items.map((item) => {
          if (item.id !== id) return item;

          const installationPrice =
            item.installationPrice ||
            item.basePrice * INSTALLATION_EXTRA_PERCENT;

          const lineInstallationTotal =
            type === 'equipo_mas_instalacion'
              ? installationPrice * item.quantity
              : 0;

          return {
            ...item,
            type,
            installationPrice,
            lineInstallationTotal,
            lineGrandTotal: 0, // Se recalculará
          };
        });

        set({ items: updatedItems });
        get().recalcTotals();
      },

      /**
       * Elimina un item del carrito
       */
      removeItem: (id) => {
        const items = get().items;
        const item = items.find((i) => i.id === id);

        if (item) {
          trackEvent({
            name: 'remove_from_cart',
            payload: {
              productId: item.productId,
            },
          });
        }

        const updatedItems = items.filter((item) => item.id !== id);
        set({ items: updatedItems });
        get().recalcTotals();
      },

      /**
       * Limpia el carrito
       */
      clearCart: () => {
        set({
          items: [],
          subtotalEquipos: 0,
          subtotalInstalacion: 0,
          grandTotal: 0,
        });
      },
    }),
    {
      name: 'fluxo-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
