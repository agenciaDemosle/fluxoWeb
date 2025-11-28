import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Briefcase, User, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  category: {
    icon: React.ElementType;
    text: string;
  };
  title: {
    line1: string;
    line2: string;
    highlight: string; // palabra a destacar en celeste
  };
  description: string;
  badge: {
    icon: React.ElementType;
    text: string;
  };
  price: {
    from: string;
    amount: string;
  };
  cta: {
    text: string;
    link: string;
  };
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    category: {
      icon: Home,
      text: 'Descubre más equipos para tu dormitorio',
    },
    title: {
      line1: 'Split Inverter 9000 BTU',
      line2: 'para un descanso perfecto',
      highlight: 'descanso perfecto',
    },
    description: 'Tecnología inverter silenciosa que cuida tu sueño',
    badge: {
      icon: Shield,
      text: 'Recomendado por técnicos certificados',
    },
    price: {
      from: 'Desde',
      amount: '$469.990',
    },
    cta: {
      text: 'Ver detalles',
      link: '/productos?categoria=split-muro',
    },
    image: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=1200&q=80',
  },
  {
    id: 2,
    category: {
      icon: Home,
      text: 'Los mejores equipos para tu living',
    },
    title: {
      line1: 'Climatiza tu espacio',
      line2: 'favorito sin complicarte',
      highlight: 'favorito',
    },
    description: 'Potencia ideal para espacios amplios y compartidos',
    badge: {
      icon: Shield,
      text: 'Instalación profesional incluida',
    },
    price: {
      from: 'Desde',
      amount: '$589.990',
    },
    cta: {
      text: 'Ver opciones',
      link: '/productos?categoria=split-muro',
    },
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
  },
  {
    id: 3,
    category: {
      icon: Briefcase,
      text: 'Configura tu espacio de trabajo ideal',
    },
    title: {
      line1: 'Trabaja fresco',
      line2: 'todo el día',
      highlight: 'fresco',
    },
    description: 'Concentración máxima con temperatura perfecta',
    badge: {
      icon: User,
      text: 'Elegido por profesionales',
    },
    price: {
      from: 'Desde',
      amount: '$429.990',
    },
    cta: {
      text: 'Explorar',
      link: '/productos',
    },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];
  const CategoryIcon = slide.category.icon;
  const BadgeIcon = slide.badge.icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const renderTitle = () => {
    const fullTitle = `${slide.title.line1} ${slide.title.line2}`;
    const parts = fullTitle.split(slide.title.highlight);

    return (
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-1">
        {parts[0]}
        <span className="text-[#4A9FD8]">{slide.title.highlight}</span>
        {parts[1]}
      </h1>
    );
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[700px] lg:h-[75vh] lg:min-h-[600px] bg-[#FAFBFC]">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'tween', duration: 0.5, ease: 'easeInOut' },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0"
        >
          <div className="h-full max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full items-center pt-8 lg:pt-0">
              {/* Left Content */}
              <div className="flex flex-col justify-center space-y-4 lg:space-y-6 lg:pr-16">
                {/* Category Chip */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-white rounded-full border border-gray-200 shadow-sm w-fit"
                >
                  <CategoryIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-600" strokeWidth={1.5} />
                  <span className="text-[11px] lg:text-[13px] font-medium text-gray-700">
                    {slide.category.text}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2 lg:space-y-3"
                >
                  {renderTitle()}

                  {/* Subtle underline */}
                  <div className="flex items-center gap-2">
                    <div className="h-[2px] w-10 lg:w-12 bg-[#FF8B6A] rounded-full" />
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm lg:text-lg text-gray-600 max-w-md leading-relaxed"
                >
                  {slide.description}
                </motion.p>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center gap-1.5 lg:gap-2 px-2.5 py-1.5 lg:px-3 lg:py-2 bg-gray-50 rounded-full border border-gray-200 w-fit"
                >
                  <BadgeIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-600" strokeWidth={1.5} />
                  <span className="text-[10px] lg:text-[12px] font-medium text-gray-700">
                    {slide.badge.text}
                  </span>
                </motion.div>

                {/* CTA + Price */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-8 pt-2 lg:pt-4"
                >
                  <Link
                    to={slide.cta.link}
                    className="group inline-flex items-center gap-2 px-6 py-2.5 lg:px-8 lg:py-3.5 bg-white hover:bg-[#4A9FD8] border-2 border-[#4A9FD8] rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <span className="text-[13px] lg:text-[15px] font-semibold text-gray-900 group-hover:text-white transition-colors">
                      {slide.cta.text}
                    </span>
                  </Link>

                  <div className="flex flex-col">
                    <span className="text-[10px] lg:text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                      {slide.price.from}
                    </span>
                    <span className="text-xl lg:text-2xl font-bold text-gray-900 mt-0.5">
                      {slide.price.amount}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="hidden lg:flex h-full items-center justify-end"
              >
                <div className="relative w-full h-[85%] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={slide.image}
                    alt={slide.title.line1}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-gray-50 rounded-full shadow-md flex items-center justify-center transition-all duration-200 group"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-gray-50 rounded-full shadow-md flex items-center justify-center transition-all duration-200 group"
      >
        <ChevronRight className="w-5 h-5 text-gray-700 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-6 h-2 bg-[#4A9FD8]'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 border border-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
