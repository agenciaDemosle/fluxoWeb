import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    location: 'Santiago Centro',
    rating: 5,
    text: 'Excelente servicio de instalación. Llegaron puntuales, instalaron el aire en menos de 3 horas y dejaron todo impecable. El equipo funciona perfecto y gasta mucho menos luz que el anterior. 100% recomendado.',
    date: 'Hace 2 semanas',
  },
  {
    id: 2,
    name: 'Carlos Muñoz',
    location: 'Providencia',
    rating: 5,
    text: 'Compré un Split 18000 BTU con instalación incluida. El proceso fue muy fácil, me contactaron al día siguiente para agendar y el técnico fue súper profesional. El precio con instalación es mucho mejor que comprar por separado.',
    date: 'Hace 1 mes',
  },
  {
    id: 3,
    name: 'Patricia Silva',
    location: 'Maipú',
    rating: 5,
    text: 'La verdad es que dudaba si incluir la instalación, pero fue la mejor decisión. El técnico explicó todo, hizo pruebas de funcionamiento y me enseñó a usar todas las funciones. Además mantiene la garantía del fabricante intacta.',
    date: 'Hace 3 semanas',
  },
  {
    id: 4,
    name: 'Roberto Fernández',
    location: 'Las Condes',
    rating: 5,
    text: 'Compré 3 aires para mi casa. El servicio post venta es excelente, me ayudaron a elegir las capacidades correctas para cada habitación. Los instaladores trabajaron muy prolijo y coordinado. Muy satisfecho.',
    date: 'Hace 2 meses',
  },
  {
    id: 5,
    name: 'Andrea Torres',
    location: 'Ñuñoa',
    rating: 5,
    text: 'Mi aire llegó en 48 horas como prometieron. La instalación fue rápida y profesional. Lo que más me gustó es que me explicaron el mantenimiento y me dejaron toda la documentación. El equipo es silencioso y enfría rapidísimo.',
    date: 'Hace 1 semana',
  },
  {
    id: 6,
    name: 'Jorge Ramírez',
    location: 'Peñalolén',
    rating: 5,
    text: 'Llevaba meses comparando precios y opciones. Acá encontré la mejor relación precio-calidad con instalación incluida. El proceso de compra fue simple y el seguimiento post instalación impecable. Volveré a comprar sin dudarlo.',
    date: 'Hace 1 mes',
  },
];

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[current];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-white to-accent-soft">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-h2 font-semibold text-text-primary mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-text-muted">
            Miles de familias ya confían en nosotros
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Imagen lado izquierdo */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="aspect-square rounded-card-lg overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                    alt="Cliente satisfecho"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-soft rounded-full" />
                <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/20" />
              </div>
            </div>

            {/* Testimonio lado derecho */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-card-lg p-8 shadow-soft-lg"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-warning fill-warning"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-lg text-text-primary mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-text-primary">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-text-muted">
                        {testimonial.location}
                      </p>
                    </div>
                    <p className="text-xs text-text-muted">
                      {testimonial.date}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prev}
                  className="p-2 rounded-full bg-white shadow-soft hover:shadow-soft-md transition-all hover:bg-primary hover:text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === current
                          ? 'bg-primary w-8'
                          : 'bg-border-soft hover:bg-primary/50'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="p-2 rounded-full bg-white shadow-soft hover:shadow-soft-md transition-all hover:bg-primary hover:text-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
