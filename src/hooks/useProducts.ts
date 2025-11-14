import { useQuery } from '@tanstack/react-query';
import { wooApi, mapWooProductToProduct } from '../api/woocommerce';
import { getFilteredProducts } from '../data/mockProducts';

// Flag para usar productos mock (cambiar a false para usar WooCommerce real)
const USE_MOCK_DATA = true;

export const useProducts = (params?: {
  per_page?: number;
  page?: number;
  search?: string;
  category?: number;
  featured?: boolean;
  on_sale?: boolean;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        // Usar datos mock
        return getFilteredProducts({
          featured: params?.featured,
          on_sale: params?.on_sale,
          category: params?.category,
          limit: params?.per_page,
        });
      } else {
        // Usar WooCommerce real
        const wooProducts = await wooApi.getProducts(params);
        return wooProducts.map(mapWooProductToProduct);
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        const { getProductById } = await import('../data/mockProducts');
        return getProductById(id);
      } else {
        const wooProduct = await wooApi.getProduct(id);
        return mapWooProductToProduct(wooProduct);
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', 'slug', slug],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        const { getProductBySlug } = await import('../data/mockProducts');
        return getProductBySlug(slug);
      } else {
        const wooProduct = await wooApi.getProductBySlug(slug);
        return wooProduct ? mapWooProductToProduct(wooProduct) : null;
      }
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useFeaturedProducts = (limit = 8) => {
  return useProducts({
    featured: true,
    per_page: limit,
  });
};

export const useOnSaleProducts = (limit = 8) => {
  return useProducts({
    on_sale: true,
    per_page: limit,
  });
};
