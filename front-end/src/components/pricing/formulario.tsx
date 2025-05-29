import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, CreditCard, QrCode, Lock, Trash2, Edit, Check, BoxSelect } from 'lucide-react';
import type { Session } from '@auth/core/types';
import type { Plan } from '../../types/plan/plan';
import Modal from '../ui/modal';
// import { alertKit, AlertKitType } from 'alert-kit';

interface Props {
  session: Session | null;
  plans: Plan[];
}

const cardSchema = z.object({
  number: z.string().min(19, 'Número de tarjeta inválido'),
  expiry: z.string().min(5, 'Fecha inválida'),
  cvv: z.string().min(3).max(4, 'CVV inválido'),
  name: z.string().min(3, 'Nombre requerido'),
});
 
type CardData = z.infer<typeof cardSchema>;

const PaymentModal = ({ session, plans }: Props) => {
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
      // alertKit.warning({
      //   title: 'RMikrotik',
      //   message: 'No se pudo identificar al usuario'
      // })
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
    <div className="container mx-auto px-4 py-8">

      {/* Cuerpo del formulario */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Planes
              </h1>
              <p className="text-white">Gestión de suscripciones</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-300">Usuario:</span>
                <span className="text-blue-400 font-semibold">{session && session.user?.name || '-'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listado de Planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full 'bg-gray-100 text-gray-600`}>
                    ACTIVO
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-500">
                      /{plan.durationInDays} día{plan.durationInDays !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Características:</h4>
                  <ul className="space-y-1">
                    {plan.characteristics.map((characteristic, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {characteristic.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Creado: {plan.createdAt}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(plan.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <BoxSelect className="w-4 h-4 mr-2" />
                    Seleccionar Plan
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-3">
                <div className="text-sm text-gray-600">
                  Suscripciones activas:
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para seleccionar Plan */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Modal Básico"
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Confirmar
            </button>
          </div>
        }
      >
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
      </Modal>
    </div>
  );
};

export default PaymentModal;
