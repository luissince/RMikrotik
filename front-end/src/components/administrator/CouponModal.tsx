import React from 'react';
import Modal from '../ui/modal';
import Button from '../ui/Button';
import { Check, Edit, Trash2, X } from 'lucide-react';
import type { Coupon } from '../../types/coupon/coupon';
import type { Plan } from '../../types/plan/plan';

interface CouponModalProps {
  plans: Plan[];
  showCouponModal: boolean;
  closeModalCoupon: () => void;
  couponModalAction: 'create' | 'edit' | 'delete';
  couponForm: Coupon;
  setCouponForm: React.Dispatch<React.SetStateAction<Coupon>>;
  isProcessing: boolean;
  handleAction: () => void;
}

const CouponModal: React.FC<CouponModalProps> = ({
  plans,
  showCouponModal,
  closeModalCoupon,
  couponModalAction,
  couponForm,
  setCouponForm,
  isProcessing,
  handleAction,
}) => {
  return (
   <Modal
  isOpen={showCouponModal}
  onClose={closeModalCoupon}
  title={
    <>
      {couponModalAction === 'create' && 'Crear Nuevo Cupón'}
      {couponModalAction === 'edit' && 'Editar Cupón'}
      {couponModalAction === 'delete' && 'Eliminar Cupón'}
    </>
  }
  size="md"
  footer={
    <>
      {couponModalAction === 'delete' ? (
        <Button
          onClick={handleAction}
          disabled={isProcessing}
          variant="error"
          fullWidth
        >
          {isProcessing ? 'Procesando...' : (
            <>
              <Trash2 size={18} /> <span className='ml-2'>Eliminar Cupón</span>
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={handleAction}
          disabled={isProcessing || !couponForm.code.trim()}
          variant={couponModalAction === 'create' ? 'success' : 'warning'}
          fullWidth
        >
          {isProcessing ? 'Procesando...' :
            couponModalAction === 'create' ? (
              <>
                <Check size={18} /> <span className='ml-2'>Crear Cupón</span>
              </>
            ) : (
              <>
                <Edit size={18} /> <span className='ml-2'>Editar Cupón</span>
              </>
            )}
        </Button>
      )}
      <Button
        onClick={closeModalCoupon}
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
    {couponModalAction !== 'delete' ? (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código del Cupón *
          </label>
          <input
            type="text"
            value={couponForm.code}
            onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ej. DESC20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plan *
          </label>
          <select
            value={couponForm.planId || ''}
            onChange={(e) => setCouponForm({ ...couponForm, planId: Number(e.target.value) })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Seleccione un plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>
      </>
    ) : (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código del Cupón *
          </label>
          <p>CÓDIGO: {couponForm.code}</p>
        </div>
      </>
    )}
  </div>
</Modal>

  );
};

export default CouponModal;
