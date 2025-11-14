import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Badge } from '../../common';
import { useCartStore } from '../../../store/useCartStore';
import { toast } from 'react-hot-toast';
import type { Product, CartItemType } from '../../../types';
import { env } from '../../../config/env';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedType, setSelectedType] = useState<CartItemType>(
    'equipo_mas_instalacion'
  );
  const quantity = 1;
  const addItem = useCartStore((state) => state.addItem);

  const installationPrice =
    product.installationPrice ||
    product.price * env.installation.extraPercent;

  const totalPrice =
    selectedType === 'equipo_mas_instalacion'
      ? product.price + installationPrice
      : product.price;

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
      type: selectedType,
      sku: product.sku,
    });

    toast.success(
      `${product.name} agregado al carrito${
        selectedType === 'equipo_mas_instalacion' ? ' con instalación' : ''
      }`,
      {
        duration: 3000,
        icon: '✅',
      }
    );
  };

  return (
    <motion.div
      className="card overflow-hidden h-full flex flex-col"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Imagen */}
      <Link to={`/producto/${product.slug}`} className="relative block flex-shrink-0">
        <div className="aspect-square overflow-hidden bg-bg-muted">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted">
              Sin imagen
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 z-10">
          <div className="flex flex-wrap gap-1.5">
            {product.onSale && (
              <Badge variant="warning" size="sm">
                OFERTA
              </Badge>
            )}
            {product.inverter && (
              <Badge variant="success" size="sm">
                <Zap className="w-3 h-3 mr-1" />
                INVERTER
              </Badge>
            )}
            {product.energyRating && (
              <Badge variant="primary" size="sm">
                {product.energyRating}
              </Badge>
            )}
          </div>
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Título y detalles - altura fija */}
        <div className="min-h-[100px]">
          <Link to={`/producto/${product.slug}`}>
            <h3 className="font-semibold text-text-primary hover:text-primary transition-colors line-clamp-2 min-h-[48px]">
              {product.name}
            </h3>
          </Link>

          {product.capacity && (
            <p className="text-sm text-text-muted mt-1">{product.capacity}</p>
          )}

          {/* Rating */}
          {product.ratingCount > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-medium">{product.averageRating}</span>
              <span className="text-xs text-text-muted">
                ({product.ratingCount})
              </span>
            </div>
          )}
        </div>

        {/* Selector de tipo - se empuja al fondo */}
        <div className="mt-auto space-y-2">
          <button
            onClick={() => setSelectedType('solo_equipo')}
            className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
              selectedType === 'solo_equipo'
                ? 'border-primary bg-accent-soft'
                : 'border-border-soft hover:border-primary/50'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Solo equipo</span>
              <span className="text-sm font-bold">
                ${product.price.toLocaleString('es-CL')}
              </span>
            </div>
          </button>

          <button
            onClick={() => setSelectedType('equipo_mas_instalacion')}
            className={`w-full p-3 rounded-lg border-2 text-left transition-all relative ${
              selectedType === 'equipo_mas_instalacion'
                ? 'border-primary bg-accent-soft'
                : 'border-border-soft hover:border-primary/50'
            }`}
          >
            <Badge
              variant="recommended"
              size="sm"
              className="absolute -top-2 right-2"
            >
              RECOMENDADO
            </Badge>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Equipo + instalación</span>
              <span className="text-sm font-bold">
                ${totalPrice.toLocaleString('es-CL')}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-1">
              Incluye instalación profesional y garantía extendida
            </p>
          </button>
        </div>

        {/* Botón agregar al carrito */}
        <Button
          variant="primary"
          fullWidth
          className="mt-3"
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
    </motion.div>
  );
};
