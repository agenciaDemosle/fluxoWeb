import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '../components/layout';
import { CalculatorModal, Button } from '../components/common';
import { ProductCard } from '../components/product/ProductCard';
import { CategoryGrid, Testimonials, FAQ, EducationalSection, ServicesSection, AmbientesSection, HeroCarousel, WhyFluxo } from '../components/landing';
import { useFeaturedProducts } from '../hooks';
import { Spinner } from '../components/common';

export const HomePage: React.FC = () => {
  const { data: products, isLoading } = useFeaturedProducts(8);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Mostrar solo múltiplos de 4 productos
  const displayProducts = products ? products.slice(0, Math.floor(products.length / 4) * 4) : [];

  return (
    <Layout
      title="Aires Acondicionados con Instalación Profesional"
      description="Compra aires acondicionados con instalación profesional incluida. Equipos certificados y garantía real en todo Chile."
      keywords="aires acondicionados, instalación profesional, Chile, split, inverter"
    >
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* New Hero Carousel */}
      <HeroCarousel />

      {/* Productos Destacados - Tendencias */}
      <section className="relative py-20 bg-bg-muted overflow-hidden">
        {/* Textura de fondo tipo grain */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        <div className="container-custom relative z-10">
          {/* Encabezado */}
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bold text-text-primary mb-3">
              Tendencias de hoy
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Los equipos más populares con instalación profesional
            </p>
          </div>

          {/* Grid de productos */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" text="Cargando productos..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* CTA Ver todos */}
          <div className="text-center">
            <Link to="/productos">
              <Button variant="outline" size="md" className="rounded-pill group">
                Ver todos los productos
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Fluxo - Generar confianza con storytelling */}
      <WhyFluxo />

      {/* Categorías - Exploración guiada */}
      <CategoryGrid />

      {/* Ambientes Fluxo - Inspiración y storytelling */}
      <AmbientesSection />

      {/* Servicios - Reforzar propuesta de valor */}
      <ServicesSection />

      {/* Sección Educativa - Herramienta útil */}
      <EducationalSection />

      {/* Testimonios - Prueba social */}
      <Testimonials />

      {/* FAQ - Resolver objeciones finales */}
      <FAQ />
    </Layout>
  );
};
