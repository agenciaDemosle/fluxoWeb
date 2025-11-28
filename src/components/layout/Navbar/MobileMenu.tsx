import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Wind,
  Box,
  Zap,
  Snowflake,
  Settings,
  Wrench,
  Headphones,
  ChevronDown,
  Phone,
  User,
  Heart,
  GitCompare,
} from 'lucide-react';
import { Button } from '../../common';
import { env } from '../../../config/env';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator?: () => void;
}

const productCategories = [
  { name: 'Splits', slug: 'split-muro', icon: Wind },
  { name: 'Ventana', slug: 'ventana', icon: Box },
  { name: 'Piso-techo', slug: 'piso-techo', icon: Zap },
  { name: 'Inverter', slug: 'inverter', icon: Snowflake },
  { name: 'Accesorios', slug: 'accesorios', icon: Settings },
];

const menuItems = [
  { label: 'Instalación', path: '/instalacion', icon: Wrench },
  { label: 'Servicio técnico', path: '/servicios', icon: Headphones },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenCalculator }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
                <div className="text-[#4A9FD8] text-2xl font-bold">Fluxo</div>
              </div>

              {/* Menu Content */}
              <div className="flex-1 px-6 py-6 space-y-1">
                {/* Products Section */}
                <div>
                  <button
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className="flex items-center justify-between w-full py-3 text-gray-900 font-medium text-[15px]"
                  >
                    <span>Productos</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isProductsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-2 space-y-1">
                          {productCategories.map((category) => {
                            const Icon = category.icon;
                            return (
                              <Link
                                key={category.slug}
                                to={`/productos?categoria=${category.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-3 py-2.5 text-gray-600 hover:text-[#4A9FD8] transition-colors"
                              >
                                <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                                <span className="text-[14px]">{category.name}</span>
                              </Link>
                            );
                          })}
                          <Link
                            to="/productos"
                            onClick={onClose}
                            className="block py-2.5 pl-9 text-[14px] text-[#4A9FD8] font-medium"
                          >
                            Ver todos →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other Menu Items */}
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center gap-3 py-3 text-gray-900 hover:text-[#4A9FD8] transition-colors font-medium text-[15px]"
                    >
                      {Icon && <Icon className="w-5 h-5" strokeWidth={1.5} />}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Calculadora Button */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenCalculator?.();
                  }}
                  className="flex items-center gap-3 py-3 text-gray-900 hover:text-[#4A9FD8] transition-colors font-medium text-[15px] w-full"
                >
                  <span>Calculadora AC</span>
                </button>

                <div className="h-px bg-gray-200 my-4" />

                {/* Account Options */}
                <Link
                  to="/cuenta"
                  onClick={onClose}
                  className="flex items-center gap-3 py-3 text-gray-900 hover:text-[#4A9FD8] transition-colors font-medium text-[15px]"
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                  <span>Mi cuenta</span>
                </Link>

                <Link
                  to="/favoritos"
                  onClick={onClose}
                  className="flex items-center gap-3 py-3 text-gray-900 hover:text-[#4A9FD8] transition-colors font-medium text-[15px]"
                >
                  <Heart className="w-5 h-5" strokeWidth={1.5} />
                  <span>Favoritos</span>
                </Link>

                <Link
                  to="/comparar"
                  onClick={onClose}
                  className="flex items-center gap-3 py-3 text-gray-900 hover:text-[#4A9FD8] transition-colors font-medium text-[15px]"
                >
                  <GitCompare className="w-5 h-5" strokeWidth={1.5} />
                  <span>Comparar productos</span>
                </Link>
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-6 border-t border-gray-200 space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    onClose();
                    window.open(`https://wa.me/${env.contact.whatsapp}`, '_blank');
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contactar por WhatsApp
                </Button>

                <div className="text-center">
                  <a
                    href="tel:+56912345678"
                    className="text-[13px] text-gray-600 hover:text-[#4A9FD8] transition-colors"
                  >
                    O llámanos: +56 9 1234 5678
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
