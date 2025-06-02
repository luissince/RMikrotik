import React from 'react';
import Modal from '../ui/modal';
import Button from '../ui/Button';
import { Check, Edit, X } from 'lucide-react';
import type { Coupon } from '../../types/coupon/coupon';

interface CouponModalProps {
  showCouponModal: boolean;
  closeModalCoupon: () => void;
  couponModalAction: 'create' | 'edit' | 'delete';
  couponForm: Coupon;
  setCouponForm: React.Dispatch<React.SetStateAction<Coupon>>;
  isProcessing: boolean;
  handleCouponAction: () => void;
}

const CouponModal: React.FC<CouponModalProps> = ({
  showCouponModal,
  closeModalCoupon,
  couponModalAction,
  couponForm,
  setCouponForm,
  isProcessing,
  handleCouponAction,
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
          <Button
            onClick={handleCouponAction}
            disabled={isProcessing || !couponForm.code.trim()}
            variant={couponModalAction === 'create' ? 'success' : 'warning'}
            fullWidth
          >
            {isProcessing ? 'Procesando...' :
              couponModalAction === 'create' ? <> <Check size={18} /> <span className='ml-2'>Crear Cupón</span></> :
              <> <Edit size={18} /> <span className='ml-2'>Editar Cupón</span></>}
          </Button>
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
            Descuento (%)
          </label>
          <input
            type="number"
            value={couponForm.discount}
            onChange={(e) => setCouponForm({ ...couponForm, discount: Number(e.target.value) })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Válido Hasta
          </label>
          <input
            type="date"
            value={couponForm.validUntil}
            onChange={(e) => setCouponForm({ ...couponForm, validUntil: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <select
            value={couponForm.isActive ? 'active' : 'inactive'}
            onChange={(e) => setCouponForm({ ...couponForm, isActive: e.target.value === 'active' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default CouponModal;
