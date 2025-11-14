import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Trash2, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Badge } from '../../common';
import { useCartStore } from '../../../store/useCartStore';
import type { CartItem } from '../../../types';

export interface SmartCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 p-4 border-b border-border-soft">
      {/* Imagen */}
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-bg-muted flex-shrink-0">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">
            Sin imagen
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-text-primary line-clamp-2">
          {item.name}
        </h4>

        {/* Badge tipo */}
        <div className="mt-2">
          {item.type === 'equipo_mas_instalacion' ? (
            <Badge variant="success" size="sm">
              Con instalación
            </Badge>
          ) : (
            <Badge variant="default" size="sm">
              Solo equipo
            </Badge>
          )}
        </div>

        {/* Controles de cantidad */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-border-soft rounded-lg">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 hover:bg-bg-muted transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-3 text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 hover:bg-bg-muted transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Precio */}
        <div className="mt-2 text-sm font-bold text-primary">
          ${item.lineGrandTotal.toLocaleString('es-CL')}
        </div>
      </div>
    </div>
  );
};

export const SmartCartDrawer: React.FC<SmartCartDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { items, subtotalEquipos, subtotalInstalacion, grandTotal } =
    useCartStore();

  const hasInstallation = subtotalInstalacion > 0;

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-[100]"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-white shadow-soft-lg z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-soft">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="text-h3 font-semibold text-text-primary">
                  Tu carrito
                </h2>
                {items.length > 0 && (
                  <Badge variant="primary" size="sm">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <ShoppingCart className="w-16 h-16 text-text-muted mb-4" />
                <p className="text-text-muted mb-6">
                  Tu carrito está vacío
                </p>
                <Button onClick={onClose}>Ir a comprar</Button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}

                  {/* Bloque destacado instalación */}
                  {hasInstallation && (
                    <div className="m-4 p-4 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-success mb-2">
                            Instalación profesional incluida
                          </h4>
                          <ul className="text-sm text-text-muted space-y-1">
                            <li>✓ Mantienes garantía del fabricante</li>
                            <li>✓ Instalación segura y certificada</li>
                            <li>✓ Agendamos día y horario contigo</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer con totales */}
                <div className="border-t border-border-soft p-6 bg-bg-muted">
                  {/* Subtotales */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Subtotal equipos</span>
                      <span className="font-medium">
                        ${subtotalEquipos.toLocaleString('es-CL')}
                      </span>
                    </div>
                    {subtotalInstalacion > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">
                          Subtotal instalación
                        </span>
                        <span className="font-medium text-success">
                          ${subtotalInstalacion.toLocaleString('es-CL')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-4 border-t border-border-soft mb-4">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-h3 font-bold text-primary">
                      ${grandTotal.toLocaleString('es-CL')} CLP
                    </span>
                  </div>

                  {/* Botones */}
                  <div className="space-y-2">
                    <Link to="/checkout" onClick={onClose}>
                      <Button variant="primary" fullWidth>
                        Continuar a compra
                      </Button>
                    </Link>
                    <Button variant="outline" fullWidth onClick={onClose}>
                      Seguir comprando
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
