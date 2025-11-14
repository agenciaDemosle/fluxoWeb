import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Shield,
  Clock,
  CheckCircle,
  Droplets,
  Wind,
  ThermometerSun,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { env } from '../config/env';

const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: Wrench,
      title: 'Mantención Preventiva',
      description:
        'Mantén tu equipo funcionando al máximo rendimiento con nuestros planes de mantención periódica',
      features: [
        'Limpieza profunda de filtros',
        'Revisión de circuito refrigerante',
        'Verificación de conexiones eléctricas',
        'Medición de presiones de gas',
      ],
      price: 'Desde $35.000',
      popular: true,
    },
    {
      icon: Shield,
      title: 'Reparación y Diagnóstico',
      description:
        'Servicio técnico especializado para solucionar cualquier falla en tu equipo',
      features: [
        'Diagnóstico técnico profesional',
        'Reparación de fugas de gas',
        'Cambio de repuestos originales',
        'Garantía en mano de obra',
      ],
      price: 'Desde $45.000',
      popular: false,
    },
    {
      icon: Droplets,
      title: 'Carga de Gas Refrigerante',
      description:
        'Recarga profesional de gas con equipos certificados y gas de primera calidad',
      features: [
        'Detección de fugas',
        'Evacuación del sistema',
        'Carga de gas R410A o R32',
        'Pruebas de funcionamiento',
      ],
      price: 'Desde $50.000',
      popular: false,
    },
    {
      icon: Wind,
      title: 'Limpieza Profunda',
      description:
        'Sanitización completa del sistema para mejorar calidad del aire y eficiencia',
      features: [
        'Limpieza de turbinas y serpentines',
        'Desinfección antibacterial',
        'Eliminación de malos olores',
        'Mejora eficiencia energética',
      ],
      price: 'Desde $40.000',
      popular: false,
    },
  ];

  const maintenancePlans = [
    {
      name: 'Plan Básico',
      visits: '1 visita al año',
      price: '$35.000/año',
      features: [
        'Limpieza de filtros',
        'Revisión visual del equipo',
        'Limpieza básica de turbinas',
        'Informe de estado',
      ],
    },
    {
      name: 'Plan Premium',
      visits: '2 visitas al año',
      price: '$60.000/año',
      features: [
        'Todo lo del Plan Básico',
        'Limpieza profunda de serpentines',
        'Verificación de presiones',
        'Revisión eléctrica completa',
        'Descuento 15% en reparaciones',
      ],
      recommended: true,
    },
    {
      name: 'Plan Platinum',
      visits: '4 visitas al año',
      price: '$110.000/año',
      features: [
        'Todo lo del Plan Premium',
        'Prioridad en agendamiento',
        'Emergencias sin costo adicional',
        'Descuento 25% en reparaciones',
        'Extensión de garantía',
      ],
    },
  ];

  const warranty = [
    {
      icon: CheckCircle,
      title: 'Garantía en Reparaciones',
      description: '90 días de garantía en todas las reparaciones realizadas',
    },
    {
      icon: Shield,
      title: 'Técnicos Certificados',
      description: 'Profesionales con certificación SEC y capacitación continua',
    },
    {
      icon: Clock,
      title: 'Atención Rápida',
      description: 'Servicio de urgencia disponible en menos de 48 horas',
    },
    {
      icon: ThermometerSun,
      title: 'Diagnóstico Gratis',
      description: 'Evaluación sin costo al contratar el servicio',
    },
  ];

  return (
    <Layout
      title="Servicios de Mantención y Reparación de Aires Acondicionados"
      description="Mantención preventiva, reparación y servicio técnico especializado. Técnicos certificados en todo Chile."
      keywords="mantención aires acondicionados, reparación AC, servicio técnico, carga de gas"
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
              Servicio Técnico{' '}
              <span className="text-gradient">Profesional</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-text-muted mb-8"
            >
              Mantención, reparación y servicio postventa con técnicos
              certificados. Prolonga la vida útil de tu equipo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="primary"
                size="md"
                onClick={() =>
                  window.open(`https://wa.me/${env.contact.whatsapp}`, '_blank')
                }
              >
                <Phone className="mr-2 w-5 h-5" />
                Solicitar servicio
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Soluciones completas para mantener tu aire acondicionado en
              perfecto estado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-bg-muted rounded-card-lg p-8 ${
                  service.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 right-6 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más popular
                  </div>
                )}
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-text-muted mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-primary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-border-soft">
                  <span className="text-lg font-semibold text-primary">
                    {service.price}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${env.contact.whatsapp}`,
                        '_blank'
                      )
                    }
                  >
                    Solicitar
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes de Mantención */}
      <section className="py-16 bg-bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">
              Planes de Mantención
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Mantén tu equipo siempre en óptimas condiciones con nuestros
              planes anuales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {maintenancePlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-card-lg p-8 ${
                  plan.recommended ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full text-sm font-medium">
                    Recomendado
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-text-muted mb-4">{plan.visits}</p>
                  <div className="text-3xl font-bold text-primary">
                    {plan.price}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-primary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.recommended ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() =>
                    window.open(
                      `https://wa.me/${env.contact.whatsapp}`,
                      '_blank'
                    )
                  }
                >
                  Contratar plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantías */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">
              Nuestras Garantías
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Compromiso con la calidad y satisfacción del cliente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warranty.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">
              ¿Necesitas un servicio técnico?
            </h2>
            <p className="text-text-muted mb-8">
              Agenda tu mantención o reparación con nuestros expertos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="md"
                onClick={() =>
                  window.open(`https://wa.me/${env.contact.whatsapp}`, '_blank')
                }
              >
                <Phone className="mr-2 w-5 h-5" />
                Contactar ahora
              </Button>
              <Link to="/productos">
                <Button variant="outline" size="md">
                  Ver productos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
