import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { Coupon } from '../../types/coupon/coupon';

interface CouponsTableProps {
    coupons: Coupon[];
    openModalCoupon: (coupon: Coupon | null, action: 'create' | 'edit' | 'delete') => void;
}

const CouponsTable: React.FC<CouponsTableProps> = ({ coupons, openModalCoupon }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descuento</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Válido Hasta</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {coupons.map((coupon) => (
                            <tr key={coupon.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">{coupon.code}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{coupon.discount}%</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{coupon.validUntil}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${coupon.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                        {coupon.isActive ? 'ACTIVO' : 'INACTIVO'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => openModalCoupon(coupon, 'edit')}
                                            className="text-blue-600 hover:text-blue-900 p-1"
                                            title="Editar"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => openModalCoupon(coupon, 'delete')}
                                            className="text-red-600 hover:text-red-900 p-1"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CouponsTable;
