import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Shield, Wrench, ArrowRight, Users, Award, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { env } from '../config/env';

const InstallationPage: React.FC = () => {
  const steps = [
    {
      icon: Users,
      title: 'Consulta Inicial',
      description: 'Evaluamos tus necesidades y el espacio donde se instalará el equipo',
      time: '30 min',
    },
    {
      icon: CheckCircle,
      title: 'Verificación Técnica',
      description: 'Revisamos instalación eléctrica y ubicación óptima para el equipo',
      time: '1 hora',
    },
    {
      icon: Wrench,
      title: 'Instalación Profesional',
      description: 'Montaje completo del equipo por técnicos certificados',
      time: '2-4 horas',
    },
    {
      icon: Shield,
      title: 'Prueba y Garantía',
      description: 'Verificamos funcionamiento correcto y activamos tu garantía',
      time: '30 min',
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Técnicos Certificados',
      description: 'Instaladores con certificación SEC y años de experiencia en el rubro',
    },
    {
      icon: Shield,
      title: 'Garantía de Instalación',
      description: 'Garantía extendida de 2 años en mano de obra e instalación',
    },
    {
      icon: Clock,
      title: 'Agenda Flexible',
      description: 'Instalación en 24-48 horas según disponibilidad en tu zona',
    },
    {
      icon: MapPin,
      title: 'Cobertura Nacional',
      description: 'Servicio de instalación disponible en todo Chile',
    },
  ];

  const included = [
    'Evaluación previa del sitio de instalación',
    'Montaje de unidad interior y exterior',
    'Conexión eléctrica certificada',
    'Tubería de cobre y aislación térmica',
    'Pruebas de funcionamiento y carga de gas',
    'Limpieza del área de trabajo',
    'Capacitación básica de uso',
    'Certificado de instalación SEC',
  ];

  return (
    <Layout
      title="Instalación Profesional de Aires Acondicionados"
      description="Servicio de instalación profesional con técnicos certificados. Garantía extendida y cobertura en todo Chile."
      keywords="instalación aires acondicionados, instaladores certificados, instalación SEC, Chile"
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-bg-muted py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-h1 md:text-h1-lg font-bold text-text-primary mb-6"
            >
              Instalación Profesional{' '}
              <span className="text-gradient">Certificada</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-text-muted mb-8"
            >
              Nuestros técnicos certificados garantizan una instalación segura, eficiente
              y con todos los permisos legales necesarios.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/productos">
                <Button variant="primary" size="md">
                  Ver equipos con instalación
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="md"
                onClick={() =>
                  window.open(`https://wa.me/${env.contact.whatsapp}`, '_blank')
                }
              >
                Solicitar cotización
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proceso de Instalación */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">
              Proceso de Instalación
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Un proceso simple y transparente en 4 pasos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-bg-muted rounded-card-lg p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {step.time}
                    </span>
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Instalación profesional con las mejores garantías del mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-card-lg p-6"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
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

      {/* Qué Incluye */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-semibold text-text-primary mb-4">
                ¿Qué incluye la instalación?
              </h2>
              <p className="text-text-muted">
                Todo lo necesario para que tu equipo funcione correctamente
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {included.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-text-primary">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/productos">
                <Button variant="primary" size="md">
                  Ver productos con instalación incluida
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">
              ¿Necesitas más información?
            </h2>
            <p className="text-text-muted mb-8">
              Nuestro equipo está disponible para resolver todas tus dudas sobre
              instalación
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() =>
                window.open(`https://wa.me/${env.contact.whatsapp}`, '_blank')
              }
            >
              Contactar por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InstallationPage;
