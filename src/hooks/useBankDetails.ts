import { useQuery } from '@tanstack/react-query';
import { env } from '../config/env';

interface BankDetails {
  bank_name: string;
  account_type: string;
  account_number: string;
  account_holder: string;
  rut: string;
  email: string;
  phone: string;
  instructions: string;
}

interface BankDetailsResponse {
  success: boolean;
  bank_details: BankDetails;
}

export const useBankDetails = () => {
  return useQuery({
    queryKey: ['bank-details'],
    queryFn: async (): Promise<BankDetails> => {
      const url = env.api.bankDetails;
      console.log('[useBankDetails] Fetching from:', url);

      try {
        const response = await fetch(url);

        console.log('[useBankDetails] Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[useBankDetails] Error response:', errorText);
          throw new Error(`Failed to fetch bank details: ${response.status}`);
        }

        const data: BankDetailsResponse = await response.json();
        console.log('[useBankDetails] Success:', data);
        return data.bank_details;
      } catch (error) {
        console.error('[useBankDetails] Error:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour - bank details don't change often
    retry: 2,
  });
};

export type { BankDetails };
