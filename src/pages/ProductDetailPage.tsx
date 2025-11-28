import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Check, Package, Shield, Truck, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button, Badge, Spinner } from '../components/common';
import { useProductBySlug } from '../hooks';
import { useCartStore } from '../store/useCartStore';
import { toast } from 'react-hot-toast';
import { env } from '../config/env';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProductBySlug(slug || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return (
      <Layout title="Cargando...">
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" text="Cargando producto..." />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title="Producto no encontrado">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-h1 font-bold mb-4">Producto no encontrado</h1>
            <Link to="/productos">
              <Button>Ver todos los productos</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const installationPrice =
    product.installationPrice || product.price * env.installation.extraPercent;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      imageUrl: product.imageUrl,
      quantity: 1,
      basePrice: product.price,
      installationPrice,
      type: 'solo_equipo', // Siempre agregar solo el equipo
      sku: product.sku,
    });

    toast.success('Producto agregado al carrito', {
      icon: '✅',
      duration: 3000,
    });
  };

  return (
    <Layout
      title={product.name}
      description={product.shortDescription}
      image={product.imageUrl}
      type="product"
    >
      <section className="py-8 bg-white">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
            <Link to="/" className="hover:text-primary">Inicio</Link>
            <span>/</span>
            <Link to="/productos" className="hover:text-primary">Productos</Link>
            <span>/</span>
            <span className="text-text-primary">{product.name}</span>
          </div>

          {/* Back button */}
          <Link to="/productos" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            Volver a productos
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Imágenes */}
            <div>
              <div className="aspect-square rounded-card-lg overflow-hidden bg-bg-muted mb-4 flex items-center justify-center">
                <img
                  src={product.images[selectedImage] || product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === idx ? 'border-primary' : 'border-border-soft'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.onSale && <Badge variant="warning">OFERTA</Badge>}
                {product.inverter && <Badge variant="success">INVERTER</Badge>}
                {product.energyRating && <Badge variant="primary">{product.energyRating}</Badge>}
              </div>

              <h1 className="text-h1 font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              {product.ratingCount > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(parseFloat(product.averageRating))
                            ? 'fill-warning text-warning'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-muted">
                    {product.averageRating} ({product.ratingCount} reseñas)
                  </span>
                </div>
              )}

              {/* Short description */}
              <p className="text-lg text-text-muted mb-6">{product.shortDescription}</p>

              {/* Precio */}
              <div className="mb-6">
                <div className="bg-bg-muted rounded-lg p-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm text-text-muted">Precio del equipo</span>
                    <span className="text-3xl font-bold text-primary">${product.price.toLocaleString('es-CL')}</span>
                  </div>
                  <p className="text-sm text-text-muted mb-4">
                    + Instalación profesional disponible en el checkout
                  </p>
                  <div className="flex flex-col gap-2 text-sm text-success">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Instalación certificada disponible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Mantienes garantía del fabricante</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Agenda día y horario en el checkout</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to cart */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                className="mb-6"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al carrito
              </Button>

              {/* Beneficios */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-bg-muted rounded-lg mb-6">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  <span className="text-sm">Envío gratis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm">Garantía oficial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-sm">Despacho 24-48hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm">Stock disponible</span>
                </div>
              </div>

              {/* Specs */}
              <div className="border-t border-border-soft pt-6">
                <h3 className="font-semibold mb-4">Especificaciones técnicas</h3>
                <dl className="space-y-2">
                  {product.capacity && (
                    <div className="flex justify-between">
                      <dt className="text-text-muted">Capacidad</dt>
                      <dd className="font-medium">{product.capacity}</dd>
                    </div>
                  )}
                  {product.energyRating && (
                    <div className="flex justify-between">
                      <dt className="text-text-muted">Eficiencia energética</dt>
                      <dd className="font-medium">{product.energyRating}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-text-muted">Tecnología</dt>
                    <dd className="font-medium">{product.inverter ? 'Inverter' : 'Convencional'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-muted">SKU</dt>
                    <dd className="font-medium">{product.sku}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12 max-w-4xl">
            <h2 className="text-h2 font-semibold mb-4">Descripción</h2>
            <p className="text-text-muted leading-relaxed">{product.description}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};
