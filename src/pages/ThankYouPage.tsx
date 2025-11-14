import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button } from '../components/common';

export const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const { orderNumber } = (location.state as any) || {};

  return (
    <Layout
      title="¡Gracias por tu compra!"
      description="Tu pedido ha sido recibido exitosamente"
    >
      <section className="py-20 bg-bg-muted min-h-[70vh] flex items-center">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <div className="card p-12">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>

            <h1 className="text-h1 font-bold text-text-primary mb-4">
              ¡Pedido confirmado!
            </h1>

            {orderNumber && (
              <p className="text-lg text-text-muted mb-6">
                Tu número de pedido es:{' '}
                <span className="font-bold text-primary">#{orderNumber}</span>
              </p>
            )}

            <p className="text-text-muted mb-8">
              Hemos recibido tu pedido y te enviaremos un email con los
              detalles. Si incluiste instalación profesional, nos contactaremos
              contigo en las próximas 24 horas para coordinar la fecha.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="primary">Volver al inicio</Button>
              </Link>
              <Link to="/productos">
                <Button variant="outline">Ver más productos</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
