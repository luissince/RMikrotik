import React, { useState } from "react";
import person from "../../assets/icons/person.svg";
import { formatDate } from "../../utils/helper";
import type { User } from "../../types/user/user";
import type { Subscription } from "../../types/subscription/subscription";
import type { Session } from "@auth/core/types";
import { useApiCall, useAuthValidation } from "../forms/BaseForm";
import { alertKit } from "alert-kit";

interface Props {
  session: Session | null;
  user: User;
  subscription: Subscription;
}

const FormularioAccount: React.FC<Props> = ({ session, user, subscription }) => {
  const [couponCode, setCouponCode] = useState("");

  const { validateAuth } = useAuthValidation(session, subscription);

  const { makeApiCall, isLoading } = useApiCall(session);

  const getSubscriptionStatus = () => {
    if (!subscription) {
      return <td className="px-4 py-2 text-yellow-600 font-semibold">NO SUSCRITO</td>;
    }
    if (subscription.status === "active") {
      return <td className="px-4 py-2 text-green-600 font-semibold">ACTIVADO</td>;
    }
    return <td className="px-4 py-2 text-red-600 font-semibold">EXPIRADO</td>;
  };

  const handleActivateCoupon = async () => {
    if (!couponCode) {
      alertKit.warning({
        title: 'Código de Cupón',
        message: 'Ingrese el código de cupón',
      });
      return;
    }

    const payload = {
      planId: 0,
      method: "coupon",
      card: null,
      couponCode: couponCode,
    };

    const result = await makeApiCall(`/payment/with-coupon`, payload);
    if (result) {
      alertKit.success({
        title: 'Cupón',
        message: result.message,
      }, () => {
        window.location.reload();
      });
    }
  };

  return (
    <>
      {/* Contenido principal */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sección de perfil */}
        <div className="lg:w-1/3 bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col items-center">
            {/* Foto de perfil */}
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <img src={user?.image || person.src} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user?.name || "Nombre no disponible"}</h2>
            <p className="text-gray-600">{user?.email || "Email no disponible"}</p>
          </div>
          {/* Botones de acción */}
          <div className="mt-6 flex flex-col gap-3">
            <a href="/" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg inline-flex items-center justify-center">
              <i className="fas fa-home mr-2"></i> Inicio
            </a>
            <button onClick={() => document.getElementById("modal")?.classList.remove("hidden")} className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg">
              <i className="fas fa-lock mr-2"></i> Cambiar contraseña
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
              <i className="fas fa-right-from-bracket mr-2"></i> Cerrar sesión
            </button>
          </div>
        </div>
        {/* Sección de detalles de la cuenta */}
        <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Detalles de la Cuenta</h2>
          <table className="w-full table-auto text-sm mb-6">
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Identificador de correo electrónico</td>
                <td className="px-4 py-2">{user?.email || "Email no disponible"}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Nombre</td>
                <td className="px-4 py-2">{user?.name || "Nombre no disponible"}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="text-xl font-bold mb-4">Estado de Membresía</h2>
          <table className="w-full table-auto text-sm mb-6">
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Estado</td>
                {getSubscriptionStatus()}
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Plan</td>
                <td className="px-4 py-2">{subscription?.plan?.name || "Plan no disponible"}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Precio</td>
                <td className="px-4 py-2">$ {subscription?.price || "Precio no disponible"}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Fecha de Pago</td>
                <td className="px-4 py-2">{subscription?.startDate ? formatDate(subscription.startDate) : "Fecha no disponible"}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Fecha de Caducidad</td>
                <td className="px-4 py-2">{subscription?.endDate ? formatDate(subscription.endDate) : "Fecha no disponible"}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6 flex flex-col gap-3">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código de Cupón
              </label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Ingrese su código de cupón"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <button
              onClick={handleActivateCoupon}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
              disabled={isLoading}
            >
              Activar Cupón
            </button>
            <a href="/pricing" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex-1 text-center">
              <i className="fas fa-credit-card mr-2"></i> Comprar Membresía
            </a>
          </div>
        </div>
      </div>
      {/* Modal para cambiar contraseña */}
      <div id="modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
          <button onClick={() => document.getElementById("modal")?.classList.add("hidden")} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold" aria-label="Cerrar">
            &times;
          </button>
          <h2 className="text-xl font-bold text-orange-600 mb-4">CAMBIAR CONTRASEÑA</h2>
          <form>
            <label className="block font-semibold text-sm mb-1">
              Nueva contraseña <span className="text-orange-600">*</span>
            </label>
            <input type="password" placeholder="Nueva contraseña" className="w-full mb-4 px-4 py-2 border rounded-lg" />
            <label className="block font-semibold text-sm mb-1">
              Confirmar nueva contraseña <span className="text-orange-600">*</span>
            </label>
            <input type="password" placeholder="Confirmar nueva contraseña" className="w-full mb-4 px-4 py-2 border rounded-lg" />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => alert("Contraseña guardada")} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Guardar
              </button>
              <button type="button" onClick={() => document.getElementById("modal")?.classList.add("hidden")} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormularioAccount;
