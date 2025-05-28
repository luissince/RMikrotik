import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, CreditCard, QrCode, Lock } from 'lucide-react';
import type { Session } from '@auth/core/types';

interface Props {
  session: Session | null;
}

const cardSchema = z.object({
  number: z.string().min(19, 'Número de tarjeta inválido'),
  expiry: z.string().min(5, 'Fecha inválida'),
  cvv: z.string().min(3).max(4, 'CVV inválido'),
  name: z.string().min(3, 'Nombre requerido'),
});

type CardData = z.infer<typeof cardSchema>;

const PaymentModal = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CardData>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      number: '4111 1111 1111 1111',
      expiry: '12/25',
      cvv: '123',
      name: 'Juan Pérez',
    },
  });

  const plans = [
    { id: 'monthly', name: 'Plan Mensual', price: 29.99, duration: '30 días' },
    { id: 'biweekly', name: 'Plan por 15 Días', price: 19.99, duration: '15 días' },
    { id: 'daily', name: 'Plan por 1 Día', price: 4.99, duration: '1 día' },
    { id: 'free', name: 'Plan Free', price: 0.0, duration: '1 día' },
  ];

  const openModal = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    setSelectedPlan(plan);
    setIsOpen(true);
    setPaymentMethod('');
    reset(); // Esto seguirá usando los valores por defecto
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPlan(null);
    setPaymentMethod('');
    setIsProcessing(false);
    reset();
  };

  const sendToApi = async (data: any) => {
    if (!session?.user?.providerId) {
      alert("No se pudo identificar al usuario");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          providerId: session.user.providerId,
        }),
      });

      const result = await response.text();
      
      if (!response.ok) throw new Error(result || 'Error al procesar pago');

      alert('Pago procesado con éxito');
      closeModal();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const onSubmit = async (data: CardData) => {
    if (!selectedPlan) return;

    setIsProcessing(true);

    const payload = {
      planId: selectedPlan.id,
      price: selectedPlan.price,
      method: paymentMethod,
      cardData: paymentMethod === 'card' ? data : undefined,
      qrCode: paymentMethod === 'qr' ? `PAYMENT:${selectedPlan.id}:${selectedPlan.price}` : undefined,
    };

    await sendToApi(payload);
  };

  const handleQRSubmit = async () => {
    setIsProcessing(true);
    if (!selectedPlan) return;

    const payload = {
      planId: selectedPlan.id,
      price: selectedPlan.price,
      method: 'qr',
      qrCode: `PAYMENT:${selectedPlan.id}:${selectedPlan.price}`,
    };

    await sendToApi(payload);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 shadow-lg p-6 rounded-lg text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400">
            <span className="text-white">PLANES DE USO</span>
          </h1>
          <p className="text-gray-500 mt-2 font-bold">
            {session?.user?.name && `${session.user.name} |`} Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {plans.map(plan => (
            <div key={plan.id} className="lg:w-1/4 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 text-center">{plan.name}</h2>
              <p className="text-gray-600 text-center mt-2">Acceso completo por {plan.duration}</p>
              <div className="mt-6">
                <p className="text-gray-800 font-bold text-center">
                  ${plan.price}
                  {plan.id === 'monthly' ? '/mes' : ''}
                </p>
                <button
                  onClick={() => openModal(plan.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full mt-4 transition-colors"
                >
                  Seleccionar Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Procesar Pago</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800">{selectedPlan?.name}</h3>
                <p className="text-gray-600 text-sm">Duración: {selectedPlan?.duration}</p>
                <p className="text-2xl font-bold text-green-600 mt-2">${selectedPlan?.price}</p>
              </div>

              {selectedPlan?.price > 0 && !paymentMethod && (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Selecciona método de pago</h3>
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50"
                    >
                      <CreditCard className="text-blue-600 mr-3" size={24} />
                      <div>
                        <p className="font-semibold text-gray-800">Tarjeta</p>
                        <p className="text-sm text-gray-600">Visa, Mastercard</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('qr')}
                      className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50"
                    >
                      <QrCode className="text-green-600 mr-3" size={24} />
                      <div>
                        <p className="font-semibold text-gray-800">Código QR</p>
                        <p className="text-sm text-gray-600">Paga con tu app bancaria</p>
                      </div>
                    </button>
                  </div>
                </>
              )}

              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex items-center mb-4">
                    <Lock className="text-green-600 mr-2" size={16} />
                    <span className="text-sm text-gray-600">Pago seguro y encriptado</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Número de tarjeta</label>
                    <input
                      type="text"
                      {...register('number')}
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border rounded-lg"
                    />
                    {errors.number && <p className="text-red-500 text-sm">{errors.number.message}</p>}
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700">Fecha (MM/YY)</label>
                      <input
                        type="text"
                        {...register('expiry')}
                        placeholder="MM/YY"
                        className="w-full p-3 border rounded-lg"
                      />
                      {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry.message}</p>}
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700">CVV</label>
                      <input
                        type="text"
                        {...register('cvv')}
                        placeholder="123"
                        className="w-full p-3 border rounded-lg"
                      />
                      {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre del titular</label>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder="Juan Pérez"
                      className="w-full p-3 border rounded-lg"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700"
                  >
                    {isProcessing ? 'Procesando...' : 'Pagar con tarjeta'}
                  </button>
                </form>
              )}

              {paymentMethod === 'qr' && (
                <div>
                  <p className="text-center text-sm text-gray-600 mb-4">Escanea el siguiente código con tu app bancaria:</p>
                  <div className="flex justify-center mb-4">
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                      QR CODE
                    </div>
                  </div>
                  <button
                    onClick={handleQRSubmit}
                    disabled={isProcessing}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    {isProcessing ? 'Procesando...' : 'Confirmar pago QR'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModal;
