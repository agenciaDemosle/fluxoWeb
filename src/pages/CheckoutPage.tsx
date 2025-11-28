import React, { useMemo, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { useCartStore } from '../store/useCartStore';
import { useCheckout, useShippingZones, usePaymentMethods, useInstallationCosts } from '../hooks';
import { toast } from 'react-hot-toast';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Nombre muy corto'),
  lastName: z.string().min(2, 'Apellido muy corto'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Teléfono inválido'),
  rut: z.string().optional(),
  address: z.string().min(5, 'Dirección muy corta'),
  commune: z.string().min(2, 'Comuna requerida'),
  city: z.string().min(2, 'Ciudad requerida'),
  region: z.string().min(2, 'Región requerida'),
  paymentMethod: z.string().min(1, 'Debes seleccionar un método de pago'),
  wantsInstallation: z.boolean().optional(),
  installationPreferredDay: z.string().optional(),
  installationPreferredTime: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, grandTotal } = useCartStore();
  const checkout = useCheckout();
  const { data: shippingData, isLoading: loadingRegions } = useShippingZones();
  const { data: paymentMethods = [], isLoading: loadingPayments } = usePaymentMethods();
  const { data: installationCostsData } = useInstallationCosts();

  const [installationCost, setInstallationCost] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Use useWatch instead of watch to prevent unnecessary re-renders
  const selectedRegion = useWatch({
    control,
    name: 'region',
    defaultValue: '',
  });

  const wantsInstallation = useWatch({
    control,
    name: 'wantsInstallation',
    defaultValue: false,
  });

  const availableCommunes = useMemo(() => {
    if (!selectedRegion || !shippingData?.regions) return [];
    const region = shippingData.regions.find(r => r.name === selectedRegion);
    return region?.communes || [];
  }, [selectedRegion, shippingData]);

  // Obtener costos de envío e instalación cuando cambia la región
  useEffect(() => {
    console.log('🔍 DEBUG - Selected region:', selectedRegion);
    console.log('🔍 DEBUG - Shipping data:', shippingData);
    console.log('🔍 DEBUG - Installation costs data:', installationCostsData);

    if (!selectedRegion || !shippingData?.shipping_zones || !shippingData?.regions) {
      console.log('❌ Missing data, resetting costs');
      setInstallationCost(0);
      setShippingCost(0);
      return;
    }

    // Obtener el código de la región seleccionada (ej: "RM", "V", "VIII")
    const selectedRegionData = shippingData.regions.find(r => r.name === selectedRegion);
    console.log('🔍 DEBUG - Selected region data:', selectedRegionData);

    if (!selectedRegionData) {
      console.log('❌ Region not found in data');
      setInstallationCost(0);
      setShippingCost(0);
      return;
    }

    const regionCode = selectedRegionData.code;
    console.log('🔍 DEBUG - Region code:', regionCode);

    // Buscar la zona que incluya este código de región (para envío)
    const zone = shippingData.shipping_zones.find(z =>
      z.regions?.includes(regionCode)
    );
    console.log('🔍 DEBUG - Found shipping zone:', zone);
    console.log('🔍 DEBUG - Shipping cost:', zone?.shipping_cost);

    // Obtener costo de instalación del plugin fluxo-installation
    const installCost = installationCostsData?.costs?.[regionCode]?.installation_cost || 0;
    console.log('🔍 DEBUG - Installation cost for region', regionCode, ':', installCost);

    setInstallationCost(installCost);
    setShippingCost(zone?.shipping_cost || 0);
  }, [selectedRegion, shippingData, installationCostsData]);

  // Calcular total con envío e instalación
  const totalWithInstallation = useMemo(() => {
    const baseTotal = grandTotal + shippingCost;
    return wantsInstallation ? baseTotal + installationCost : baseTotal;
  }, [grandTotal, shippingCost, wantsInstallation, installationCost]);

  // Si no hay items, redirigir al home
  if (items.length === 0) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      // Agregar los costos de envío e instalación al payload
      const checkoutData = {
        ...data,
        shippingCost: shippingCost,
        installationCost: data.wantsInstallation ? installationCost : 0,
      };

      const result = await checkout.mutateAsync(checkoutData);

      if (result.success) {
        // Si es Flow y hay URL de pago, redirigir
        if (data.paymentMethod === 'flow' && result.paymentUrl) {
          toast.success(`¡Pedido #${result.orderNumber} creado! Redirigiendo a Flow...`);
          // Redirigir a Flow para completar el pago
          window.location.href = result.paymentUrl;
        } else {
          // Transferencia o pago completado
          toast.success(`¡Pedido #${result.orderNumber} creado exitosamente!`);
          navigate('/gracias', {
            state: {
              orderId: result.orderId,
              orderNumber: result.orderNumber,
              hasInstallation: data.wantsInstallation && installationCost > 0,
              paymentMethod: data.paymentMethod,
              total: totalWithInstallation,
            },
          });
        }
      } else {
        toast.error(result.error || 'Error al crear el pedido');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al procesar el pedido');
    }
  };

  return (
    <Layout title="Checkout" description="Finaliza tu compra">
      <section className="py-12 bg-bg-muted min-h-[70vh]">
        <div className="container-custom max-w-3xl">
          <h1 className="text-h1 font-bold text-text-primary mb-8">
            Finalizar compra
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" autoComplete="on" name="checkout">
            {/* Datos personales */}
            <div className="card p-6">
              <h2 className="text-h3 font-semibold mb-4">Datos personales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    {...register('firstName')}
                    className={`input ${errors.firstName ? 'input-error' : ''}`}
                    autoComplete="given-name"
                    name="firstName"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Apellido
                  </label>
                  <input
                    {...register('lastName')}
                    className={`input ${errors.lastName ? 'input-error' : ''}`}
                    autoComplete="family-name"
                    name="lastName"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className={`input ${errors.email ? 'input-error' : ''}`}
                    autoComplete="email"
                    name="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Teléfono
                  </label>
                  <input
                    {...register('phone')}
                    className={`input ${errors.phone ? 'input-error' : ''}`}
                    type="tel"
                    autoComplete="tel"
                    name="phone"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Dirección */}
            <div className="card p-6">
              <h2 className="text-h3 font-semibold mb-4">Dirección de envío</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Dirección
                  </label>
                  <input
                    {...register('address')}
                    className={`input ${errors.address ? 'input-error' : ''}`}
                    autoComplete="street-address"
                    placeholder="Calle y número, depto/casa"
                    name="address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Región
                    </label>
                    <select
                      {...register('region')}
                      className={`input ${errors.region ? 'input-error' : ''}`}
                      disabled={loadingRegions}
                      autoComplete="address-level1"
                      name="region"
                    >
                      <option value="">Seleccionar región...</option>
                      {shippingData?.regions.map((region) => (
                        <option key={region.code} value={region.name}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                    {errors.region && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.region.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Comuna
                    </label>
                    <select
                      {...register('commune')}
                      className={`input ${errors.commune ? 'input-error' : ''}`}
                      disabled={!selectedRegion || loadingRegions}
                      autoComplete="address-level2"
                      name="commune"
                    >
                      <option value="">
                        {!selectedRegion ? 'Primero selecciona región...' : 'Seleccionar comuna...'}
                      </option>
                      {availableCommunes.map((commune) => (
                        <option key={commune} value={commune}>
                          {commune}
                        </option>
                      ))}
                    </select>
                    {errors.commune && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.commune.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ciudad
                    </label>
                    <input
                      {...register('city')}
                      className={`input ${errors.city ? 'input-error' : ''}`}
                      autoComplete="address-level2"
                      name="city"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Instalación profesional */}
            {selectedRegion && (
              <div className="card p-6 border-2 border-success/30 bg-success/5">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    {...register('wantsInstallation')}
                    id="wantsInstallation"
                    className="mt-1 w-5 h-5 text-success border-gray-300 rounded focus:ring-success"
                  />
                  <div className="flex-1">
                    <label htmlFor="wantsInstallation" className="cursor-pointer">
                      <h3 className="text-lg font-semibold text-success mb-2">
                        ⚙️ Agregar instalación profesional
                      </h3>
                      <p className="text-sm text-gray-700 mb-3">
                        Nuestro equipo de técnicos certificados instalará tu equipo de aire acondicionado de forma profesional y segura.
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-success/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">Costo de instalación en {selectedRegion}:</span>
                          <span className="text-2xl font-bold text-success">
                            ${installationCost.toLocaleString('es-CL')}
                          </span>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1 mt-3">
                          <li className="flex items-center gap-2">
                            <span className="text-success">✓</span>
                            <span>Instalación certificada y garantizada</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-success">✓</span>
                            <span>Incluye materiales básicos</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-success">✓</span>
                            <span>Revisión de funcionamiento</span>
                          </li>
                        </ul>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Método de pago */}
            <div className="card p-6">
              <h2 className="text-h3 font-semibold mb-4">Método de pago</h2>

              {loadingPayments ? (
                <p className="text-gray-500">Cargando métodos de pago...</p>
              ) : paymentMethods.length === 0 ? (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                  <p className="text-yellow-800 font-semibold mb-2">
                    ⚠️ No hay métodos de pago configurados
                  </p>
                  <p className="text-sm text-yellow-700">
                    Por favor contacta al administrador para configurar los métodos de pago en WooCommerce.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        {...register('paymentMethod')}
                        value={method.id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{method.title}</div>
                        {method.description && (
                          <div
                            className="text-sm text-gray-600 mt-1"
                            dangerouslySetInnerHTML={{ __html: method.description }}
                          />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>


            {/* Resumen */}
            <div className="card p-6">
              <h2 className="text-h3 font-semibold mb-4">Resumen del pedido</h2>

              {/* Lista de productos */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      {item.attributes && item.attributes.length > 0 && (
                        <p className="text-xs text-gray-500">
                          {item.attributes.map(attr => `${attr.name}: ${attr.option}`).join(', ')}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">Cantidad: {item.quantity}</span>
                        <span className="font-semibold text-sm">
                          ${item.lineGrandTotal.toLocaleString('es-CL')} CLP
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal productos</span>
                  <span>${grandTotal.toLocaleString('es-CL')} CLP</span>
                </div>
                {selectedRegion && shippingCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío a {selectedRegion}</span>
                    <span>+${shippingCost.toLocaleString('es-CL')} CLP</span>
                  </div>
                )}
                {wantsInstallation && installationCost > 0 && (
                  <div className="flex justify-between text-sm text-success font-medium">
                    <span>Instalación profesional</span>
                    <span>+${installationCost.toLocaleString('es-CL')} CLP</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total a pagar</span>
                  <span className="text-primary">
                    ${totalWithInstallation.toLocaleString('es-CL')} CLP
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                isLoading={checkout.isPending}
              >
                Confirmar pedido
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};
