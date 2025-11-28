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
      badge: 'Servicio más contratado',
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
    <section className="relative py-24 bg-gradient-to-b from-bg-muted via-sand-light/10 to-bg-muted overflow-hidden">
      {/* Texturas y blobs de fondo */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)',
        backgroundSize: '22px 22px'
      }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sand/30 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
          >
            Nuestros servicios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Instalación profesional y mantención para que tu equipo funcione perfecto siempre
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to={service.link}
                className="block h-full"
              >
                <div className="relative h-full flex flex-col bg-white rounded-[40px] overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-500 border-b-[6px] border-transparent hover:border-primary">
                  {/* Badge si existe - Estilo premium */}
                  {service.badge && (
                    <div className="absolute top-8 left-8 z-30">
                      <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-coral/30 rounded-full blur-xl" />
                        <span className="relative flex items-center gap-2 bg-gradient-to-r from-coral to-coral/90 text-white text-xs font-bold px-5 py-2.5 rounded-pill shadow-soft-lg">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          {service.badge}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Imagen con composición orgánica avanzada */}
                  <div className="relative h-[350px] overflow-hidden">
                    {/* Capas de blobs de fondo */}
                    <div className="absolute -top-12 -left-12 w-64 h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-[60%_40%_30%_70%/40%_60%_50%_60%] blur-2xl" />
                    <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-gradient-to-br from-sand/40 to-sand/20 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] blur-2xl" />

                    {/* Imagen principal con recorte orgánico */}
                    <div className="relative h-full">
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Overlay gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-text-primary/10 to-transparent" />
                      </div>

                      {/* Forma orgánica decorativa encima */}
                      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-32 bg-white rounded-t-[50%] z-10" />
                    </div>

                    {/* Doodles decorativos sobre la imagen */}
                    <div className="absolute top-8 right-8 z-20">
                      <div className="w-16 h-16 border-[3px] border-white/40 rounded-full" />
                    </div>
                    <div className="absolute top-16 right-12 z-20">
                      <div className="w-3 h-3 bg-white/60 rounded-full" />
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="relative px-8 pb-8 pt-6 flex-1 flex flex-col -mt-6 z-20">
                    {/* Icono con efecto duotono */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <service.icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>

                    {/* Título */}
                    <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-text-muted leading-relaxed mb-8 flex-1 text-base">
                      {service.description}
                    </p>

                    {/* CTA mejorado */}
                    <div className="flex items-center text-primary font-semibold group/cta">
                      <span className="text-base">
                        Más información
                      </span>
                      <ArrowRight className="w-6 h-6 ml-2 group-hover/cta:translate-x-2 transition-transform duration-200" strokeWidth={2.5} />
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
