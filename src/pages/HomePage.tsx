import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { ProductCard } from '../components/product/ProductCard';
import { CategoryGrid, Testimonials, FAQ, EducationalSection, ServicesSection } from '../components/landing';
import { useFeaturedProducts } from '../hooks';
import { Spinner } from '../components/common';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Imagen de fondo a la derecha - ocupa todo el alto */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block"
      >
        <img
          src="/images/hero1.webp"
          alt="Aires Acondicionados"
          className="w-full h-full object-cover"
        />
        {/* Gradiente suave en el borde izquierdo para mezclar con el contenido */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent"></div>
      </motion.div>

      {/* Contenido */}
      <div className="container-custom relative z-10 py-20">
        <div className="md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 pr-8"
          >
            {/* Texto superior pequeño */}
            <div className="space-y-2">
              <p className="text-sm text-text-muted">
                Compra tu aire acondicionado.
              </p>
              <p className="text-sm text-text-muted">
                Disfruta de instalación rápida. Agenda tu servicio.
              </p>
              <p className="text-sm text-text-muted">
                ¡Y obtén 2 años de garantía incluida!
              </p>
            </div>

            {/* Título principal */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight">
              Mantener tu casa{' '}
              <span className="text-gradient">fresca</span>{' '}
              es realmente así de fácil.
            </h1>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/productos">
                <Button variant="primary" size="md">
                  Ver equipos con instalación
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/calculadora">
                <Button variant="outline" size="md">
                  Calcular BTU necesarios
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Garantía extendida',
      description: 'Protegemos tu inversión con garantía completa',
    },
    {
      icon: Award,
      title: 'Instaladores certificados',
      description: 'Técnicos profesionales con años de experiencia',
    },
    {
      icon: Clock,
      title: 'Instalación rápida',
      description: 'Agenda tu instalación en 24-48 horas',
    },
    {
      icon: Zap,
      title: 'Máxima eficiencia',
      description: 'Equipos con la mejor clasificación energética',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-h2 font-semibold text-center text-text-primary mb-12">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-text-muted">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HomePage: React.FC = () => {
  const { data: products, isLoading } = useFeaturedProducts(8);

  return (
    <Layout
      title="Aires Acondicionados con Instalación Profesional"
      description="Compra aires acondicionados con instalación profesional incluida. Equipos certificados y garantía real en todo Chile."
      keywords="aires acondicionados, instalación profesional, Chile, split, inverter"
    >
      <Hero />

      {/* Categorías */}
      <CategoryGrid />

      {/* Productos Destacados */}
      <section className="py-16 bg-bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">
              Tendencias de hoy
            </h2>
            <p className="text-text-muted">
              Los equipos más populares con instalación profesional
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" text="Cargando productos..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/productos">
              <Button variant="outline" size="md">
                Ver todos los productos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <Benefits />

      {/* Servicios - Instalación y Mantención */}
      <ServicesSection />

      {/* Sección Educativa */}
      <EducationalSection />

      {/* Testimonios */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />
    </Layout>
  );
};
