import { useMutation } from '@tanstack/react-query';
import { useCartStore } from '../store/useCartStore';
import { wooApi } from '../api/woocommerce';
import { trackEvent } from '../utils/tracking';
import { env } from '../config/env';
import type { CheckoutFormData, CheckoutResult, WooOrderCreate } from '../types';

export const useCheckout = () => {
  const { items, grandTotal, clearCart } = useCartStore();

  const mutation = useMutation({
    mutationFn: async (formData: CheckoutFormData & { installationCost?: number; shippingCost?: number }): Promise<CheckoutResult> => {
      if (items.length === 0) {
        throw new Error('El carrito está vacío');
      }

      const hasInstallation = (formData.wantsInstallation && formData.installationCost && formData.installationCost > 0) || false;
      const installationCost = hasInstallation ? formData.installationCost! : 0;
      const shippingCost = formData.shippingCost || 0;

      // Construir line_items para WooCommerce (solo productos)
      const lineItems = items.map((item) => ({
        product_id: item.productId,
        variation_id: item.variationId || undefined,
        quantity: item.quantity,
        subtotal: item.lineBaseTotal.toFixed(0),
        total: item.lineGrandTotal.toFixed(0),
        meta_data: [
          { key: 'tipo_compra', value: 'solo_equipo' },
          { key: 'precio_equipo_unitario', value: item.basePrice },
          { key: 'subtotal_equipo', value: item.lineBaseTotal },
        ],
      }));

      // Construir fee_lines (cargos adicionales)
      const fee_lines = [];

      // Agregar envío como fee si hay costo
      if (shippingCost > 0) {
        fee_lines.push({
          name: 'Envío',
          total: shippingCost.toFixed(0),
          tax_status: 'none',
        });
      }

      // Agregar instalación como fee si fue seleccionada
      if (hasInstallation) {
        fee_lines.push({
          name: 'Instalación Profesional',
          total: installationCost.toFixed(0),
          tax_status: 'none',
        });
      }

      // Construir datos de billing y shipping
      // En Chile: city = comuna, state = región
      const billingShipping = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        company: '',
        address_1: `${formData.address}${
          formData.addressNumber ? ' ' + formData.addressNumber : ''
        }`,
        address_2: formData.apartment || '',
        city: formData.commune, // La comuna va en city
        state: formData.region,
        postcode: formData.postalCode || '',
        country: 'CL',
        email: formData.email,
        phone: formData.phone,
      };

      // Determinar título del método de pago
      const paymentMethodConfig = {
        payment_method: formData.paymentMethod,
        payment_method_title: formData.paymentMethod, // WooCommerce usa el ID si no se provee título
      };

      // Construir payload para crear orden
      const orderPayload: WooOrderCreate = {
        ...paymentMethodConfig,
        set_paid: false,
        billing: billingShipping,
        shipping: billingShipping,
        line_items: lineItems,
        fee_lines,
        meta_data: [
          { key: 'installation_required', value: hasInstallation ? 'yes' : 'no' },
          { key: 'installation_cost', value: installationCost },
          { key: 'shipping_cost', value: shippingCost },
          { key: 'customer_rut', value: formData.rut || '' },
          { key: 'commune', value: formData.commune },
          { key: 'city_detail', value: formData.city || '' },
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

        // Si es Flow, llamar al bridge para obtener URL de pago
        // Flow puede ser 'flow' o 'flowpayment' dependiendo del plugin
        if (formData.paymentMethod === 'flow' || formData.paymentMethod === 'flowpayment') {
          try {
            const flowResponse = await fetch(env.api.flowBridge, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: order.id,
              }),
            });

            const flowData = await flowResponse.json();

            if (flowData.success && flowData.url) {
              // NO limpiar carrito aún - se limpia cuando Flow confirma el pago
              return {
                success: true,
                orderId: order.id,
                orderNumber: order.number,
                hasInstallation,
                grandTotal,
                paymentUrl: flowData.url,
              };
            } else {
              throw new Error(flowData.error || 'Error al iniciar pago Flow');
            }
          } catch (flowError: any) {
            console.error('[Checkout] Error calling Flow bridge:', flowError);
            return {
              success: false,
              hasInstallation,
              grandTotal,
              error: `Pedido creado pero error al procesar pago: ${flowError.message}`,
            };
          }
        }

        // Para transferencia bancaria, limpiar carrito inmediatamente
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
