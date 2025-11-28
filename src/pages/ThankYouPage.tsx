import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Calendar, Phone, Building2, Copy } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { toast } from 'react-hot-toast';
import { useBankDetails } from '../hooks';

export const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const { orderNumber, hasInstallation, paymentMethod, total } = (location.state as any) || {};
  const { data: bankDetails, isLoading: loadingBankDetails } = useBankDetails();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado al portapapeles`);
  };

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
              Hemos recibido tu pedido y te enviaremos un email con los detalles.
            </p>

            {/* Sección de transferencia bancaria */}
            {paymentMethod === 'bacs' && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8 text-left">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      💳 Datos para Transferencia Bancaria
                    </h3>
                    <p className="text-sm text-blue-800 mb-4">
                      {bankDetails?.instructions || 'Realiza la transferencia con los siguientes datos y envíanos el comprobante por WhatsApp o email.'}
                    </p>
                  </div>
                </div>

                {loadingBankDetails ? (
                  <div className="bg-white rounded-lg p-4 border border-blue-200 text-center">
                    <p className="text-gray-500">Cargando datos bancarios...</p>
                  </div>
                ) : bankDetails ? (
                  <>
                    <div className="bg-white rounded-lg p-4 space-y-3 border border-blue-200">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-600">Monto a transferir:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-blue-600">
                            ${total?.toLocaleString('es-CL')} CLP
                          </span>
                          <button
                            onClick={() => copyToClipboard(total?.toString() || '', 'Monto')}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Copiar monto"
                          >
                            <Copy className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Banco:</span>
                        <span className="font-semibold text-gray-900">{bankDetails.bank_name}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Tipo de cuenta:</span>
                        <span className="font-semibold text-gray-900">{bankDetails.account_type}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Número de cuenta:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{bankDetails.account_number}</span>
                          <button
                            onClick={() => copyToClipboard(bankDetails.account_number, 'Número de cuenta')}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Copiar cuenta"
                          >
                            <Copy className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">RUT:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{bankDetails.rut}</span>
                          <button
                            onClick={() => copyToClipboard(bankDetails.rut, 'RUT')}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Copiar RUT"
                          >
                            <Copy className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Titular:</span>
                        <span className="font-semibold text-gray-900">{bankDetails.account_holder}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Email:</span>
                        <span className="font-semibold text-gray-900">{bankDetails.email}</span>
                      </div>
                    </div>

                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800 font-medium mb-2">
                        📸 Importante: Envía tu comprobante
                      </p>
                      <p className="text-xs text-yellow-700 mb-3">
                        Una vez realizada la transferencia, envía el comprobante indicando tu número de pedido <strong>#{orderNumber}</strong>
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        {bankDetails.phone && (
                          <a
                            href={`https://wa.me/${bankDetails.phone.replace(/\D/g, '')}?text=Hola, realicé una transferencia para el pedido #${orderNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button variant="primary" size="sm" className="w-full">
                              📱 Enviar por WhatsApp
                            </Button>
                          </a>
                        )}
                        <a
                          href={`mailto:${bankDetails.email}?subject=Comprobante Pedido #${orderNumber}`}
                          className="flex-1"
                        >
                          <Button variant="outline" size="sm" className="w-full">
                            📧 Enviar por Email
                          </Button>
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-lg p-4 border border-blue-200 text-center">
                    <p className="text-red-600">Error al cargar datos bancarios. Por favor contacta al vendedor.</p>
                  </div>
                )}
              </div>
            )}

            {/* Sección de instalación si aplica */}
            {hasInstallation && (
              <div className="bg-success/5 border-2 border-success/30 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-success" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-semibold text-success mb-2">
                      ⚙️ Instalación Profesional Incluida
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Tu pedido incluye instalación profesional por nuestro equipo certificado. Agenda tu instalación ahora para elegir fecha y horario.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => window.open('https://cal.com/agencia-demosle-ayxtzv/agendar-instalacion', '_blank')}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar Instalación
                  </Button>
                  <a
                    href="tel:+56912345678"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Llamar para agendar
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  Horarios: Lun-Vie 9:00-18:00 | Sáb 9:00-14:00
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="primary" size="sm">Volver al inicio</Button>
              </Link>
              <Link to="/productos">
                <Button variant="outline" size="sm">Ver más productos</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
