import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Clock, Zap, Play, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Reason {
  icon: React.ElementType;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    icon: Shield,
    title: 'Garantía extendida',
    description: 'Protegemos tu inversión con 2 años de garantía completa en todos nuestros equipos.',
  },
  {
    icon: Award,
    title: 'Instalación certificada SEC',
    description: 'Técnicos profesionales certificados con años de experiencia según normativa.',
  },
  {
    icon: Clock,
    title: 'Instalación express 24-48h',
    description: 'Agenda tu instalación rápida. Sin esperas, sin complicaciones.',
  },
  {
    icon: Zap,
    title: 'Ahorro energético real',
    description: 'Equipos Inverter con clasificación A++. Ahorra hasta $50.000 al año en luz.',
  },
];

export const WhyFluxo: React.FC = () => {
  return (
    <section className="py-12 lg:py-28 bg-gradient-to-b from-white to-[#F9FAFB]">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        {/* Main Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-16">
          {/* Left Column - Large Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl lg:rounded-[32px] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80"
                alt="Ambiente Fluxo"
                className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#4A9FD8]/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 lg:space-y-8 order-1 lg:order-2"
          >
            {/* Title */}
            <div className="space-y-3 lg:space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                ¿Por qué Fluxo?
              </h2>
              <div className="h-1 w-12 lg:w-16 bg-[#FF8B6A] rounded-full" />
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Más que vender equipos, diseñamos experiencias de confort con respaldo profesional.
              </p>
            </div>

            {/* Description Paragraph */}
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed max-w-lg">
              En Fluxo entendemos que elegir el aire acondicionado perfecto va más allá del equipo.
              Por eso ofrecemos instalación profesional certificada, garantía extendida y un equipo
              técnico disponible para ti en cada paso.
            </p>

            {/* Reasons List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-2 lg:pt-4">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-[#4A9FD8]/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#4A9FD8]" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF8B6A]" />
                        <h3 className="text-base font-semibold text-gray-900">
                          {reason.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-2xl lg:rounded-[40px] overflow-hidden shadow-2xl bg-gradient-to-br from-[#4A9FD8] to-[#3B8BC0]">
            {/* Background Image with Overlay */}
            <div className="relative h-[500px] sm:h-[400px] lg:h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=1400&q=80"
                alt="Experiencia Fluxo"
                className="w-full h-full object-cover opacity-30"
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-6 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-12">
                {/* Text Content */}
                <div className="text-white space-y-3 lg:space-y-4 max-w-2xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-1 lg:mb-2">
                    <CheckCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4" strokeWidth={2} />
                    <span className="text-xs lg:text-sm font-medium">Proceso completo</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    Conoce la experiencia de instalación Fluxo
                  </h3>

                  <p className="text-sm sm:text-base lg:text-lg text-white/90">
                    Te acompañamos desde la compra hasta la puesta en marcha.
                    Instalación profesional, segura y certificada.
                  </p>
                </div>

                {/* CTA / Play Button */}
                <div className="mt-8 lg:mt-0">
                  <Link
                    to="/instalacion"
                    className="group relative"
                  >
                    {/* Play Button */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-[#4A9FD8] ml-1" fill="currentColor" strokeWidth={0} />
                      </div>

                      {/* Ripple effect */}
                      <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                    </div>

                    <span className="block text-center text-white font-medium mt-4 text-sm">
                      Ver cómo funciona
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FF8B6A]/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#4A9FD8]/20 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
};
