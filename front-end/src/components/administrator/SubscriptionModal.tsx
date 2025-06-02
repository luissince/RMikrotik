import React from 'react';
import Modal from '../ui/modal';
import Button from '../ui/Button';
import { Check, X, Ban, RefreshCcw } from 'lucide-react';
import type { Subscription } from '../../types/subscription/subscription';

interface SubscriptionModalProps {
  showSubscriptionModal: boolean;
  closeModalSubscription: () => void;
  selectedSubscription: Subscription | null;
  modalAction: 'activate' | 'cancel' | 'renew' | 'view';
  isProcessing: boolean;
  handleAction: () => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  showSubscriptionModal,
  closeModalSubscription,
  selectedSubscription,
  modalAction,
  isProcessing,
  handleAction,
  getStatusColor,
  getStatusText
}) => {
  return (
    <Modal
      isOpen={showSubscriptionModal}
      onClose={closeModalSubscription}
      title={
        <>
          {modalAction === 'view' && 'Detalles de Suscripción'}
          {modalAction === 'activate' && 'Activar Suscripción'}
          {modalAction === 'cancel' && 'Cancelar Suscripción'}
          {modalAction === 'renew' && 'Renovar Suscripción'}
        </>
      }
      size="md"
      footer={
        <>
          {modalAction !== 'view' && (
            <Button
              onClick={handleAction}
              loading={isProcessing}
              variant={
                modalAction === 'activate' ? 'success' :
                modalAction === 'cancel' ? 'error' :
                'info'
              }
              fullWidth
            >
              {isProcessing ? 'Procesando...' :
                modalAction === 'activate' ? <> <Check size={18} /> <span className='ml-2'>Activar</span></> :
                modalAction === 'cancel' ? <><Ban size={18} /> <span className='ml-2'>Anular</span></> : <><RefreshCcw size={18} /> <span className='ml-2'>Renovar</span></>}
            </Button>
          )}
          <Button
            onClick={closeModalSubscription}
            loading={isProcessing}
            variant="light"
          >
            <X size={18} /> <span className='ml-2'>Cerrar</span>
          </Button>
        </>
      }
      footerClassName='bg-white flex justify-end gap-3 mt-6'
    >
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800">{selectedSubscription && selectedSubscription.user.name}</h3>
          <p className="text-gray-600 text-sm">{selectedSubscription && selectedSubscription.user.email}</p>
          <p className="text-xs text-gray-500">ID: {selectedSubscription && selectedSubscription.user.id}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Plan:</span>
            <p className="text-gray-900">{selectedSubscription && selectedSubscription.plan?.name}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Estado:</span>
            <p className={`font-semibold ${selectedSubscription && getStatusColor(selectedSubscription.status).split(' ')[0]}`}>
              {selectedSubscription && getStatusText(selectedSubscription.status)}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Inicio:</span>
            <p className="text-gray-900">{selectedSubscription && selectedSubscription.startDate}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Fin:</span>
            <p className="text-gray-900">{selectedSubscription && selectedSubscription.endDate}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Precio:</span>
            <p className="text-gray-900 font-semibold">${selectedSubscription && selectedSubscription.price}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Método:</span>
            <p className="text-gray-900">{selectedSubscription && selectedSubscription.method}</p>
          </div>
        </div>
        {modalAction !== 'view' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              {modalAction === 'activate' && '¿Estás seguro de que quieres activar esta suscripción?'}
              {modalAction === 'renew' && '¿Estás seguro de que quieres renovar esta suscripción?'}
              {modalAction === 'cancel' && '¿Estás seguro de que quieres cancelar esta suscripción?'}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
