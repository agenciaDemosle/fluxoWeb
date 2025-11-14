import axios from 'axios';
import type {
  WooProduct,
  WooCategory,
  WooOrder,
  WooOrderCreate,
} from '../types';
import { mapWooProductToProduct } from '../types';

const WOO_URL = import.meta.env.VITE_WOO_URL;
const CONSUMER_KEY = import.meta.env.VITE_WOO_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_WOO_CONSUMER_SECRET;

export class WooCommerceAPI {
  private baseURL: string;
  private consumerKey: string;
  private consumerSecret: string;

  constructor() {
    this.baseURL = `${WOO_URL}/wp-json/wc/v3`;
    this.consumerKey = CONSUMER_KEY;
    this.consumerSecret = CONSUMER_SECRET;
  }

  /**
   * Construye la URL con autenticación por query parameters
   */
  private buildAuthURL(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(`${this.baseURL}${endpoint}`);
    url.searchParams.append('consumer_key', this.consumerKey);
    url.searchParams.append('consumer_secret', this.consumerSecret);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Realiza una petición GET
   */
  private async get<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const url = this.buildAuthURL(endpoint, params);
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error) {
      console.error(`[WooAPI] GET ${endpoint} error:`, error);
      throw error;
    }
  }

  /**
   * Realiza una petición POST
   */
  private async post<T>(
    endpoint: string,
    data: any,
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const url = this.buildAuthURL(endpoint, params);
      const response = await axios.post<T>(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`[WooAPI] POST ${endpoint} error:`, error);
      throw error;
    }
  }

  /**
   * Realiza una petición PUT
   */
  private async put<T>(
    endpoint: string,
    data: any,
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const url = this.buildAuthURL(endpoint, params);
      const response = await axios.put<T>(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`[WooAPI] PUT ${endpoint} error:`, error);
      throw error;
    }
  }

  // ==================== PRODUCTOS ====================

  /**
   * Obtiene todos los productos
   */
  async getProducts(params?: {
    per_page?: number;
    page?: number;
    search?: string;
    category?: number;
    featured?: boolean;
    on_sale?: boolean;
    status?: 'draft' | 'pending' | 'private' | 'publish';
    orderby?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'price' | 'popularity' | 'rating';
    order?: 'asc' | 'desc';
  }): Promise<WooProduct[]> {
    return this.get<WooProduct[]>('/products', params);
  }

  /**
   * Obtiene un producto por ID
   */
  async getProduct(id: number): Promise<WooProduct> {
    return this.get<WooProduct>(`/products/${id}`);
  }

  /**
   * Obtiene un producto por slug
   */
  async getProductBySlug(slug: string): Promise<WooProduct | null> {
    const products = await this.get<WooProduct[]>('/products', {
      slug,
      per_page: 1,
    });
    return products.length > 0 ? products[0] : null;
  }

  // ==================== CATEGORÍAS ====================

  /**
   * Obtiene todas las categorías
   */
  async getCategories(params?: {
    per_page?: number;
    page?: number;
    search?: string;
    parent?: number;
    hide_empty?: boolean;
  }): Promise<WooCategory[]> {
    return this.get<WooCategory[]>('/products/categories', params);
  }

  /**
   * Obtiene una categoría por ID
   */
  async getCategory(id: number): Promise<WooCategory> {
    return this.get<WooCategory>(`/products/categories/${id}`);
  }

  // ==================== PEDIDOS ====================

  /**
   * Crea un nuevo pedido
   */
  async createOrder(orderData: WooOrderCreate): Promise<WooOrder> {
    return this.post<WooOrder>('/orders', orderData);
  }

  /**
   * Obtiene un pedido por ID
   */
  async getOrder(id: number): Promise<WooOrder> {
    return this.get<WooOrder>(`/orders/${id}`);
  }

  /**
   * Actualiza un pedido
   */
  async updateOrder(
    id: number,
    data: Partial<WooOrderCreate>
  ): Promise<WooOrder> {
    return this.put<WooOrder>(`/orders/${id}`, data);
  }

  // ==================== CLIENTES ====================

  /**
   * Crea un nuevo cliente
   */
  async createCustomer(customerData: {
    email: string;
    first_name: string;
    last_name: string;
    username?: string;
    password?: string;
    billing?: any;
    shipping?: any;
  }): Promise<any> {
    return this.post('/customers', customerData);
  }

  /**
   * Obtiene un cliente por ID
   */
  async getCustomer(id: number): Promise<any> {
    return this.get(`/customers/${id}`);
  }

  // ==================== MÉTODOS DE PAGO ====================

  /**
   * Obtiene los métodos de pago disponibles
   */
  async getPaymentGateways(): Promise<any[]> {
    return this.get('/payment_gateways');
  }
}

// Instancia singleton
export const wooApi = new WooCommerceAPI();

// Mapper para importar en componentes
export { mapWooProductToProduct };
