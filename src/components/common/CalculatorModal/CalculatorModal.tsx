import React, { useState, useEffect } from 'react';
import { X, Calculator, Wind, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../Button';
import { useProductsByBTU } from '../../../hooks';
import { ProductCard } from '../../product/ProductCard';
import { Spinner } from '../Spinner';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose }) => {
  const [area, setArea] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [height, setHeight] = useState<string>('2.4');
  const [floor, setFloor] = useState<string>('medio');
  const [sunExposure, setSunExposure] = useState<string>('medio');
  const [people, setPeople] = useState<string>('2');
  const [appliances, setAppliances] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [useManualArea, setUseManualArea] = useState<boolean>(true);

  // Función para obtener recomendación de BTU
  const getBTURecommendation = () => {
    if (!result) return null;

    const ranges = [
      { min: 0, max: 9000, label: '9.000 BTU', tons: '0.75 Ton' },
      { min: 9001, max: 12000, label: '12.000 BTU', tons: '1 Ton' },
      { min: 12001, max: 18000, label: '18.000 BTU', tons: '1.5 Ton' },
      { min: 18001, max: 24000, label: '24.000 BTU', tons: '2 Ton' },
      { min: 24001, max: 30000, label: '30.000 BTU', tons: '2.5 Ton' },
      { min: 30001, max: 36000, label: '36.000 BTU', tons: '3 Ton' },
      { min: 36001, max: Infinity, label: '48.000+ BTU', tons: '4+ Ton' },
    ];

    return ranges.find((range) => result >= range.min && result <= range.max);
  };

  // Obtener recomendación y productos
  const recommendation = getBTURecommendation();
  const recommendedBTU = recommendation ? parseInt(recommendation.label.replace(/[^0-9]/g, '')) : null;
  const { data: recommendedProducts, isLoading: isLoadingProducts } = useProductsByBTU(recommendedBTU);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const calculateBTU = () => {
    let calculatedArea: number;

    if (useManualArea) {
      calculatedArea = parseFloat(area) || 0;
    } else {
      const w = parseFloat(width) || 0;
      const l = parseFloat(length) || 0;
      calculatedArea = w * l;
    }

    if (calculatedArea <= 0) {
      return;
    }

    // Cálculo base: 600 BTU por m²
    let btu = calculatedArea * 600;

    // Ajuste por piso
    if (floor === 'ultimo') {
      btu *= 1.15;
    } else if (floor === 'primero') {
      btu *= 1.05;
    }

    // Ajuste por exposición solar
    if (sunExposure === 'alta') {
      btu *= 1.2;
    } else if (sunExposure === 'baja') {
      btu *= 0.9;
    }

    // Ajuste por personas
    const numPeople = parseInt(people) || 2;
    btu += (numPeople - 2) * 600;

    // Ajuste por electrodomésticos
    if (appliances) {
      btu += 1000;
    }

    // Ajuste por altura del techo
    const h = parseFloat(height) || 2.4;
    if (h > 2.8) {
      btu *= 1.1;
    }

    setResult(Math.round(btu));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl bg-white rounded-[32px] shadow-soft-lg overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary-dark px-8 py-6 text-white">
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Calculadora de BTU</h2>
                      <p className="text-white/80 text-sm">Encuentra el equipo perfecto para tu espacio</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 max-h-[70vh] overflow-y-auto">
                  {!result ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                      {/* Formulario */}
                      <div className="lg:col-span-2">
                        <div className="bg-bg-muted rounded-card-lg p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-6">
                          Datos de tu espacio
                        </h3>

                        {/* Toggle Área Manual vs Dimensiones */}
                        <div className="mb-6 flex gap-2">
                          <button
                            onClick={() => setUseManualArea(true)}
                            className={`flex-1 py-2.5 px-4 rounded-pill font-medium text-sm transition-all ${
                              useManualArea
                                ? 'bg-primary text-white shadow-soft'
                                : 'bg-white text-text-muted hover:bg-white/80'
                            }`}
                          >
                            Área (m²)
                          </button>
                          <button
                            onClick={() => setUseManualArea(false)}
                            className={`flex-1 py-2.5 px-4 rounded-pill font-medium text-sm transition-all ${
                              !useManualArea
                                ? 'bg-primary text-white shadow-soft'
                                : 'bg-white text-text-muted hover:bg-white/80'
                            }`}
                          >
                            Dimensiones
                          </button>
                        </div>

                        {useManualArea ? (
                          <div className="mb-5">
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              Área total (m²)
                            </label>
                            <input
                              type="number"
                              value={area}
                              onChange={(e) => setArea(e.target.value)}
                              placeholder="Ej: 20"
                              className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            />
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-4 mb-5">
                            <div>
                              <label className="block text-sm font-medium text-text-primary mb-2">
                                Ancho (m)
                              </label>
                              <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                placeholder="Ej: 4"
                                className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-text-primary mb-2">
                                Largo (m)
                              </label>
                              <input
                                type="number"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                placeholder="Ej: 5"
                                className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                              />
                            </div>
                          </div>
                        )}

                        <div className="space-y-5">
                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              Altura del techo (m)
                            </label>
                            <input
                              type="number"
                              value={height}
                              onChange={(e) => setHeight(e.target.value)}
                              step="0.1"
                              placeholder="Ej: 2.4"
                              className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              Ubicación del piso
                            </label>
                            <select
                              value={floor}
                              onChange={(e) => setFloor(e.target.value)}
                              className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            >
                              <option value="primero">Primer piso</option>
                              <option value="medio">Piso intermedio</option>
                              <option value="ultimo">Último piso / Ático</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              Exposición solar
                            </label>
                            <select
                              value={sunExposure}
                              onChange={(e) => setSunExposure(e.target.value)}
                              className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            >
                              <option value="baja">Baja (sombra la mayor parte del día)</option>
                              <option value="medio">Media (sol parcial)</option>
                              <option value="alta">Alta (sol directo todo el día)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              Número de personas
                            </label>
                            <input
                              type="number"
                              value={people}
                              onChange={(e) => setPeople(e.target.value)}
                              placeholder="Ej: 2"
                              className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            />
                          </div>

                          <div>
                            <label className="flex items-start space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={appliances}
                                onChange={(e) => setAppliances(e.target.checked)}
                                className="w-5 h-5 text-primary border-border-soft rounded mt-0.5 focus:ring-2 focus:ring-primary"
                              />
                              <span className="text-sm text-text-primary">
                                Hay electrodomésticos que generan calor (TV, computadora, cocina, etc.)
                              </span>
                            </label>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          fullWidth
                          size="md"
                          onClick={calculateBTU}
                          className="mt-6 rounded-pill"
                        >
                          <Calculator className="mr-2 w-5 h-5" />
                          Calcular BTU necesarios
                        </Button>
                      </div>
                    </div>

                    {/* Resultado */}
                    <div className="lg:col-span-1">
                      <div className="bg-gradient-to-br from-primary/10 to-sand-light rounded-card-lg p-6 sticky top-0">
                        <div className="flex items-center space-x-2 mb-6">
                          <Wind className="w-6 h-6 text-primary" />
                          <h3 className="text-lg font-semibold text-text-primary">
                            Resultado
                          </h3>
                        </div>

                        {result ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-4"
                          >
                            <div className="bg-white rounded-xl p-5 text-center shadow-soft">
                              <p className="text-xs text-text-muted mb-2 uppercase tracking-wide">
                                BTU calculados
                              </p>
                              <p className="text-4xl font-bold text-primary mb-1">
                                {result.toLocaleString()}
                              </p>
                              <p className="text-xs text-text-light">BTU/h</p>
                            </div>

                            {recommendation && (
                              <div className="bg-white rounded-xl p-5 shadow-soft">
                                <p className="text-xs font-medium text-text-muted mb-3 uppercase tracking-wide">
                                  Equipo recomendado:
                                </p>
                                <div className="space-y-1">
                                  <p className="text-2xl font-bold text-gradient">
                                    {recommendation.label}
                                  </p>
                                  <p className="text-sm text-text-muted">
                                    ({recommendation.tons})
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="bg-primary/10 rounded-xl p-4 mt-4">
                              <div className="flex items-start space-x-2">
                                <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-text-primary leading-relaxed">
                                  Este cálculo es una estimación. Para instalaciones comerciales o espacios especiales, consulta con nuestros expertos.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="text-center py-8">
                            <Calculator className="w-16 h-16 text-primary/20 mx-auto mb-4" />
                            <p className="text-sm text-text-muted">
                              Completa los datos para calcular los BTU necesarios
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  ) : (
                    /* Vista de Resultados */
                    <div className="space-y-6">
                      {/* Resultado BTU */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                      >
                        <div className="bg-white rounded-xl p-8 shadow-soft-lg border-2 border-primary/20">
                          <p className="text-sm text-text-muted mb-2 uppercase tracking-wide font-semibold">
                            BTU calculados
                          </p>
                          <p className="text-6xl font-bold text-primary mb-2">
                            {result.toLocaleString()}
                          </p>
                          <p className="text-sm text-text-light">BTU/h</p>

                          {recommendation && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                              <p className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wide">
                                Equipo recomendado
                              </p>
                              <p className="text-3xl font-bold text-gradient">
                                {recommendation.label}
                              </p>
                              <p className="text-sm text-text-muted mt-1">
                                ({recommendation.tons})
                              </p>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => setResult(null)}
                          className="mt-4 text-sm text-primary hover:text-primary-dark font-medium underline"
                        >
                          ← Volver a calcular
                        </button>
                      </motion.div>

                      {/* Mensaje de estimación */}
                      <div className="bg-primary/10 rounded-xl p-4">
                        <div className="flex items-start space-x-2">
                          <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-text-primary leading-relaxed">
                            Este cálculo es una estimación. Para instalaciones comerciales o espacios especiales, consulta con nuestros expertos.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Productos Recomendados */}
                  {result && recommendation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="border-t border-gray-200 pt-8 mt-6"
                    >
                      <div className="mb-8 text-center">
                        <h3 className="text-3xl font-bold text-text-primary mb-3">
                          Según nuestros cálculos, te recomendamos estos productos
                        </h3>
                        <p className="text-base text-text-muted max-w-2xl mx-auto">
                          Equipos de {recommendation.label} perfectos para las características de tu espacio
                        </p>
                      </div>

                      {isLoadingProducts ? (
                        <div className="flex justify-center py-12">
                          <Spinner size="md" text="Buscando equipos..." />
                        </div>
                      ) : recommendedProducts && recommendedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {recommendedProducts.map((product) => (
                            <div key={product.id} onClick={onClose}>
                              <ProductCard product={product} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-bg-muted rounded-xl p-6 text-center">
                          <p className="text-text-muted">
                            No encontramos productos específicos para {recommendation.label}.{' '}
                            <Link
                              to="/productos"
                              onClick={onClose}
                              className="text-primary hover:underline font-medium"
                            >
                              Ver todos los equipos disponibles
                            </Link>
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
