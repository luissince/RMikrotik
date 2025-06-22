import React from 'react';
import { Calendar, Settings, Ticket, Users } from 'lucide-react';

interface TabsProps {
  activeTab: 'subscriptions' | 'plans' | 'users' | 'coupons';
  setActiveTab: (tab: 'subscriptions' | 'plans' | 'users' | 'coupons') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg mb-6">
      <div className="border-none border-gray-200">
        <nav className="-mb-px flex">
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'subscriptions'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Suscripciones
            </div>
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'plans'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <div className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Planes
            </div>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'users'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Usuarios
            </div>
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'coupons'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <div className="flex items-center">
              <Ticket className="w-4 h-4 mr-2" />
              Cupones
            </div>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
