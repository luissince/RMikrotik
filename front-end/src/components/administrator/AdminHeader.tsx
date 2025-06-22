import React from 'react';
import type { User } from '../../types/user/user';

interface AdminHeaderProps {
  user: User | null;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ user }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Panel Administrativo</h1>
          <p className="text-white">Gestión de suscripciones, planes y usuarios</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-300">Admin:</span>
            <span className="text-blue-400 font-semibold">{user?.name || '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
