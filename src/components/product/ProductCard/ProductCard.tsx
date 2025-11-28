import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Badge } from '../../common';
import { useCartStore } from '../../../store/useCartStore';
import { toast } from 'react-hot-toast';
import type { Product } from '../../../types';
import { env } from '../../../config/env';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const quantity = 1;
  const addItem = useCartStore((state) => state.addItem);

  const installationPrice =
    product.installationPrice ||
    product.price * env.installation.extraPercent;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      imageUrl: product.imageUrl,
      quantity,
      basePrice: product.price,
      installationPrice,
      type: 'solo_equipo', // Default a solo equipo
      sku: product.sku,
    });

    toast.success(
      `${product.name} agregado al carrito`,
      {
        duration: 3000,
        icon: '✅',
      }
    );
  };

  return (
    <motion.div
      className="bg-white rounded-card-lg overflow-hidden h-full flex flex-col group shadow-soft hover:shadow-soft-md transition-all duration-200"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Imagen */}
      <Link to={`/producto/${product.slug}`} className="relative block flex-shrink-0">
        <div className="aspect-square overflow-hidden bg-bg-muted flex items-center justify-center p-6">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted">
              Sin imagen
            </div>
          )}
        </div>

        {/* Badges - Distribuidos izquierda y derecha */}
        {product.onSale && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="warning" size="sm" className="rounded-pill">
              OFERTA
            </Badge>
          </div>
        )}
        {product.inverter && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="success" size="sm" className="rounded-pill">
              <Zap className="w-3 h-3 mr-1" />
              INVERTER
            </Badge>
          </div>
        )}
      </Link>

      {/* Contenido */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Título y detalles */}
        <Link to={`/producto/${product.slug}`}>
          <h3 className="font-semibold text-lg text-text-primary hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {product.capacity && (
          <p className="text-sm text-text-muted mb-3">{product.capacity}</p>
        )}

        {/* Rating */}
        {product.ratingCount > 0 && (
          <div className="flex items-center gap-1 mb-4">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="text-sm font-medium text-text-primary">{product.averageRating}</span>
            <span className="text-xs text-text-light">
              ({product.ratingCount})
            </span>
          </div>
        )}

        {/* Precio - se empuja al fondo */}
        <div className="mt-auto">
          <div className="mb-4">
            <p className="text-sm text-text-muted mb-1">Precio del equipo</p>
            <p className="text-2xl font-bold text-text-primary">
              ${product.price.toLocaleString('es-CL')}
            </p>
            <p className="text-xs text-text-light mt-1">
              + Instalación profesional a cotizar
            </p>
          </div>

          {/* Botón agregar al carrito */}
          <Button
            variant="primary"
            fullWidth
            className="rounded-pill"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Agregar al carrito
              </>
            ) : (
              'Agotado'
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
