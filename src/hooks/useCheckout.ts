import { useMutation } from '@tanstack/react-query';
import { useCartStore } from '../store/useCartStore';
import { wooApi } from '../api/woocommerce';
import { trackEvent } from '../utils/tracking';
import type { CheckoutFormData, CheckoutResult, WooOrderCreate } from '../types';

export const useCheckout = () => {
  const { items, grandTotal, subtotalInstalacion, clearCart } = useCartStore();

  const mutation = useMutation({
    mutationFn: async (formData: CheckoutFormData): Promise<CheckoutResult> => {
      if (items.length === 0) {
        throw new Error('El carrito está vacío');
      }

      const hasInstallation = subtotalInstalacion > 0;

      // Construir line_items para WooCommerce
      const lineItems = items.map((item) => ({
        product_id: item.productId,
        variation_id: item.variationId || undefined,
        quantity: item.quantity,
        subtotal: (item.lineBaseTotal + item.lineInstallationTotal).toFixed(0),
        total: item.lineGrandTotal.toFixed(0),
        meta_data: [
          { key: 'tipo_compra', value: item.type },
          { key: 'precio_equipo_unitario', value: item.basePrice },
          {
            key: 'precio_instalacion_unitario',
            value: item.installationPrice || 0,
          },
          { key: 'subtotal_equipo', value: item.lineBaseTotal },
          { key: 'subtotal_instalacion', value: item.lineInstallationTotal },
        ],
      }));

      // Construir datos de billing y shipping
      const billingShipping = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        company: '',
        address_1: `${formData.address}${
          formData.addressNumber ? ' ' + formData.addressNumber : ''
        }`,
        address_2: formData.apartment || '',
        city: formData.city,
        state: formData.region,
        postcode: formData.postalCode || '',
        country: 'CL',
        email: formData.email,
        phone: formData.phone,
      };

      // Construir payload para crear orden
      const orderPayload: WooOrderCreate = {
        payment_method: 'bacs',
        payment_method_title: 'Transferencia / Pago por confirmar',
        set_paid: false,
        billing: billingShipping,
        shipping: billingShipping,
        line_items: lineItems,
        meta_data: [
          { key: 'installation_required', value: hasInstallation ? 'yes' : 'no' },
          {
            key: 'installation_preferred_day',
            value: formData.installationPreferredDay || '',
          },
          {
            key: 'installation_preferred_time',
            value: formData.installationPreferredTime || '',
          },
          {
            key: 'installation_notes',
            value: formData.installationNotes || '',
          },
          { key: 'customer_rut', value: formData.rut || '' },
          { key: 'commune', value: formData.commune },
        ],
      };

      try {
        const order = await wooApi.createOrder(orderPayload);

        // Track purchase event
        trackEvent({
          name: 'purchase',
          payload: {
            orderId: order.id,
            grandTotal,
            hasInstallation,
          },
        });

        // Limpiar carrito
        clearCart();

        return {
          success: true,
          orderId: order.id,
          orderNumber: order.number,
          hasInstallation,
          grandTotal,
        };
      } catch (error: any) {
        console.error('[Checkout] Error creating order:', error);
        return {
          success: false,
          hasInstallation,
          grandTotal,
          error: error.message || 'Error al crear el pedido',
        };
      }
    },
  });

  return mutation;
};
