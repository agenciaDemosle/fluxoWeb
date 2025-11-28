import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wind, Box, Zap, Snowflake, Settings, Wrench, Headphones, Calculator, Store } from 'lucide-react';

const categories = [
  {
    id: 'tienda',
    name: 'Tienda',
    slug: 'productos',
    icon: Store,
  },
  {
    id: 'splits',
    name: 'Splits',
    slug: 'split-muro',
    icon: Wind,
  },
  {
    id: 'ventana',
    name: 'Ventana',
    slug: 'ventana',
    icon: Box,
  },
  {
    id: 'piso-techo',
    name: 'Piso-techo',
    slug: 'piso-techo',
    icon: Zap,
  },
  {
    id: 'inverter',
    name: 'Inverter',
    slug: 'inverter',
    icon: Snowflake,
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    slug: 'accesorios',
    icon: Settings,
  },
  {
    id: 'instalacion',
    name: 'Instalación',
    slug: 'instalacion',
    icon: Wrench,
  },
  {
    id: 'servicio',
    name: 'Servicio técnico',
    slug: 'servicio-tecnico',
    icon: Headphones,
  },
];

interface CategoryNavbarProps {
  onOpenCalculator?: () => void;
}

export const CategoryNavbar: React.FC<CategoryNavbarProps> = ({ onOpenCalculator }) => {
  const location = useLocation();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const isActive = (slug: string) => {
    return location.pathname.includes(slug) || location.search.includes(slug);
  };

  return (
    <div className="bg-[#FAFAFB] border-b border-gray-200/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Desktop Category Nav */}
        <div className="hidden lg:flex items-center justify-between h-[54px]">
          <nav className="flex items-center gap-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const active = isActive(category.slug);
              const hovered = hoveredCategory === category.id;

              return (
                <Link
                  key={category.id}
                  to={
                    category.id === 'tienda'
                      ? '/productos'
                      : category.id === 'instalacion'
                      ? '/instalacion'
                      : category.id === 'servicio'
                      ? '/servicios'
                      : `/productos?categoria=${category.slug}`
                  }
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="relative group"
                >
                  <div
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      active
                        ? 'text-gray-900'
                        : hovered
                        ? 'text-[#4A9FD8] bg-white'
                        : 'text-gray-600 hover:text-[#4A9FD8]'
                    }`}
                  >
                    <Icon
                      className={`w-[17px] h-[17px] transition-colors duration-200 ${
                        active ? 'text-[#4A9FD8]' : ''
                      }`}
                      strokeWidth={1.5}
                    />
                    <span className="text-[14px] font-medium whitespace-nowrap">
                      {category.name}
                    </span>
                  </div>

                  {/* Active indicator */}
                  {active && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-[#4A9FD8] to-[#5AADDE] rounded-t-full" />
                  )}

                  {/* Hover indicator */}
                  {!active && hovered && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-gray-300 rounded-t-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Calculator button */}
          <button
            onClick={onOpenCalculator}
            className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4A9FD8] to-[#5AADDE] hover:from-[#3B8BC0] hover:to-[#4A9FD8] rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Calculator className="w-4 h-4 text-white" strokeWidth={2} />
            <span className="text-[13px] font-semibold text-white">
              Calculadora BTU
            </span>
          </button>
        </div>

        {/* Mobile Category Nav - Horizontal scroll */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="flex items-center gap-2 py-3 min-w-max">
            {categories.map((category) => {
              const Icon = category.icon;
              const active = isActive(category.slug);

              return (
                <Link
                  key={category.id}
                  to={
                    category.id === 'tienda'
                      ? '/productos'
                      : category.id === 'instalacion'
                      ? '/instalacion'
                      : category.id === 'servicio'
                      ? '/servicios'
                      : `/productos?categoria=${category.slug}`
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'bg-[#4A9FD8] text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 active:scale-95'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-[13px] font-medium">{category.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
