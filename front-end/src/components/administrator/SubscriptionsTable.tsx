import React from 'react';
import { Eye, Check, Ban, RefreshCw, UserCheck } from 'lucide-react';
import type { Subscription } from '../../types/subscription/subscription';

interface SubscriptionsTableProps {
  filteredSubscriptions: Subscription[];
  loading: boolean;
  openModalSubscription: (subscription: Subscription, action: 'activate' | 'cancel' | 'renew' | 'view') => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({
  filteredSubscriptions,
  loading,
  openModalSubscription,
  getStatusColor,
  getStatusText
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Cargando suscripciones...</span>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fechas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map((subscription) => {
                return (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className='flex items-center space-x-4'>
                        <img src={subscription.user.image} alt={subscription.user.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {subscription.user.name}
                          </div>
                          <div className="text-sm text-gray-500">{subscription.user.email}</div>
                          <div className="text-xs text-gray-400">ID: {subscription.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{subscription.plan.name}</div>
                      <div className="text-xs text-gray-500">{subscription.method}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
                        {getStatusText(subscription.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>Inicio: {subscription.startDate}</div>
                      <div>Fin: {subscription.endDate}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ${subscription.price}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2 justify-center">
                        {/* <button
                        onClick={() => openModalSubscription(subscription, 'view')}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button> */}
                        {/* {subscription.status !== 'active' && (
                        <button
                          onClick={() => openModalSubscription(subscription, 'activate')}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Activar"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )} */}
                        {/* {subscription.status === 'active' && (
                        <button
                          onClick={() => openModalSubscription(subscription, 'cancel')}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Cancelar"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )} */}
                        {/* <button
                        onClick={() => openModalSubscription(subscription, 'renew')}
                        className="text-purple-600 hover:text-purple-900 p-1"
                        title="Renovar"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button> */}
                      {
                        subscription.status === "pending" && (
                          <button
                            onClick={() => openModalSubscription(subscription, 'activate')}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Cancelar"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                        )
                      }
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {filteredSubscriptions.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron suscripciones que coincidan con los filtros.</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsTable;
