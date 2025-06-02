import React from 'react';
import type { User } from '../../types/user/user';

interface UsersTableProps {
  filteredUsers: User[];
  loading: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ filteredUsers, loading }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Cargando usuarios...</span>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{user.id}</td>
                  <td className="px-6 py-4 flex items-center justify-center">
                    <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron usuarios que coincidan con los filtros.</p>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
