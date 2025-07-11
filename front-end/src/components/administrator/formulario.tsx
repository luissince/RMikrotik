import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import type { Plan } from '../../types/plan/plan';
import type { Subscription } from '../../types/subscription/subscription';
import type { User } from '../../types/user/user';
import AdminHeader from './AdminHeader';
import Tabs from './Tabs';
import SubscriptionStats from './SubscriptionStats';
import SubscriptionFilters from './SubscriptionFilters';
import SubscriptionsTable from './SubscriptionsTable';
import PlanStats from './PlanStats';
import PlansGrid from './PlansGrid';
import UserStats from './UserStats';
import UsersTable from './UsersTable';
import SubscriptionModal from './SubscriptionModal';
import PlanModal from './PlanModal';
import CouponStats from './CouponStats';
import CouponsTable from './CouponsTable';
import CouponModal from './CouponModal';
import type { Coupon } from '../../types/coupon/coupon';
import { alertKit } from 'alert-kit';
import type { Session } from '@auth/core/types';
import { useApiCall, useAuthValidation } from '../forms/BaseForm';

interface Props {
  session: Session | null;
  user: User | null;
  subscriptions: Subscription[];
  plans: Plan[];
  users: User[];
  coupons: Coupon[];
}

const AdminSubscriptions: React.FC<Props> = (initialProps) => {
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'plans' | 'users' | 'coupons'>('subscriptions');
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>(initialProps.subscriptions);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialProps.users);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [modalAction, setModalAction] = useState<'activate' | 'cancel' | 'renew' | 'view'>('view');

  // Usar hooks personalizados
  const { makeApiCall, isLoading } = useApiCall(initialProps.session);

  // Estados para gestión de planes
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [planModalAction, setPlanModalAction] = useState<'create' | 'edit' | 'delete'>('create');
  const [planForm, setPlanForm] = useState<Plan>({
    id: 0,
    active: true,
    durationInDays: 30,
    name: '',
    description: '',
    price: 0,
    createdAt: '',
    characteristics: []
  });

  // Estados para gestión de cupones
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponModalAction, setCouponModalAction] = useState<'create' | 'edit' | 'delete'>('create');
  const [couponForm, setCouponForm] = useState<Coupon>({
    id: '',
    code: '',
    used: false,
    planId: null,
  });

  useEffect(() => {
    let filtered = initialProps.subscriptions;

    if (searchTerm) {
      filtered = filtered.filter(sub =>
        sub.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    if (planFilter !== 'all') {
      filtered = filtered.filter(sub => sub.plan.id.toString() === planFilter);
    }

    setFilteredSubscriptions(filtered);
  }, [searchTerm, statusFilter, planFilter, initialProps.subscriptions]);

  useEffect(() => {
    let filtered = initialProps.users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, initialProps.users]);

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

  const openModalSubscription = (subscription: Subscription, action: 'activate' | 'cancel' | 'renew' | 'view') => {
    setSelectedSubscription(subscription);
    setModalAction(action);
    setShowSubscriptionModal(true);
  };

  const closeModalSubscription = () => {
    setShowSubscriptionModal(false);
    setSelectedSubscription(null);
  };

  const handleSubscriptionAction = async () => {
    if (!selectedSubscription) return;

    const confirmation = await new Promise((resolve) => {
      alertKit.question({
        title: 'Subscription',
        message: '¿Está seguro de que desea activar la cuenta?',
      }, resolve);
    });
    if (confirmation) {
      const result = await makeApiCall(`/payment/active`, selectedSubscription);
      if (result) {
        alertKit.success({
          title: 'Cuenta activada',
          message: result.message,
        }, () => {
          window.location.reload();
        });
      }
    }
  };

  // Functions for managing plans
  const openModalPlan = (plan: Plan | null, action: 'create' | 'edit' | 'delete') => {
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
        id: 0,
      });
    }

    setShowPlanModal(true);
  };

  const closeModalPlan = () => {
    setShowPlanModal(false);
  };

  const handlePlanAction = async () => {

    closeModalPlan();
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
    const updatedFeatures = [...planForm.characteristics];
    updatedFeatures[index].name = value;
    setPlanForm({
      ...planForm,
      characteristics: updatedFeatures
    });
  };

  const openModalCoupon = (coupon: Coupon | null, action: 'create' | 'edit' | 'delete') => {
    setCouponModalAction(action);

    if (coupon && action === 'edit') {
      if (coupon.used) {
        alertKit.warning({
          title: 'Cupón',
          message: 'No se puede editar un cupón que ya ha sido usado',
        });
        return;
      }
      setCouponForm({
        id: coupon.id,
        code: coupon.code,
        createdAt: coupon.createdAt,
        used: coupon.used,
        planId: coupon.planId,
      });
    } else if (action === 'create') {
      setCouponForm({
        id: '',
        code: '',
        createdAt: new Date().toISOString(),
        used: false,
        planId: null,
      });
    } else if (coupon && action === 'delete') {
      if (coupon.used) {
        alertKit.warning({
          title: 'Cupón',
          message: 'No se puede eliminar un cupón que ya ha sido usado',
        });
        return;
      }
      setCouponForm({
        id: coupon.id,
        code: coupon.code,
        createdAt: coupon.createdAt,
        used: coupon.used,
        planId: coupon.planId,
      });
    }

    setShowCouponModal(true);
  };

  const closeModalCoupon = () => {
    setShowCouponModal(false);
  };

  const handleCouponAction = async () => {
    if (!couponForm.planId) {
      alertKit.warning({
        title: 'Cupón',
        message: 'Seleccione un plan',
      });
      return;
    }

    const confirmation = await new Promise((resolve) => {
      alertKit.question({
        title: 'Cupón',
        message: couponModalAction === 'create' ? '¿Está seguro de que desea crear un cupón?' :
          couponModalAction === 'edit' ? '¿Está seguro de que desea editar un cupón?' :
            '¿Está seguro de que desea eliminar este cupón?',
      }, resolve);
    });

    if (confirmation) {
      const method = couponModalAction === 'create' ? 'POST' : couponModalAction === 'edit' ? 'PUT' : 'DELETE';
      const url = `/coupon${couponModalAction === 'create' ? '' : `/${couponForm.id}`}`;

      const result = await makeApiCall(url, couponModalAction === 'delete' ? null : couponForm, method);

      if (result) {
        alertKit.success({
          title: 'Cupón',
          message: result.message
        }, () => {
          window.location.reload();
        });
      }
    }
  };

  const couponStats = {
    total: initialProps.coupons.length,
    active: initialProps.coupons.filter(c => !c.used).length,
    inactive: initialProps.coupons.filter(c => c.used).length,
  };

  const stats = {
    total: initialProps.subscriptions.length,
    active: initialProps.subscriptions.filter(s => s.status === 'active').length,
    expired: initialProps.subscriptions.filter(s => s.status === 'expired').length,
    cancelled: initialProps.subscriptions.filter(s => s.status === 'cancelled').length,
    revenue: initialProps.subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.price, 0)
  };

  const userStats = {
    total: initialProps.users.length,
    active: initialProps.users.filter(u => u.status === 'active').length,
    inactive: initialProps.users.filter(u => u.status !== 'active').length,
  };

  const planStats = {
    total: initialProps.plans.length,
    active: initialProps.plans.filter(p => p.active).length,
    inactive: initialProps.plans.filter(p => !p.active).length,
    mostPopular: initialProps.plans.reduce((prev, current) => {
      const prevCount = initialProps.subscriptions.filter(s => s.plan.id.toString() === prev.id.toString()).length;
      const currentCount = initialProps.subscriptions.filter(s => s.plan.id.toString() === current.id.toString()).length;
      return currentCount > prevCount ? current : prev;
    }, initialProps.plans[0])
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <AdminHeader user={initialProps.user} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'subscriptions' && (
          <>
            <SubscriptionStats stats={stats} />
            <SubscriptionFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              planFilter={planFilter}
              setPlanFilter={setPlanFilter}
              plans={initialProps.plans}
            />
            <SubscriptionsTable
              filteredSubscriptions={filteredSubscriptions}
              loading={loading}
              openModalSubscription={openModalSubscription}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
            />
          </>
        )}

        {activeTab === 'plans' && (
          <>
            <PlanStats planStats={planStats} />
            <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Gestión de Planes</h2>
                  <p className="text-gray-600">Administra los planes de suscripción disponibles</p>
                </div>
                <button
                  onClick={() => openModalPlan(null, 'create')}
                  className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Plan
                </button>
              </div>
            </div>
            <PlansGrid
              plans={initialProps.plans}
              subscriptions={initialProps.subscriptions}
              openModalPlan={openModalPlan}
            />
          </>
        )}

        {activeTab === 'users' && (
          <>
            <UserStats userStats={userStats} />
            <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h2>
                  <p className="text-gray-600">Administra los usuarios registrados</p>
                </div>
              </div>
            </div>
            <UsersTable filteredUsers={filteredUsers} loading={loading} />
          </>
        )}

        {activeTab === 'coupons' && (
          <>
            <CouponStats couponStats={couponStats} />
            <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Gestión de Cupones</h2>
                  <p className="text-gray-600">Administra los cupones disponibles</p>
                </div>
                <button
                  onClick={() => openModalCoupon(null, 'create')}
                  className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Cupón
                </button>
              </div>
            </div>
            <CouponsTable coupons={initialProps.coupons} openModalCoupon={openModalCoupon} />
          </>
        )}

        <SubscriptionModal
          showSubscriptionModal={showSubscriptionModal}
          closeModalSubscription={closeModalSubscription}
          selectedSubscription={selectedSubscription}
          modalAction={modalAction}
          isProcessing={isLoading}
          handleAction={handleSubscriptionAction}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />
        <PlanModal
          showPlanModal={showPlanModal}
          closeModalPlan={closeModalPlan}
          planModalAction={planModalAction}
          planForm={planForm}
          setPlanForm={setPlanForm}
          isProcessing={isLoading}
          handleAction={handlePlanAction}
          addFeature={addFeature}
          removeFeature={removeFeature}
          updateFeature={updateFeature}
        />
        <CouponModal
          plans={initialProps.plans}
          showCouponModal={showCouponModal}
          closeModalCoupon={closeModalCoupon}
          couponModalAction={couponModalAction}
          couponForm={couponForm}
          setCouponForm={setCouponForm}
          isProcessing={isLoading}
          handleAction={handleCouponAction}
        />
      </div>
    </div>
  );
};

export default AdminSubscriptions;
