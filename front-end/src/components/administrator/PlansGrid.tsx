import React from 'react';
import { Check, Edit, Trash2 } from 'lucide-react';
import type { Plan } from '../../types/plan/plan';
import type { Subscription } from '../../types/subscription/subscription';

interface PlansGridProps {
  plans: Plan[];
  subscriptions: Subscription[];
  openModalPlan: (plan: Plan | null, action: 'create' | 'edit' | 'delete') => void;
}

const PlansGrid: React.FC<PlansGridProps> = ({ plans, subscriptions, openModalPlan }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${plan.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                {plan.active ? 'ACTIVO' : 'INACTIVO'}
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
                onClick={() => openModalPlan(plan, 'edit')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </button>
              <button
                onClick={() => openModalPlan(plan, 'delete')}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </button>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3">
            <div className="text-sm text-gray-600">
              Suscripciones activas: {subscriptions.filter(s => s.plan.id.toString() === plan.id.toString() && s.status === 'active').length}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlansGrid;
