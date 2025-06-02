import React from 'react';
import { Settings, Check, X } from 'lucide-react';
import type { Plan } from '../../types/plan/plan';

interface PlanStatsProps {
  planStats: {
    total: number;
    active: number;
    inactive: number;
    mostPopular: Plan;
  };
}

const PlanStats: React.FC<PlanStatsProps> = ({ planStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Planes</p>
            <p className="text-2xl font-bold text-gray-900">{planStats.total}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Activos</p>
            <p className="text-2xl font-bold text-gray-900">{planStats.active}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <div className="p-2 bg-gray-100 rounded-lg">
            <X className="w-6 h-6 text-gray-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Inactivos</p>
            <p className="text-2xl font-bold text-gray-900">{planStats.inactive}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <div className="w-6 h-6 text-purple-600 font-bold flex items-center justify-center text-xs">★</div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Más Popular</p>
            <p className="text-lg font-bold text-gray-900">{planStats.mostPopular?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanStats;
