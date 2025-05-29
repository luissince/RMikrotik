import React, { useState, useEffect } from 'react';
import { Search, Eye, Check, X, RefreshCw, Calendar, Filter, ChevronDown, Plus, Edit, Trash2, Settings } from 'lucide-react';
import type { Session } from '@auth/core/types';
import type { Plan } from '../../types/plan/plan';

interface Props {
  session: Session | null;
  plans: Plan[];
}

interface Subscription {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  planId: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  startDate: string;
  endDate: string;
  price: number;
  paymentMethod: string;
  createdAt: string;
  lastPayment?: string;
}

const AdminSubscriptions: React.FC<Props> = (initialProps) => {
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'plans'>('subscriptions');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [plans, setPlans] = useState<Plan[]>(initialProps.plans);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [modalAction, setModalAction] = useState<'activate' | 'cancel' | 'renew' | 'view'>('view');
  const [isProcessing, setIsProcessing] = useState(false);
  const [renewDays, setRenewDays] = useState(30);

  // Estados para gestión de planes
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [planModalAction, setPlanModalAction] = useState<'create' | 'edit' | 'delete'>('create');
  const [planForm, setPlanForm] = useState<Plan>({
    id: '',
    active: true,
    durationInDays: 30,
    name: '',
    description: '',
    price: 0,
    createdAt: '',
    characteristics: []
  });

  // Datos de ejemplo para suscripciones
  const mockData: Subscription[] = [
    {
      id: '1',
      userId: 'user_001',
      userName: 'Juan Pérez',
      userEmail: 'juan@email.com',
      planId: 'monthly',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      price: 29.99,
      paymentMethod: 'card',
      createdAt: '2024-01-15',
      lastPayment: '2024-01-15'
    },
    {
      id: '2',
      userId: 'user_002',
      userName: 'María González',
      userEmail: 'maria@email.com',
      planId: 'biweekly',
      status: 'expired',
      startDate: '2024-01-01',
      endDate: '2024-01-16',
      price: 19.99,
      paymentMethod: 'qr',
      createdAt: '2024-01-01',
      lastPayment: '2024-01-01'
    },
    {
      id: '3',
      userId: 'user_003',
      userName: 'Carlos López',
      userEmail: 'carlos@email.com',
      planId: 'daily',
      status: 'active',
      startDate: '2024-01-20',
      endDate: '2024-01-21',
      price: 4.99,
      paymentMethod: 'card',
      createdAt: '2024-01-20',
      lastPayment: '2024-01-20'
    },
    {
      id: '4',
      userId: 'user_004',
      userName: 'Ana Martínez',
      userEmail: 'ana@email.com',
      planId: 'monthly',
      status: 'cancelled',
      startDate: '2023-12-01',
      endDate: '2024-01-01',
      price: 29.99,
      paymentMethod: 'card',
      createdAt: '2023-12-01',
      lastPayment: '2023-12-01'
    },
    {
      id: '5',
      userId: 'user_005',
      userName: 'Luis Rodríguez',
      userEmail: 'luis@email.com',
      planId: 'free',
      status: 'active',
      startDate: '2024-01-20',
      endDate: '2024-01-21',
      price: 0,
      paymentMethod: 'free',
      createdAt: '2024-01-20'
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setSubscriptions(mockData);
      setFilteredSubscriptions(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = subscriptions;

    if (searchTerm) {
      filtered = filtered.filter(sub =>
        sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    if (planFilter !== 'all') {
      filtered = filtered.filter(sub => sub.planId === planFilter);
    }

    setFilteredSubscriptions(filtered);
  }, [searchTerm, statusFilter, planFilter, subscriptions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ACTIVO';
      case 'expired': return 'EXPIRADO';
      case 'cancelled': return 'CANCELADO';
      case 'pending': return 'PENDIENTE';
      default: return status.toUpperCase();
    }
  };

  const getPlanName = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    return plan ? plan.name : planId;
  };

  const openModal = (subscription: Subscription, action: 'activate' | 'cancel' | 'renew' | 'view') => {
    setSelectedSubscription(subscription);
    setModalAction(action);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSubscription(null);
    setIsProcessing(false);
    setRenewDays(30);
  };

  const handleAction = async () => {
    if (!selectedSubscription) return;

    setIsProcessing(true);

    // Simular llamada a API
    setTimeout(() => {
      const updatedSubscriptions = subscriptions.map(sub => {
        if (sub.id === selectedSubscription.id) {
          switch (modalAction) {
            case 'activate':
              return { ...sub, status: 'active' as const };
            case 'cancel':
              return { ...sub, status: 'cancelled' as const };
            case 'renew':
              const newEndDate = new Date();
              newEndDate.setDate(newEndDate.getDate() + renewDays);
              return {
                ...sub,
                status: 'active' as const,
                endDate: newEndDate.toISOString().split('T')[0]
              };
          }
        }
        return sub;
      });

      setSubscriptions(updatedSubscriptions);
      setIsProcessing(false);
      closeModal();
    }, 1500);
  };

  // Funciones para gestión de planes
  const openPlanModal = (plan: Plan | null, action: 'create' | 'edit' | 'delete') => {
    setSelectedPlan(plan);
    setPlanModalAction(action);

    if (plan && action === 'edit') {
      setPlanForm({
        name: plan.name,
        durationInDays: plan.durationInDays,
        price: plan.price,
        description: plan.description,
        characteristics: plan.characteristics,
        active: plan.active,
        createdAt: plan.createdAt,
        id: plan.id
      });
    } else if (action === 'create') {
      setPlanForm({
        name: '',
        durationInDays: 30,
        price: 0,
        description: '',
        characteristics: [],
        active: true,
        createdAt: '',
        id: ''
      });
    }

    setShowPlanModal(true);
  };

  const closePlanModal = () => {
    setShowPlanModal(false);
    setSelectedPlan(null);
    setIsProcessing(false);
  };

  const handlePlanAction = async () => {
    setIsProcessing(true);

    // setTimeout(() => {
    //   if (planModalAction === 'create') {
    //     const newPlan: Plan = {
    //       id: `plan_${Date.now()}`,
    //       ...planForm,
    //       characteristics: planForm.characteristics.filter(f => f.trim() !== ''),
    //       createdAt: new Date().toISOString().split('T')[0]
    //     };
    //     setPlans([...plans, newPlan]);
    //   } else if (planModalAction === 'edit' && selectedPlan) {
    //     const updatedPlans = plans.map(plan =>
    //       plan.id === selectedPlan.id
    //         ? { ...plan, ...planForm, features: planForm.characteristics.filter(f => f.trim() !== '') }
    //         : plan
    //     );
    //     setPlans(updatedPlans);
    //   } else if (planModalAction === 'delete' && selectedPlan) {
    //     setPlans(plans.filter(plan => plan.id !== selectedPlan.id));
    //   }

    //   setIsProcessing(false);
    //   closePlanModal();
    // }, 1000);
  };

  const addFeature = () => {
    setPlanForm({
      ...planForm,
      characteristics: [...planForm.characteristics, {
        id: '',
        name: ''
      }]
    });
  };

  const removeFeature = (index: number) => {
    setPlanForm({
      ...planForm,
      characteristics: planForm.characteristics.filter((_, i) => i !== index)
    });
  };

  const updateFeature = (index: number, value: string) => {
    // const newFeatures = [...planForm.characteristics];
    // newFeatures[index] = value;
    // setPlanForm({
    //   ...planForm,
    //   characteristics: newFeatures
    // });
  };

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === 'active').length,
    expired: subscriptions.filter(s => s.status === 'expired').length,
    cancelled: subscriptions.filter(s => s.status === 'cancelled').length,
    revenue: subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.price, 0)
  };

  const planStats = {
    total: plans.length,
    active: plans.filter(p => p.active).length,
    inactive: plans.filter(p => !p.active).length,
    mostPopular: plans.reduce((prev, current) => {
      const prevCount = subscriptions.filter(s => s.planId === prev.id).length;
      const currentCount = subscriptions.filter(s => s.planId === current.id).length;
      return currentCount > prevCount ? current : prev;
    }, plans[0])
  };

  if (!initialProps.session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Acceso Denegado</h2>
          <p className="text-gray-300">Necesitas permisos de administrador para acceder a esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Panel Administrativo
              </h1>
              <p className="text-white">Gestión de suscripciones y planes</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-300">Admin:</span>
                <span className="text-blue-400 font-semibold">{initialProps.session.user?.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
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
            </nav>
          </div>
        </div>

        {activeTab === 'subscriptions' ? (
          <>
            {/* Stats Cards - Suscripciones */}
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

            {/* Filters and Search */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, email o ID..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Todos los estados</option>
                    <option value="active">Activos</option>
                    <option value="expired">Expirados</option>
                    <option value="cancelled">Cancelados</option>
                    <option value="pending">Pendientes</option>
                  </select>

                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                  >
                    <option value="all">Todos los planes</option>
                    {plans.map(plan => (
                      <option key={plan.id} value={plan.id}>{plan.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Subscriptions Table */}
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
                      {filteredSubscriptions.map((subscription) => (
                        <tr key={subscription.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{subscription.userName}</div>
                              <div className="text-sm text-gray-500">{subscription.userEmail}</div>
                              <div className="text-xs text-gray-400">ID: {subscription.id}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{getPlanName(subscription.planId)}</div>
                            <div className="text-xs text-gray-500">{subscription.paymentMethod}</div>
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
                            <div className="flex space-x-2">
                              <button
                                onClick={() => openModal(subscription, 'view')}
                                className="text-blue-600 hover:text-blue-900 p-1"
                                title="Ver detalles"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {subscription.status !== 'active' && (
                                <button
                                  onClick={() => openModal(subscription, 'activate')}
                                  className="text-green-600 hover:text-green-900 p-1"
                                  title="Activar"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}

                              {subscription.status === 'active' && (
                                <button
                                  onClick={() => openModal(subscription, 'cancel')}
                                  className="text-red-600 hover:text-red-900 p-1"
                                  title="Cancelar"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}

                              <button
                                onClick={() => openModal(subscription, 'renew')}
                                className="text-purple-600 hover:text-purple-900 p-1"
                                title="Renovar"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
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
          </>
        ) : (
          <>
            {/* Stats Cards - Planes */}
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

            {/* Plans Header */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Gestión de Planes</h2>
                  <p className="text-gray-600">Administra los planes de suscripción disponibles</p>
                </div>
                <button
                  onClick={() => openPlanModal(null, 'create')}
                  className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Plan
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${plan.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}>
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
                        onClick={() => openPlanModal(plan, 'edit')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </button>
                      <button
                        onClick={() => openPlanModal(plan, 'delete')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-6 py-3">
                    <div className="text-sm text-gray-600">
                      Suscripciones activas: {subscriptions.filter(s => s.planId === plan.id && s.status === 'active').length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal de Suscripciones */}
        {showModal && selectedSubscription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  {modalAction === 'view' && 'Detalles de Suscripción'}
                  {modalAction === 'activate' && 'Activar Suscripción'}
                  {modalAction === 'cancel' && 'Cancelar Suscripción'}
                  {modalAction === 'renew' && 'Renovar Suscripción'}
                </h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800">{selectedSubscription.userName}</h3>
                    <p className="text-gray-600 text-sm">{selectedSubscription.userEmail}</p>
                    <p className="text-xs text-gray-500">ID: {selectedSubscription.id}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Plan:</span>
                      <p className="text-gray-900">{getPlanName(selectedSubscription.planId)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Estado:</span>
                      <p className={`font-semibold ${getStatusColor(selectedSubscription.status).split(' ')[0]}`}>
                        {getStatusText(selectedSubscription.status)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Inicio:</span>
                      <p className="text-gray-900">{selectedSubscription.startDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Fin:</span>
                      <p className="text-gray-900">{selectedSubscription.endDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Precio:</span>
                      <p className="text-gray-900 font-semibold">${selectedSubscription.price}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Método:</span>
                      <p className="text-gray-900">{selectedSubscription.paymentMethod}</p>
                    </div>
                  </div>

                  {modalAction === 'renew' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Días de renovación:
                      </label>
                      <select
                        value={renewDays}
                        onChange={(e) => setRenewDays(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={1}>1 día</option>
                        <option value={15}>15 días</option>
                        <option value={30}>30 días</option>
                        <option value={90}>90 días</option>
                        <option value={365}>365 días</option>
                      </select>
                    </div>
                  )}

                  {modalAction !== 'view' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        {modalAction === 'activate' && '¿Estás seguro de que quieres activar esta suscripción?'}
                        {modalAction === 'cancel' && '¿Estás seguro de que quieres cancelar esta suscripción?'}
                        {modalAction === 'renew' && `¿Estás seguro de que quieres renovar esta suscripción por ${renewDays} días?`}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {modalAction === 'view' ? 'Cerrar' : 'Cancelar'}
                  </button>

                  {modalAction !== 'view' && (
                    <button
                      onClick={handleAction}
                      disabled={isProcessing}
                      className={`px-4 py-2 text-white rounded-lg transition-colors ${modalAction === 'activate' ? 'bg-green-600 hover:bg-green-700' :
                          modalAction === 'cancel' ? 'bg-red-600 hover:bg-red-700' :
                            'bg-purple-600 hover:bg-purple-700'
                        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isProcessing ? 'Procesando...' :
                        modalAction === 'activate' ? 'Activar' :
                          modalAction === 'cancel' ? 'Cancelar' : 'Renovar'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Planes */}
        {showPlanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  {planModalAction === 'create' && 'Crear Nuevo Plan'}
                  {planModalAction === 'edit' && 'Editar Plan'}
                  {planModalAction === 'delete' && 'Eliminar Plan'}
                </h2>
                <button onClick={closePlanModal} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                {planModalAction === 'delete' ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-red-800 mb-2">¡Atención!</h3>
                      <p className="text-red-700">
                        Estás a punto de eliminar el plan "{selectedPlan?.name}".
                        Esta acción no se puede deshacer.
                      </p>
                      <p className="text-red-700 mt-2">
                        Suscripciones activas con este plan: {subscriptions.filter(s => s.planId === selectedPlan?.id && s.status === 'active').length}
                      </p>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={closePlanModal}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handlePlanAction}
                        disabled={isProcessing}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        {isProcessing ? 'Eliminando...' : 'Eliminar Plan'}
                      </button>
                    </div>
                  </div>
                ) : (
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
                              value={characteristic.id}
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

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={closePlanModal}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handlePlanAction}
                        disabled={isProcessing || !planForm.name.trim()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        {isProcessing ? 'Procesando...' :
                          planModalAction === 'create' ? 'Crear Plan' : 'Guardar Cambios'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubscriptions;