import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Wrench,
      title: 'Instalación Profesional',
      description:
        'Instalación certificada con técnicos SEC. Garantía de 2 años incluida. Agenda en 24-48 horas.',
      link: '/instalacion',
      image: '/images/hero1.webp',
    },
    {
      icon: Shield,
      title: 'Servicio Técnico',
      description:
        'Mantén tu equipo en perfecto estado con planes de mantención preventiva y reparaciones profesionales.',
      link: '/servicios',
      image: '/images/hero3.jpeg',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={service.link}
                className="block group h-full"
              >
                <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Imagen */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="bg-white p-8 flex-1 flex flex-col">
                    {/* Icono */}
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Título */}
                    <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-text-muted mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* Botón */}
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      <span className="uppercase text-sm tracking-wider">
                        Más información
                      </span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
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
