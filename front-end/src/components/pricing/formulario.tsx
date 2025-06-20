import { useEffect, useState, useRef } from 'react';
import { CreditCard, QrCode, Lock, Check, BoxSelect, ArrowLeft } from 'lucide-react';
import { FaPaypal } from "react-icons/fa";
import type { Session } from '@auth/core/types';
import type { Plan } from '../../types/plan/plan';
import Modal from '../ui/modal';
import Button from '../ui/Button';
import { buttonPresets } from '../../styles/buttonStyles';
import AlertKit, { alertKit } from 'alert-kit';
import { validCvv, validDateExpiry, validNumberCreditCard } from '../../utils/helper';
import { keyCardExpiry, keyNumberInteger } from '../../utils/keyEvent';

interface Result {
  message: string;
  approveUrl: string;
}

interface Props {
  session: Session | null;
  plans: Plan[];
}

type CardData = {
  number: string | null;
  expiry: string | null;
  cvv: string | null;
  name: string | null;
}

const cardDefaultData: CardData = {
  number: import.meta.env.PUBLIC_ENV === 'development' ? '4111111111111111' : '',
  expiry: import.meta.env.PUBLIC_ENV === 'development' ? '09/30' : '',
  cvv: import.meta.env.PUBLIC_ENV === 'development' ? '123' : '',
  name: import.meta.env.PUBLIC_ENV === 'development' ? 'Juan Pérez' : '',
};

AlertKit.setGlobalDefaults({
  headerClassName: 'bg-white p-4 border-b border-gray-200 rounded-t-2xl cursor-move',
  headerTitle: 'RMikrotik',
  showCloseButton: false,
  primaryButtonClassName: buttonPresets.modalAccept,
  cancelButtonClassName: buttonPresets.modalCancel,
  acceptButtonClassName: buttonPresets.modalAccept,
  defaultTexts: {
    success: 'Éxito',
    error: 'Error',
    warning: 'Advertencia',
    info: 'Información',
    question: 'Confirmación',
    accept: 'Aceptar',
    cancel: 'Cancelar',
    ok: 'Aceptar'
  }
});

const PaymentModal = ({ session, plans }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const cardNumberRef = useRef<HTMLInputElement>(null);
  const [cardData, setCardData] = useState<CardData>(cardDefaultData);
  const [errors, setErrors] = useState<CardData>({
    number: null,
    expiry: null,
    cvv: null,
    name: null,
  });

  useEffect(() => {
    if (paymentMethod === 'card' && cardNumberRef.current) {
      cardNumberRef.current.focus();
    }
  }, [paymentMethod]);

  const openModal = (planId: number) => {
    const plan = plans.find(p => p.id === planId);

    if (!plan) {
      alertKit.warning({
        title: 'Plan no encontrado',
        message: 'No se encontró el plan seleccionado',
        primaryButton: {
          text: 'Aceptar',
        }
      });
      return;
    }

    setSelectedPlan(plan);
    setIsOpen(true);
    setPaymentMethod('');
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPlan(null);
    setPaymentMethod('');
    setIsProcessing(false);
  };

  const onSubmitCard = async () => {
    if (!validNumberCreditCard(cardData.number)) {
      setErrors(prev => ({ ...prev, number: 'Número de tarjeta inválido' }));
      return false;
    }

    if (!validDateExpiry(cardData.expiry)) {
      setErrors(prev => ({ ...prev, expiry: 'Fecha de expiración inválida' }));
      return false;
    } else {
      const [month, year] = cardData.expiry!.split('/');
      const expiryDate = new Date(parseInt(`20${year}`), parseInt(month) - 1);
      const currentDate = new Date();

      if (expiryDate < currentDate) {
        setErrors(prev => ({ ...prev, expiry: 'La tarjeta ha expirado' }));
        return false;
      }
    }

    if (!validCvv(cardData.cvv)) {
      setErrors(prev => ({ ...prev, cvv: 'CVV inválido' }));
      return false;
    }

    if (!cardData.name) {
      setErrors(prev => ({ ...prev, name: 'Nombre inválido' }));
      return false;
    }

    prepareAndSendData("card", cardData);
  };

  const onSubmitPayment = async () => {
    prepareAndSendData('qr');
  };

  const onSubmitPayPal = async () => {
    prepareAndSendData('paypal');
  };

  const prepareAndSendData = async (method: string, cardData?: CardData) => {
    if (!selectedPlan) return;

    if (!session?.user) {
      alertKit.warning({
        title: 'Procesar pago',
        message: 'Inicie sesión para poder pagar',
        primaryButton: {
          text: 'Iniciar Sesión',
        }
      });
      return;
    }

    const payload = {
      planId: selectedPlan.id,
      method: method,
      card: method === 'card' ? cardData : undefined,
      qrCode: method === 'qr' ? `PAYMENT:${selectedPlan.id}:${selectedPlan.price}` : undefined,
    };

    const confirmation = await new Promise((resolve) => {
      alertKit.question({
        title: 'Plan',
        message: '¿Está seguro de que desea pagar?',
      }, resolve);
    });

    if (confirmation) {
      setIsProcessing(true);

      try {
        alertKit.loading({ message: 'Procesando pago...', });

        const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/payment`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `${session?.user?.type} ${session.user?.token}`,
          },
          body: JSON.stringify(payload),
        });

        const result: Result = await response.json();

        if (!response.ok) {
          console.log(result);
          throw new Error(result.message || 'Error al procesar pago');
        };

        const title = method === 'paypal' ? 'Generado pago' : 'Plan';

        if (method === 'card') {
          alertKit.success({
            title: title,
            message: result.message,
          }, () => {
            closeModal();
          });
        }

        if (method === 'paypal') {
          alertKit.loading({ message: result.message });
          window.location.href = result.approveUrl;
        }
      } catch (error: any) {
        alertKit.error({
          title: 'Plan',
          message: error.message,
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600`}>
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

                <div className="mb-6 h-full">
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

                <div className="flex space-x-2">
                  <Button
                    onClick={() => openModal(plan.id)}
                    variant="error"
                    fullWidth
                    leftIcon={<BoxSelect className="w-4 h-4" />}
                  >
                    Seleccionar Plan
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Modal Básico"
        size="md"
      >
        {paymentMethod && (
          <Button
            onClick={() => setPaymentMethod('')}
            variant="link"
            size="none"
            className="text-gray-500"
          >
            <ArrowLeft size={16} className="mr-2" />
            Cambiar método de pago
          </Button>
        )}

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800">{selectedPlan?.name}</h3>
          <p className="text-gray-600 text-sm">Duración: {selectedPlan?.durationInDays}</p>
          <p className="text-2xl font-bold text-green-600 mt-2">${selectedPlan?.price}</p>
        </div>

        {selectedPlan?.price! > 0 && !paymentMethod && (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Selecciona método de pago</h3>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <CreditCard className="text-blue-600" size={24} />
                <div className="flex flex-col text-left px-5">
                  <p className="font-semibold text-gray-800">Tarjeta</p>
                  <p className="text-sm text-gray-600">Visa, Mastercard</p>
                </div>
              </button>
              <button
                onClick={() => setPaymentMethod('qr')}
                className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <QrCode className="text-green-600" size={24} />
                <div className="flex flex-col text-left px-5">
                  <p className="font-semibold text-gray-800">Código QR</p>
                  <p className="text-sm text-gray-600">Paga con tu app bancaria</p>
                </div>
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <FaPaypal className="text-yellow-600" size={24} />
                <div className="flex flex-col text-left px-5">
                  <p className="font-semibold text-gray-800">PayPal</p>
                  <p className="text-sm text-gray-600">Paga con tu cuenta PayPal</p>
                </div>
              </button>
            </div>
          </>
        )}

        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Lock className="text-green-600 mr-2" size={16} />
              <span className="text-sm text-gray-600">Pago seguro y encriptado</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Número de tarjeta</label>
              <input
                type="text"
                value={cardData.number || ''}
                ref={cardNumberRef}
                onChange={(e) => {
                  setCardData({
                    ...cardData,
                    number: e.target.value,
                  });
                }}
                onKeyDown={(e) => keyNumberInteger(e)}
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 border rounded-lg"
              />
              {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Fecha (MM/YY)</label>
                <input
                  type="text"
                  value={cardData.expiry || ''}
                  onChange={(e) => {
                    setCardData({
                      ...cardData,
                      expiry: e.target.value,
                    });
                  }}
                  maxLength={5}
                  onKeyDown={(e) => keyCardExpiry(e)}
                  placeholder="MM/YY"
                  className="w-full p-3 border rounded-lg"
                />
                {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  value={cardData.cvv || ''}
                  onChange={(e) => {
                    setCardData({
                      ...cardData,
                      cvv: e.target.value,
                    });
                  }}
                  onKeyDown={(e) => keyNumberInteger(e)}
                  placeholder="123"
                  className="w-full p-3 border rounded-lg"
                />
                {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del titular</label>
              <input
                type="text"
                value={cardData.name || ''}
                onChange={(e) => {
                  setCardData({
                    ...cardData,
                    name: e.target.value,
                  });
                }}
                placeholder="Juan Pérez"
                className="w-full p-3 border rounded-lg"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <Button
              onClick={onSubmitCard}
              loading={isProcessing}
              variant="success"
              fullWidth
            >
              Pagar con tarjeta
            </Button>
          </div>
        )}

        {paymentMethod === 'qr' && (
          <div>
            <p className="text-center text-sm text-gray-600 mb-4">Escanea el siguiente código con tu app bancaria:</p>
            <div className="flex justify-center mb-4">
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                QR CODE
              </div>
            </div>
            <Button
              onClick={onSubmitPayment}
              loading={isProcessing}
              variant="success"
              fullWidth
            >
              Confirmar pago QR
            </Button>
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <div>
            <p className="text-center text-sm text-gray-600 mb-4">Serás redirigido a PayPal para completar el pago.</p>
            <Button
              onClick={onSubmitPayPal}
              loading={isProcessing}
              variant="success"
              fullWidth
            >
              Pagar con PayPal
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentModal;
