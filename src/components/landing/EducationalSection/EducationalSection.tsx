import React from 'react';
import { Leaf, Zap, TrendingDown, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const EducationalSection: React.FC = () => {
  return (
    <section className="py-16 bg-bg-muted">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Izquierda: Eficiencia energética */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-success" />
              </div>
              <h2 className="text-h2 font-semibold text-text-primary">
                Eficiencia energética que se nota en la cuenta de luz
              </h2>
            </div>

            <p className="text-text-muted mb-6 leading-relaxed">
              Los aires acondicionados con tecnología Inverter y clasificación energética A++ o superior pueden reducir tu consumo eléctrico hasta en un 70% comparado con equipos convencionales. La inversión inicial se recupera en ahorro de luz en menos de 2 años.
            </p>

            <p className="text-text-muted mb-6 leading-relaxed">
              La etiqueta energética te muestra el consumo real del equipo. Busca siempre la mayor cantidad de estrellas y la letra A con múltiples signos "+". Esto se traduce en menor gasto mensual y menor impacto ambiental.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-text-muted">
                  <strong>Tecnología Inverter:</strong> Ajusta la potencia según necesidad, sin apagar y encender constantemente
                </p>
              </div>
              <div className="flex items-start gap-3">
                <TrendingDown className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-text-muted">
                  <strong>Ahorro comprobado:</strong> Hasta $50.000 CLP menos al año en consumo eléctrico
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-text-muted">
                  <strong>Menor huella de carbono:</strong> Contribuyes al cuidado del medio ambiente
                </p>
              </div>
            </div>
          </motion.div>

          {/* Derecha: Calculadora */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Imagen de fondo */}
              <div className="aspect-video rounded-card-lg overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Living con vista al mar"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>

              {/* Card calculadora */}
              <div className="bg-white rounded-card-lg shadow-soft-lg p-6 -mt-16 relative z-10 mx-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-h3 font-semibold text-text-primary">
                    Calculadora de Aire Acondicionado
                  </h3>
                </div>

                <p className="text-text-muted mb-6">
                  No todos los espacios necesitan la misma capacidad. Factores como los metros cuadrados, altura del techo, cantidad de ventanas y orientación solar influyen en el tamaño ideal de tu equipo.
                </p>

                <p className="text-sm text-text-muted mb-6">
                  Usa nuestra calculadora para determinar la capacidad exacta que necesitas y evita gastar de más en un equipo sobre-dimensionado o sufrir con uno pequeño.
                </p>

                <Link to="/calculadora" className="btn-primary w-full justify-center">
                  Calcular capacidad recomendada
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
