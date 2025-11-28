import { useQuery } from '@tanstack/react-query';
import { wooApi } from '../api/woocommerce';

interface PaymentGateway {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ['payment-methods'],
    queryFn: async (): Promise<PaymentGateway[]> => {
      const gateways = await wooApi.getPaymentGateways();

      // Solo devolver los métodos habilitados
      const enabledGateways = gateways.filter((gateway: any) => gateway.enabled);

      console.log('[usePaymentMethods] Enabled gateways:', enabledGateways);

      return enabledGateways;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos - los métodos no cambian frecuentemente
    retry: 2,
  });
};

export type { PaymentGateway };
