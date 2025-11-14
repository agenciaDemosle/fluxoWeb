import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { useCartStore } from '../store/useCartStore';
import { useCheckout } from '../hooks';
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
  installationPreferredDay: z.string().optional(),
  installationPreferredTime: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, grandTotal, subtotalInstalacion } = useCartStore();
  const checkout = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const hasInstallation = subtotalInstalacion > 0;

  // Si no hay items, redirigir al home
  if (items.length === 0) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const result = await checkout.mutateAsync(data);

      if (result.success) {
        toast.success(`¡Pedido #${result.orderNumber} creado exitosamente!`);
        navigate('/gracias', {
          state: { orderId: result.orderId, orderNumber: result.orderNumber },
        });
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      Comuna
                    </label>
                    <input
                      {...register('commune')}
                      className={`input ${errors.commune ? 'input-error' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ciudad
                    </label>
                    <input
                      {...register('city')}
                      className={`input ${errors.city ? 'input-error' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Región
                    </label>
                    <input
                      {...register('region')}
                      className={`input ${errors.region ? 'input-error' : ''}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Instalación (si aplica) */}
            {hasInstallation && (
              <div className="card p-6 bg-success/5 border border-success/20">
                <h2 className="text-h3 font-semibold mb-4 text-success">
                  Programación de instalación
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Día preferido (opcional)
                    </label>
                    <input
                      {...register('installationPreferredDay')}
                      type="date"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Horario preferido (opcional)
                    </label>
                    <select
                      {...register('installationPreferredTime')}
                      className="input"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="morning">Mañana (9:00 - 13:00)</option>
                      <option value="afternoon">Tarde (14:00 - 18:00)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Resumen */}
            <div className="card p-6">
              <h2 className="text-h3 font-semibold mb-4">Resumen del pedido</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span className="text-primary">
                    ${grandTotal.toLocaleString('es-CL')} CLP
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
