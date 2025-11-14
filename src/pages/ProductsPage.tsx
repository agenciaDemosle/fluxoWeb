import React from 'react';
import { Layout } from '../components/layout';
import { ProductCard } from '../components/product/ProductCard';
import { Spinner } from '../components/common';
import { useProducts } from '../hooks';

export const ProductsPage: React.FC = () => {
  const { data: products, isLoading } = useProducts({ per_page: 20 });

  return (
    <Layout
      title="Productos"
      description="Explora nuestra selección de aires acondicionados con instalación profesional"
    >
      <section className="py-12 bg-bg-muted min-h-[70vh]">
        <div className="container-custom">
          <h1 className="text-h1 font-bold text-text-primary mb-8">
            Nuestros Productos
          </h1>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spinner size="lg" text="Cargando productos..." />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-muted">No hay productos disponibles</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};
