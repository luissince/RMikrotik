import { Check, X } from 'lucide-react';
import React from 'react';

interface SubscriptionStatsProps {
  stats: {
    total: number;
    active: number;
    expired: number;
    cancelled: number;
    revenue: number;
  };
}

const SubscriptionStats: React.FC<SubscriptionStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <div className="w-6 h-6 bg-blue-600 rounded"></div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Activas</p>
            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-lg">
            <X className="w-6 h-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Expiradas</p>
            <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <div className="p-2 bg-gray-100 rounded-lg">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Canceladas</p>
            <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <div className="w-6 h-6 text-green-600 font-bold flex items-center justify-center text-xs">$</div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Ingresos</p>
            <p className="text-2xl font-bold text-gray-900">${stats.revenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStats;
