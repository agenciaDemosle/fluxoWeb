import React, { useState } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterState {
  categories: string[];
  priceRange: { min: number; max: number };
  btu: string[];
  features: string[];
  brands: string[];
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

const categories = [
  { label: 'Split Muro', value: 'split-muro', count: 8 },
  { label: 'Ventana', value: 'ventana', count: 3 },
  { label: 'Piso-Techo', value: 'piso-techo', count: 2 },
  { label: 'Cassette', value: 'cassette', count: 1 },
];

const btuOptions = [
  { label: '9.000 BTU', value: '9000', count: 3 },
  { label: '12.000 BTU', value: '12000', count: 4 },
  { label: '18.000 BTU', value: '18000', count: 2 },
  { label: '24.000 BTU', value: '24000', count: 2 },
  { label: '30.000+ BTU', value: '30000', count: 3 },
];

const features = [
  { label: 'Inverter', value: 'inverter', count: 10 },
  { label: 'WiFi', value: 'wifi', count: 5 },
  { label: 'Purificador de aire', value: 'purificador', count: 6 },
  { label: 'Modo Sleep', value: 'sleep', count: 8 },
  { label: 'Deshumidificador', value: 'deshumidificador', count: 7 },
];

const brands = [
  { label: 'Samsung', value: 'samsung', count: 3 },
  { label: 'LG', value: 'lg', count: 2 },
  { label: 'Midea', value: 'midea', count: 2 },
  { label: 'Daikin', value: 'daikin', count: 1 },
  { label: 'Mabe', value: 'mabe', count: 1 },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange, activeFilters }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'categories',
    'price',
    'btu',
  ]);
  const [priceMin, setPriceMin] = useState<string>(activeFilters.priceRange.min.toString());
  const [priceMax, setPriceMax] = useState<string>(activeFilters.priceRange.max.toString());

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  const handleCategoryToggle = (value: string) => {
    const newCategories = activeFilters.categories.includes(value)
      ? activeFilters.categories.filter((c) => c !== value)
      : [...activeFilters.categories, value];
    onFilterChange({ ...activeFilters, categories: newCategories });
  };

  const handleBTUToggle = (value: string) => {
    const newBTU = activeFilters.btu.includes(value)
      ? activeFilters.btu.filter((b) => b !== value)
      : [...activeFilters.btu, value];
    onFilterChange({ ...activeFilters, btu: newBTU });
  };

  const handleFeatureToggle = (value: string) => {
    const newFeatures = activeFilters.features.includes(value)
      ? activeFilters.features.filter((f) => f !== value)
      : [...activeFilters.features, value];
    onFilterChange({ ...activeFilters, features: newFeatures });
  };

  const handleBrandToggle = (value: string) => {
    const newBrands = activeFilters.brands.includes(value)
      ? activeFilters.brands.filter((b) => b !== value)
      : [...activeFilters.brands, value];
    onFilterChange({ ...activeFilters, brands: newBrands });
  };

  const handlePriceChange = () => {
    const min = parseInt(priceMin) || 0;
    const max = parseInt(priceMax) || 9999999;
    onFilterChange({ ...activeFilters, priceRange: { min, max } });
  };

  const clearAllFilters = () => {
    setPriceMin('0');
    setPriceMax('9999999');
    onFilterChange({
      categories: [],
      priceRange: { min: 0, max: 9999999 },
      btu: [],
      features: [],
      brands: [],
    });
  };

  const hasActiveFilters =
    activeFilters.categories.length > 0 ||
    activeFilters.btu.length > 0 ||
    activeFilters.features.length > 0 ||
    activeFilters.brands.length > 0 ||
    activeFilters.priceRange.min > 0 ||
    activeFilters.priceRange.max < 9999999;

  const FilterSection: React.FC<{
    id: string;
    title: string;
    children: React.ReactNode;
  }> = ({ id, title, children }) => {
    const isExpanded = expandedSections.includes(id);

    return (
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between py-4 px-5 hover:bg-gray-50 transition-colors"
        >
          <span className="text-[15px] font-semibold text-gray-900">{title}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" strokeWidth={2} />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" strokeWidth={2} />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4A9FD8] to-[#5AADDE] px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-white" strokeWidth={2} />
            <h3 className="text-[16px] font-bold text-white">Filtros</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-[13px] text-white/90 hover:text-white font-medium underline"
            >
              Limpiar todo
            </button>
          )}
        </div>
      </div>

      {/* Categorías */}
      <FilterSection id="categories" title="Categorías">
        <div className="space-y-2.5">
          {categories.map((category) => (
            <label
              key={category.value}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={activeFilters.categories.includes(category.value)}
                  onChange={() => handleCategoryToggle(category.value)}
                  className="w-4 h-4 text-[#4A9FD8] border-gray-300 rounded focus:ring-2 focus:ring-[#4A9FD8] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[14px] text-gray-700 group-hover:text-[#4A9FD8] transition-colors">
                  {category.label}
                </span>
              </div>
              <span className="text-[13px] text-gray-400">({category.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Precio */}
      <FilterSection id="price" title="Rango de precio">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] text-gray-600 mb-1.5">Mínimo</label>
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A9FD8] focus:border-[#4A9FD8]"
              />
            </div>
            <div>
              <label className="block text-[12px] text-gray-600 mb-1.5">Máximo</label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="999999"
                className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A9FD8] focus:border-[#4A9FD8]"
              />
            </div>
          </div>
          <button
            onClick={handlePriceChange}
            className="w-full py-2 px-4 bg-[#4A9FD8] hover:bg-[#3B8BC0] text-white text-[13px] font-semibold rounded-lg transition-colors"
          >
            Aplicar
          </button>
        </div>
      </FilterSection>

      {/* BTU */}
      <FilterSection id="btu" title="Capacidad BTU">
        <div className="space-y-2.5">
          {btuOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={activeFilters.btu.includes(option.value)}
                  onChange={() => handleBTUToggle(option.value)}
                  className="w-4 h-4 text-[#4A9FD8] border-gray-300 rounded focus:ring-2 focus:ring-[#4A9FD8] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[14px] text-gray-700 group-hover:text-[#4A9FD8] transition-colors">
                  {option.label}
                </span>
              </div>
              <span className="text-[13px] text-gray-400">({option.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Características */}
      <FilterSection id="features" title="Características">
        <div className="space-y-2.5">
          {features.map((feature) => (
            <label
              key={feature.value}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={activeFilters.features.includes(feature.value)}
                  onChange={() => handleFeatureToggle(feature.value)}
                  className="w-4 h-4 text-[#4A9FD8] border-gray-300 rounded focus:ring-2 focus:ring-[#4A9FD8] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[14px] text-gray-700 group-hover:text-[#4A9FD8] transition-colors">
                  {feature.label}
                </span>
              </div>
              <span className="text-[13px] text-gray-400">({feature.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Marcas */}
      <FilterSection id="brands" title="Marcas">
        <div className="space-y-2.5">
          {brands.map((brand) => (
            <label
              key={brand.value}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={activeFilters.brands.includes(brand.value)}
                  onChange={() => handleBrandToggle(brand.value)}
                  className="w-4 h-4 text-[#4A9FD8] border-gray-300 rounded focus:ring-2 focus:ring-[#4A9FD8] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[14px] text-gray-700 group-hover:text-[#4A9FD8] transition-colors">
                  {brand.label}
                </span>
              </div>
              <span className="text-[13px] text-gray-400">({brand.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};
