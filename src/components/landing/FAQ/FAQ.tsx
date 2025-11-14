import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    id: 1,
    question: '¿Qué tamaño de aire acondicionado necesito?',
    answer: 'El tamaño depende de los metros cuadrados del espacio. Como regla general: habitaciones hasta 15m² requieren 9000 BTU, hasta 25m² necesitan 12000 BTU, hasta 35m² requieren 18000 BTU. Nuestra calculadora AC te ayuda a determinar el tamaño exacto considerando altura de techo, ventanas y orientación.',
  },
  {
    id: 2,
    question: '¿La instalación está incluida en el precio?',
    answer: 'Ofrecemos dos opciones: "Solo equipo" sin instalación, o "Equipo + instalación profesional" que incluye todo el servicio de instalación certificada, puesta en marcha y garantía extendida. El precio de instalación se muestra claramente antes de agregar al carrito.',
  },
  {
    id: 3,
    question: '¿Cuánto dura la garantía?',
    answer: 'Todos nuestros equipos incluyen la garantía oficial del fabricante (1-3 años según marca). Si eliges instalación profesional, extendemos la cobertura de la instalación por 2 años adicionales sin costo. Esto cubre cualquier problema relacionado con el montaje o conexiones.',
  },
  {
    id: 4,
    question: '¿Ofrecen mantención y limpieza?',
    answer: 'Sí, tenemos planes de mantención preventiva anual que incluyen limpieza profunda de filtros, revisión de gas refrigerante, chequeo eléctrico y optimización de rendimiento. El servicio se realiza 2 veces al año y ayuda a mantener la eficiencia energética del equipo.',
  },
  {
    id: 5,
    question: '¿En cuánto tiempo puedo agendar la instalación?',
    answer: 'Una vez confirmada tu compra, nuestro equipo se contacta contigo en las próximas 24 horas para coordinar la instalación. Generalmente podemos agendar dentro de 48-72 horas, dependiendo de tu ubicación y disponibilidad. Trabajamos de lunes a sábado.',
  },
  {
    id: 6,
    question: '¿Qué incluye la instalación profesional?',
    answer: 'La instalación incluye: montaje de unidad interior y exterior, cañerías de hasta 3 metros, cableado eléctrico, perforación de muro, sello hermético, carga de gas (si requiere), puesta en marcha, pruebas de funcionamiento y limpieza del área de trabajo. Materiales adicionales se cobran aparte.',
  },
];

const FAQItem: React.FC<{ faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }> = ({
  faq,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-border-soft last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg pr-8">{faq.question}</span>
        <ChevronDown
          className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-text-muted leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-h2 font-semibold text-text-primary mb-4">
            ¿Tienes dudas?
          </h2>
          <p className="text-text-muted">
            Encuentra respuestas a las preguntas más frecuentes
          </p>
        </div>

        <div className="bg-white rounded-card-lg shadow-soft p-8">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-text-muted mb-4">
            ¿No encontraste lo que buscabas?
          </p>
          <a
            href={`https://wa.me/${import.meta.env.VITE_CONTACT_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            Contáctanos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
