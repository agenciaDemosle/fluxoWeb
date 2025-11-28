import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Thermometer, Home, Briefcase, Bed, Coffee } from 'lucide-react';

const ambientes = [
  {
    id: 1,
    name: 'Living',
    image: '/images/hero1.webp',
    description: 'El corazón del hogar, siempre fresco',
    icon: Home,
    size: 'large', // ocupa 2 columnas
  },
  {
    id: 2,
    name: 'Dormitorio',
    image: '/images/hero3.jpeg',
    description: 'Noches perfectas todo el año',
    icon: Bed,
    size: 'normal',
  },
  {
    id: 3,
    name: 'Tip',
    content: '¿Sabías que mantener tu aire entre 22-24°C es el punto ideal de confort y eficiencia energética?',
    icon: Thermometer,
    type: 'tip', // card tipográfica
  },
  {
    id: 4,
    name: 'Oficina',
    image: '/images/hero1.webp',
    description: 'Productividad con clima ideal',
    icon: Briefcase,
    size: 'normal',
  },
  {
    id: 5,
    name: 'Cocina',
    image: '/images/hero1.webp',
    description: 'Cocina cómoda en cualquier estación',
    icon: Coffee,
    size: 'normal',
  },
];

export const AmbientesSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-sand-light/30 to-white">
      {/* Textura de fondo */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)',
        backgroundSize: '20px 20px'
      }} />

      <div className="container-custom relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
          >
            Ambientes Fluxo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-text-muted max-w-2xl mx-auto font-light"
          >
            Descubre cómo se siente cada espacio de tu hogar con el clima perfecto
          </motion.p>
        </div>

        {/* Mosaico irregular - Grid asimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ambientes.map((ambiente, index) => {
            const IconComponent = ambiente.icon;

            // Card tipográfica (tip)
            if (ambiente.type === 'tip') {
              return (
                <motion.div
                  key={ambiente.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="h-full bg-gradient-to-br from-primary to-primary-dark rounded-[32px] p-8 shadow-soft-lg flex flex-col justify-center items-center text-center">
                    {/* Icono grande */}
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>

                    {/* Texto */}
                    <p className="text-white text-lg leading-relaxed font-light">
                      {ambiente.content}
                    </p>

                    {/* Decoración */}
                    <div className="absolute -top-3 -right-3 w-24 h-24 bg-coral/20 rounded-full blur-2xl" />
                  </div>
                </motion.div>
              );
            }

            // Cards con imagen
            return (
              <motion.div
                key={ambiente.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative group ${ambiente.size === 'large' ? 'md:col-span-2' : ''}`}
              >
                <Link to="/productos" className="block">
                  <div className="relative h-[400px] rounded-[32px] overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300">
                    {/* Imagen de fondo */}
                    <img
                      src={ambiente.image}
                      alt={ambiente.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-text-primary/20 to-transparent" />

                    {/* Contenido */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      {/* Icono */}
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />
                      </div>

                      {/* Título */}
                      <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {ambiente.name}
                      </h3>

                      {/* Descripción */}
                      <p className="text-white/90 font-light text-sm">
                        {ambiente.description}
                      </p>
                    </div>

                    {/* Doodle decorativo */}
                    <div className="absolute top-6 right-6 w-3 h-3 bg-coral rounded-full opacity-60" />
                    <div className="absolute top-12 right-8 w-2 h-2 bg-coral/60 rounded-full" />
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
