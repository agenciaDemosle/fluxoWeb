import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, ChevronDown, Wind, Box, Zap, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../common';
import { useCartStore } from '../../../store/useCartStore';
import { env } from '../../../config/env';

export const Navbar: React.FC<{ onOpenCart: () => void }> = ({
  onOpenCart,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const { items } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const productCategories = [
    {
      name: 'Split Muro',
      slug: 'split-muro',
      icon: Wind,
      description: 'Los más eficientes y silenciosos',
    },
    {
      name: 'Ventana',
      slug: 'ventana',
      icon: Box,
      description: 'Económicos y fáciles de instalar',
    },
    {
      name: 'Portátiles y Piso-techo',
      slug: 'portatiles',
      icon: Zap,
      description: 'Sin instalación, listos para usar',
    },
    {
      name: 'Accesorios y Controles',
      slug: 'accesorios',
      icon: Settings,
      description: 'Mejora tu sistema de climatización',
    },
  ];

  const menuItems = [
    { label: 'Instalación', path: '/instalacion' },
    { label: 'Servicios', path: '/servicios' },
    { label: 'Calculadora AC', path: '/calculadora' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-soft">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-h3 font-bold text-gradient">
              {env.site.name}
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Products Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsMenuOpen(true)}
              onMouseLeave={() => setIsProductsMenuOpen(false)}
            >
              <button className="flex items-center text-gray-600 hover:text-primary transition-colors duration-200 font-medium uppercase text-sm tracking-wide">
                Productos
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProductsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-card-lg shadow-lg border border-border-soft p-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {productCategories.map((category) => (
                        <Link
                          key={category.slug}
                          to={`/productos?categoria=${category.slug}`}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-bg-muted transition-colors group"
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <category.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-xs text-text-muted mt-1">
                              {category.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border-soft">
                      <Link
                        to="/productos"
                        className="text-sm text-primary hover:text-primary/80 font-medium"
                      >
                        Ver todos los productos →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other menu items */}
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium uppercase text-sm tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(
                  `https://wa.me/${env.contact.whatsapp}`,
                  '_blank'
                )
              }
            >
              <Phone className="w-4 h-4 mr-2" />
              Contacto
            </Button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 hover:bg-bg-muted rounded-full transition-all duration-200"
            >
              <ShoppingCart className="w-6 h-6 text-text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Cart */}
            <button
              onClick={onOpenCart}
              className="relative p-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border-soft"
          >
            <div className="container-custom py-4 space-y-3">
              {/* Products submenu */}
              <div>
                <button
                  onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}
                  className="flex items-center justify-between w-full py-2 text-gray-600 hover:text-primary transition-colors duration-200 font-medium uppercase text-sm tracking-wide"
                >
                  Productos
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isProductsMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-2"
                    >
                      {productCategories.map((category) => (
                        <Link
                          key={category.slug}
                          to={`/productos?categoria=${category.slug}`}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsProductsMenuOpen(false);
                          }}
                          className="flex items-center space-x-2 py-2 text-sm text-text-muted hover:text-primary transition-colors"
                        >
                          <category.icon className="w-4 h-4" />
                          <span>{category.name}</span>
                        </Link>
                      ))}
                      <Link
                        to="/productos"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsProductsMenuOpen(false);
                        }}
                        className="block py-2 text-sm text-primary hover:text-primary/80 font-medium"
                      >
                        Ver todos →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other menu items */}
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-primary transition-colors duration-200 font-medium uppercase text-sm tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border-soft">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.open(
                      `https://wa.me/${env.contact.whatsapp}`,
                      '_blank'
                    );
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contactar por WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
