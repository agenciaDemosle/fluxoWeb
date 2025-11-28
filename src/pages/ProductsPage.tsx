import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/layout';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilters } from '../components/product/ProductFilters';
import type { FilterState } from '../components/product/ProductFilters';
import { Spinner } from '../components/common';
import { useProducts } from '../hooks';
import { Grid3x3, List, ChevronDown } from 'lucide-react';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'rating';

export const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('categoria');

  const { data: allProducts, isLoading } = useProducts({ per_page: 100 });

  const [filters, setFilters] = useState<FilterState>({
    categories: categoryFromUrl ? [categoryFromUrl] : [],
    priceRange: { min: 0, max: 9999999 },
    btu: [],
    features: [],
    brands: [],
  });

  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];

    let filtered = [...allProducts];

    // Filtro de categorías
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        product.categories.some((cat) => filters.categories.includes(cat.slug))
      );
    }

    // Filtro de precio
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
    );

    // Filtro de BTU
    if (filters.btu.length > 0) {
      filtered = filtered.filter((product) => {
        if (!product.capacity) return false;
        const productBTU = product.capacity.match(/\d+/)?.[0];
        return productBTU && filters.btu.includes(productBTU);
      });
    }

    // Filtro de características
    if (filters.features.length > 0) {
      filtered = filtered.filter((product) => {
        const hasInverter = filters.features.includes('inverter') ? product.inverter : true;
        // Agregar más features cuando estén disponibles en el producto
        return hasInverter;
      });
    }

    // Filtro de marcas
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brands.some((brand) => product.name.toLowerCase().includes(brand.toLowerCase()))
      );
    }

    // Ordenamiento
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.averageRating) - parseFloat(a.averageRating));
        break;
      default:
        // Default: featured primero, luego por ID
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.id - b.id;
        });
    }

    return filtered;
  }, [allProducts, filters, sortBy]);

  return (
    <Layout
      title="Tienda - Aires Acondicionados"
      description="Explora nuestra selección de aires acondicionados con instalación profesional"
    >
      <section className="py-8 bg-[#F9FAFB] min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {categoryFromUrl ? 'Productos' : 'Todos los productos'}
            </h1>
            <p className="text-gray-600">
              {isLoading ? 'Cargando...' : `${filteredProducts.length} productos encontrados`}
            </p>
          </div>

          {/* Toolbar */}
          <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* View Mode */}
              <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#4A9FD8] shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-[#4A9FD8] shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>

              <span className="text-sm text-gray-600">
                Mostrando <span className="font-semibold">{filteredProducts.length}</span> resultados
              </span>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#4A9FD8] focus:border-[#4A9FD8] cursor-pointer"
              >
                <option value="default">Ordenar por defecto</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name-asc">Nombre: A-Z</option>
                <option value="rating">Mejor valorados</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Main Content: Sidebar + Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ProductFilters onFilterChange={setFilters} activeFilters={filters} />
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Spinner size="lg" text="Cargando productos..." />
                </div>
              ) : filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <p className="text-gray-600 text-lg mb-2">No se encontraron productos</p>
                  <p className="text-gray-500 text-sm">
                    Intenta ajustar los filtros para ver más resultados
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
