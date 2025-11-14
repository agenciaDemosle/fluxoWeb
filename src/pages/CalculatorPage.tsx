import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  ArrowRight,
  Info,
  Sun,
  Users,
  Home,
  ThermometerSun,
  Wind,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout';
import { Button } from '../components/common';

const CalculatorPage: React.FC = () => {
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
      btu *= 1.15; // +15% para último piso
    } else if (floor === 'primero') {
      btu *= 1.05; // +5% para primer piso
    }

    // Ajuste por exposición solar
    if (sunExposure === 'alta') {
      btu *= 1.2; // +20% para alta exposición
    } else if (sunExposure === 'baja') {
      btu *= 0.9; // -10% para baja exposición
    }

    // Ajuste por personas
    const numPeople = parseInt(people) || 2;
    btu += (numPeople - 2) * 600; // 600 BTU por persona adicional

    // Ajuste por electrodomésticos
    if (appliances) {
      btu += 1000; // 1000 BTU adicionales
    }

    // Ajuste por altura del techo
    const h = parseFloat(height) || 2.4;
    if (h > 2.8) {
      btu *= 1.1; // +10% para techos altos
    }

    setResult(Math.round(btu));
  };

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

    const recommendation = ranges.find(
      (range) => result >= range.min && result <= range.max
    );

    return recommendation;
  };

  const tips = [
    {
      icon: Sun,
      title: 'Exposición Solar',
      description:
        'Una habitación con sol directo necesita más capacidad de enfriamiento',
    },
    {
      icon: Users,
      title: 'Cantidad de Personas',
      description: 'Cada persona adicional agrega calor al ambiente',
    },
    {
      icon: Home,
      title: 'Ubicación del Piso',
      description:
        'Últimos pisos y áticos requieren mayor capacidad por exposición al sol',
    },
    {
      icon: ThermometerSun,
      title: 'Electrodomésticos',
      description:
        'Equipos que generan calor aumentan la carga térmica del espacio',
    },
  ];

  const recommendation = getBTURecommendation();

  return (
    <Layout
      title="Calculadora de BTU para Aires Acondicionados"
      description="Calcula los BTU necesarios para climatizar tu espacio. Herramienta gratuita y precisa para elegir el aire acondicionado correcto."
      keywords="calculadora BTU, calcular aire acondicionado, BTU necesarios, tamaño AC"
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-bg-muted py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Calculator className="w-10 h-10 text-primary" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-h1 md:text-h1-lg font-bold text-text-primary mb-6"
            >
              Calculadora de{' '}
              <span className="text-gradient">BTU</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-text-muted mb-8"
            >
              Descubre la capacidad exacta de aire acondicionado que necesitas
              para tu espacio
            </motion.p>
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulario */}
              <div className="lg:col-span-2">
                <div className="bg-bg-muted rounded-card-lg p-8">
                  <h2 className="text-h3 font-semibold text-text-primary mb-6">
                    Datos de tu espacio
                  </h2>

                  {/* Toggle Área Manual vs Dimensiones */}
                  <div className="mb-6 flex gap-2">
                    <button
                      onClick={() => setUseManualArea(true)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                        useManualArea
                          ? 'bg-primary text-white'
                          : 'bg-white text-text-muted hover:bg-white/80'
                      }`}
                    >
                      Área (m²)
                    </button>
                    <button
                      onClick={() => setUseManualArea(false)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                        !useManualArea
                          ? 'bg-primary text-white'
                          : 'bg-white text-text-muted hover:bg-white/80'
                      }`}
                    >
                      Dimensiones
                    </button>
                  </div>

                  {useManualArea ? (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Área total (m²)
                      </label>
                      <input
                        type="number"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Ej: 20"
                        className="w-full px-4 py-3 bg-white border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Ancho (m)
                        </label>
                        <input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          placeholder="Ej: 4"
                          className="w-full px-4 py-3 bg-white border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                          className="w-full px-4 py-3 bg-white border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Altura del techo (m)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      step="0.1"
                      placeholder="Ej: 2.4"
                      className="w-full px-4 py-3 bg-white border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Ubicación del piso
                    </label>
                    <select
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="primero">Primer piso</option>
                      <option value="medio">Piso intermedio</option>
                      <option value="ultimo">Último piso / Ático</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Exposición solar
                    </label>
                    <select
                      value={sunExposure}
                      onChange={(e) => setSunExposure(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="baja">Baja (sombra la mayor parte del día)</option>
                      <option value="medio">Media (sol parcial)</option>
                      <option value="alta">Alta (sol directo todo el día)</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Número de personas
                    </label>
                    <input
                      type="number"
                      value={people}
                      onChange={(e) => setPeople(e.target.value)}
                      placeholder="Ej: 2"
                      className="w-full px-4 py-3 bg-white border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={appliances}
                        onChange={(e) => setAppliances(e.target.checked)}
                        className="w-5 h-5 text-primary border-border-soft rounded focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-sm text-text-primary">
                        Hay electrodomésticos que generan calor (TV, computadora,
                        cocina, etc.)
                      </span>
                    </label>
                  </div>

                  <Button
                    variant="primary"
                    fullWidth
                    size="md"
                    onClick={calculateBTU}
                  >
                    <Calculator className="mr-2 w-5 h-5" />
                    Calcular BTU necesarios
                  </Button>
                </div>
              </div>

              {/* Resultado */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-primary/10 to-bg-muted rounded-card-lg p-8 sticky top-24">
                  <div className="flex items-center space-x-2 mb-6">
                    <Wind className="w-6 h-6 text-primary" />
                    <h3 className="text-h3 font-semibold text-text-primary">
                      Resultado
                    </h3>
                  </div>

                  {result ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="bg-white rounded-lg p-6 text-center">
                        <p className="text-sm text-text-muted mb-2">
                          BTU calculados
                        </p>
                        <p className="text-4xl font-bold text-primary mb-1">
                          {result.toLocaleString()}
                        </p>
                        <p className="text-xs text-text-muted">BTU/h</p>
                      </div>

                      {recommendation && (
                        <div className="bg-white rounded-lg p-6">
                          <p className="text-sm font-medium text-text-primary mb-3">
                            Equipo recomendado:
                          </p>
                          <div className="space-y-2">
                            <p className="text-2xl font-bold text-gradient">
                              {recommendation.label}
                            </p>
                            <p className="text-sm text-text-muted">
                              ({recommendation.tons})
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="bg-primary/10 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-text-primary">
                            Este cálculo es una estimación. Para instalaciones
                            comerciales o espacios especiales, consulta con nuestros
                            expertos.
                          </p>
                        </div>
                      </div>

                      <Link to="/productos">
                        <Button variant="primary" fullWidth size="sm">
                          Ver equipos disponibles
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </motion.div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                      <p className="text-sm text-text-muted">
                        Completa los datos para calcular los BTU necesarios
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 bg-bg-muted">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-semibold text-text-primary mb-4">
                Factores que afectan el cálculo
              </h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                Estos elementos influyen en la capacidad de refrigeración necesaria
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-card-lg p-6 text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tip.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-text-muted">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CalculatorPage;
