import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wind, Square, Wrench, MoveVertical } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Split',
    slug: 'split-muro',
    image: '/images/equipo_aire.jpg',
    icon: Wind,
    popular: true,
  },
  {
    id: 2,
    name: 'Ventana',
    slug: 'ventana',
    image: '/images/equipo_aire2.jpg',
    icon: Square,
  },
  {
    id: 3,
    name: 'Accesorios',
    slug: 'accesorios',
    image: '/images/equipo_aire.jpg',
    icon: Wrench,
  },
  {
    id: 4,
    name: 'Piso-techo',
    slug: 'portatiles',
    image: '/images/equipo_aire2.jpg',
    icon: MoveVertical,
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Decoraciones de fondo */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-sand/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Título de sección - Más editorial */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-text-primary mb-3"
          >
            Elige el tipo de equipo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-text-muted font-light"
          >
            Encuentra el equipo perfecto para tu espacio
          </motion.p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="group"
              >
                <Link
                  to={`/productos?categoria=${category.slug}`}
                  className="block"
                >
                  <div className="relative bg-gradient-to-br from-white to-sand-light/20 rounded-[32px] p-7 transition-all duration-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-2 border border-border-lighter hover:border-primary/20">
                    {/* Badge popular - Rediseñado */}
                    {category.popular && (
                      <div className="absolute -top-3 -right-3 z-20">
                        <div className="relative">
                          <div className="absolute inset-0 bg-coral/20 rounded-full blur-lg" />
                          <span className="relative flex items-center gap-1.5 bg-coral text-white text-xs font-semibold px-4 py-2 rounded-pill shadow-soft-md">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            Más vendido
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Ícono en píldora celeste */}
                    <div className="mb-5 flex">
                      <div className="flex items-center gap-2 bg-primary/10 rounded-pill px-3 py-2">
                        <IconComponent className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>

                    {/* Imagen del producto - Con degradado y flotante */}
                    <div className="relative">
                      {/* Degradado de fondo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent rounded-2xl" />

                      {/* Contenedor imagen */}
                      <div className="aspect-square flex items-center justify-center overflow-visible rounded-2xl p-4 relative">
                        <motion.img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-contain relative z-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500"
                          whileHover={{ rotate: 3 }}
                        />
                      </div>
                    </div>

                    {/* Doodles decorativos */}
                    <div className="absolute bottom-6 right-6 w-2 h-2 bg-coral/40 rounded-full" />
                    <div className="absolute bottom-10 right-8 w-1.5 h-1.5 bg-coral/30 rounded-full" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
