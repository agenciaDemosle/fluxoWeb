export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  type: 'simple' | 'grouped' | 'external' | 'variable';
  status: 'draft' | 'pending' | 'private' | 'publish';
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  images: Array<{
    id: number;
    date_created: string;
    date_modified: string;
    src: string;
    name: string;
    alt: string;
  }>;
  attributes: Array<{
    id: number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
  }>;
  default_attributes: any[];
  variations: number[];
  grouped_products: any[];
  menu_order: number;
  meta_data: Array<{
    id: number;
    key: string;
    value: any;
  }>;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: {
    id: number;
    src: string;
    name: string;
    alt: string;
  } | null;
  menu_order: number;
  count: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  regularPrice: number;
  salePrice?: number;
  onSale: boolean;
  imageUrl?: string;
  images: string[];
  sku: string;
  stockStatus: 'instock' | 'outofstock' | 'onbackorder';
  inStock: boolean;
  categories: Array<{ id: number; name: string; slug: string }>;
  attributes: Array<{
    name: string;
    options: string[];
  }>;
  capacity?: string; // Ej: "12000 BTU", "1.5 Toneladas"
  energyRating?: string; // Ej: "A++", "A+", "A"
  inverter?: boolean;
  installationPrice?: number; // Precio adicional por instalación
  featured: boolean;
  averageRating: string;
  ratingCount: number;
}

export const mapWooProductToProduct = (wooProduct: WooProduct): Product => {
  // Buscar precio de instalación en meta_data
  const installationPriceMeta = wooProduct.meta_data.find(
    (meta) => meta.key === 'installation_price' || meta.key === '_installation_price'
  );

  // Buscar atributos personalizados
  const capacityMeta = wooProduct.meta_data.find(
    (meta) => meta.key === 'capacity' || meta.key === '_capacity'
  );
  const energyRatingMeta = wooProduct.meta_data.find(
    (meta) => meta.key === 'energy_rating' || meta.key === '_energy_rating'
  );
  const inverterMeta = wooProduct.meta_data.find(
    (meta) => meta.key === 'inverter' || meta.key === '_inverter'
  );

  return {
    id: wooProduct.id,
    name: wooProduct.name,
    slug: wooProduct.slug,
    description: wooProduct.description,
    shortDescription: wooProduct.short_description,
    price: parseFloat(wooProduct.price) || 0,
    regularPrice: parseFloat(wooProduct.regular_price) || 0,
    salePrice: wooProduct.sale_price ? parseFloat(wooProduct.sale_price) : undefined,
    onSale: wooProduct.on_sale,
    imageUrl: wooProduct.images[0]?.src,
    images: wooProduct.images.map((img) => img.src),
    sku: wooProduct.sku,
    stockStatus: wooProduct.stock_status,
    inStock: wooProduct.stock_status === 'instock',
    categories: wooProduct.categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })),
    attributes: wooProduct.attributes.map((attr) => ({
      name: attr.name,
      options: attr.options,
    })),
    capacity: capacityMeta?.value,
    energyRating: energyRatingMeta?.value,
    inverter: inverterMeta?.value === 'yes' || inverterMeta?.value === true,
    installationPrice: installationPriceMeta?.value
      ? parseFloat(installationPriceMeta.value)
      : undefined,
    featured: wooProduct.featured,
    averageRating: wooProduct.average_rating,
    ratingCount: wooProduct.rating_count,
  };
};
