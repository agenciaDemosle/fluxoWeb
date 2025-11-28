import { useQuery } from '@tanstack/react-query';
import { env } from '../config/env';

interface InstallationCost {
  region_code: string;
  region_name: string;
  installation_cost: number;
}

interface InstallationCostsResponse {
  success: boolean;
  costs: Record<string, InstallationCost>;
}

export const useInstallationCosts = () => {
  return useQuery({
    queryKey: ['installation-costs'],
    queryFn: async (): Promise<InstallationCostsResponse> => {
      try {
        console.log('🔧 Fetching installation costs from:', env.api.installationCosts);
        const response = await fetch(env.api.installationCosts);
        console.log('📡 Installation costs response status:', response.status, response.ok);

        if (!response.ok) {
          console.warn('Installation costs API not available, using empty costs');
          return {
            success: true,
            costs: {}
          };
        }

        const data = await response.json();
        console.log('✅ Installation costs loaded:', data);
        return data;
      } catch (error) {
        console.warn('Installation costs API error, using empty costs:', error);
        return {
          success: true,
          costs: {}
        };
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 0,
  });
};

export type { InstallationCost, InstallationCostsResponse };
