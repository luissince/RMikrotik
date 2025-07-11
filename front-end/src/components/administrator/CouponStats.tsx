import React from 'react';
import { Ticket, Check, X } from 'lucide-react';

interface CouponStatsProps {
  couponStats: {
    total: number;
    active: number;
    inactive: number;
  };
}

const CouponStats: React.FC<CouponStatsProps> = ({ couponStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Ticket className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Cupones</p>
            <p className="text-2xl font-bold text-gray-900">{couponStats.total}</p>
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
            <p className="text-2xl font-bold text-gray-900">{couponStats.active}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center">
          <div className="p-2 bg-gray-100 rounded-lg">
            <X className="w-6 h-6 text-gray-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Usados</p>
            <p className="text-2xl font-bold text-gray-900">{couponStats.inactive}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponStats;
