import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    name: 'Split',
    slug: 'split-muro',
    image: '/images/equipo_aire.jpg',
  },
  {
    id: 2,
    name: 'Ventana',
    slug: 'ventana',
    image: '/images/equipo_aire2.jpg',
  },
  {
    id: 3,
    name: 'Accesorios',
    slug: 'accesorios',
    image: '/images/equipo_aire.jpg',
  },
  {
    id: 4,
    name: 'Piso-techo',
    slug: 'portatiles',
    image: '/images/equipo_aire2.jpg',
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/productos?categoria=${category.slug}`}
                className="block group"
              >
                <div className="bg-gray-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  {/* Título */}
                  <h3 className="text-3xl font-bold text-text-primary mb-8">
                    {category.name}
                  </h3>

                  {/* Imagen del producto */}
                  <div className="aspect-square flex items-center justify-center overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
