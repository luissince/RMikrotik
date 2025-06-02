import React from 'react';
import Modal from '../ui/modal';
import Button from '../ui/Button';
import { Check, Edit, X, Plus } from 'lucide-react';
import type { Plan } from '../../types/plan/plan';

interface PlanModalProps {
  showPlanModal: boolean;
  closeModalPlan: () => void;
  planModalAction: 'create' | 'edit' | 'delete';
  planForm: Plan;
  setPlanForm: React.Dispatch<React.SetStateAction<Plan>>;
  isProcessing: boolean;
  handlePlanAction: () => void;
  addFeature: () => void;
  removeFeature: (index: number) => void;
  updateFeature: (index: number, value: string) => void;
}

const PlanModal: React.FC<PlanModalProps> = ({
  showPlanModal,
  closeModalPlan,
  planModalAction,
  planForm,
  setPlanForm,
  isProcessing,
  handlePlanAction,
  addFeature,
  removeFeature,
  updateFeature
}) => {
  return (
    <Modal
      isOpen={showPlanModal}
      onClose={closeModalPlan}
      title={
        <>
          {planModalAction === 'create' && 'Crear Nuevo Plan'}
          {planModalAction === 'edit' && 'Editar Plan'}
          {planModalAction === 'delete' && 'Eliminar Plan'}
        </>
      }
      size="lg"
      footer={
        <>
          <Button
            onClick={handlePlanAction}
            disabled={isProcessing || !planForm.name.trim()}
            variant={planModalAction === 'create' ? 'success' : 'warning'}
            fullWidth
          >
            {isProcessing ? 'Procesando...' :
              planModalAction === 'create' ? <> <Check size={18} /> <span className='ml-2'>Crear Plan</span></> :
              <> <Edit size={18} /> <span className='ml-2'>Editar Plan</span></>}
          </Button>
          <Button
            onClick={closeModalPlan}
            loading={isProcessing}
            variant="light"
          >
            <X size={18} /> <span className='ml-2'>Cerrar</span>
          </Button>
        </>
      }
      footerClassName='bg-white flex justify-end gap-3 mt-6'
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Plan *
            </label>
            <input
              type="text"
              value={planForm.name}
              onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ej. Plan Premium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración (días) *
            </label>
            <input
              type="number"
              value={planForm.durationInDays}
              onChange={(e) => setPlanForm({ ...planForm, durationInDays: Number(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio ($) *
            </label>
            <input
              type="number"
              step="0.01"
              value={planForm.price}
              onChange={(e) => setPlanForm({ ...planForm, price: Number(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={planForm.active ? 'active' : 'inactive'}
              onChange={(e) => setPlanForm({ ...planForm, active: e.target.value === 'active' })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            value={planForm.description}
            onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Descripción del plan..."
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Características
            </label>
            <button
              type="button"
              onClick={addFeature}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Agregar
            </button>
          </div>
          <div className="space-y-2">
            {planForm.characteristics.map((characteristic, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={characteristic.name}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Característica del plan..."
                />
                {planForm.characteristics.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PlanModal;
