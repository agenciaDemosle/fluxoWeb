export interface WooOrderLineItem {
  product_id: number;
  variation_id?: number;
  quantity: number;
  subtotal: string;
  total: string;
  meta_data?: Array<{
    key: string;
    value: any;
  }>;
}

export interface WooBillingShipping {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode?: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface WooOrderCreate {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: WooBillingShipping;
  shipping: WooBillingShipping;
  line_items: WooOrderLineItem[];
  fee_lines?: Array<{
    name: string;
    total: string;
    tax_status?: string;
  }>;
  meta_data?: Array<{
    key: string;
    value: any;
  }>;
}

export interface WooOrder extends WooOrderCreate {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  version: string;
  status: string;
  currency: string;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  date_completed: string | null;
  date_paid: string | null;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rut?: string;
  address: string;
  addressNumber?: string;
  apartment?: string;
  commune: string;
  city: string;
  region: string;
  postalCode?: string;

  // Método de pago (dinámico desde WooCommerce)
  paymentMethod: string;

  // Instalación
  wantsInstallation?: boolean;
  installationPreferredDay?: string;
  installationPreferredTime?: string;
  installationNotes?: string;
}

export interface CheckoutResult {
  success: boolean;
  orderId?: number;
  orderNumber?: string;
  hasInstallation: boolean;
  grandTotal: number;
  paymentUrl?: string; // URL de Flow para redirigir al pago
  error?: string;
}
