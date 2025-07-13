import React, { useState } from "react";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { alertKit } from "alert-kit";
import { keyNumberInteger } from "../../utils/keyEvent";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}

interface FormData {
  qtyUserHotspot: number;
  profileHotspot: string;
  rateLimitUp: string;
  rateLimitUnitUp: string;
  rateLimitDown: string;
  rateLimitUnitDown: string;
  limitUptimeDays: string;
  limitUptimeHours: string;
  limitUptimeMinutes: string;
  limitUptimeSeconds: string;
  limitQuota: string;
  limitQuotaUnit: string;
  typeUsername: string;
  typePassword: string;
  isUsingQr: boolean;
}

const FormulariomikrotikUsernamePasswordHotspotGenerator = ({ session, subscription }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    qtyUserHotspot: 10,
    profileHotspot: "default",
    rateLimitUp: "1",
    rateLimitUnitUp: "mb",
    rateLimitDown: "1",
    rateLimitUnitDown: "mb",
    limitUptimeDays: "0",
    limitUptimeHours: "0",
    limitUptimeMinutes: "0",
    limitUptimeSeconds: "0",
    limitQuota: "0",
    limitQuotaUnit: "GB",
    typeUsername: "user-",
    typePassword: "01",
    isUsingQr: false,
  });

  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target;
      if (id === "isUsingQr" && checked) {
        setFormData((prevData) => ({
          ...prevData,
          [id]: checked,
          typePassword: "01", // Reiniciar a un valor predeterminado
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [id]: checked,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
    // Limpiar el resultado del script cuando se cambie algún valor en el formulario
    setScriptResult(null);
  };

  const handleSubmit = async () => {
    if (!validateAuth()) return;

    // Construir el valor de limitUptime a partir de los campos separados
    const limitUptime = `${formData.limitUptimeDays}d${formData.limitUptimeHours}h${formData.limitUptimeMinutes}m${formData.limitUptimeSeconds}s`;

    const result = await makeApiCall("/mikrotik-username-password-hotspot-generator", {
      ...formData,
      limitUptime
    });

    if (result) {
      setScriptResult(result);
    }
  };

  const handleClear = () => {
    if (!validateAuth()) return;
    setScriptResult(null);
  };

  const handlePrint = () => {
    if (!validateAuth() || !scriptResult?.pdf) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
              body {
                font-family: "Roboto", serif;
                font-weight: normal;
                background-color: white;
                color: #000;
                padding: 0mm;
              }
              table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 5mm;
              }
              th, td {
                border: 0.5mm solid #ddd;
                padding: 2mm;
                text-align: left;
                font-size: 10pt;
              }
              th {
                background-color: #f5f5f5;
              }
            </style>
          </head>
          <body>
            <div>${scriptResult.pdf}</div>
            <script>
              window.onload = function() {
                window.print();
                window.close();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-gray-900 text-white">
      {/* Panel izquierdo - Formulario */}
      <div className="w-full lg:w-1/2 bg-gray-800 p-4 rounded-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Cantidad de Fichas
            </label>
            <input
              id="qtyUserHotspot"
              type="text"
              value={formData.qtyUserHotspot}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Profile Hotspot <span className="text-gray-500">(Nombre perfil)</span>
            </label>
            <input
              id="profileHotspot"
              type="text"
              value={formData.profileHotspot}
              onChange={handleChange}
              maxLength={15}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Límite de velocidad [Subida]
              </label>
              <div className="flex space-x-4">
                <div className="flex space-x-2 flex-1">
                  <input
                    id="rateLimitUp"
                    type="text"
                    value={formData.rateLimitUp}
                    onChange={handleChange}
                    className="w-3/4 p-2 border border-gray-600 rounded bg-gray-700"
                    onKeyDown={(e) => keyNumberInteger(e)}
                  />
                  <select
                    id="rateLimitUnitUp"
                    value={formData.rateLimitUnitUp}
                    onChange={handleChange}
                    className="w-1/4 p-2 border border-gray-600 rounded bg-gray-700"
                  >
                    <option value="kb">KB</option>
                    <option value="mb">MB</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Límite de velocidad [Descarga]
              </label>
              <div className="flex space-x-4">
                <div className="flex space-x-2 flex-1">
                  <input
                    id="rateLimitDown"
                    type="text"
                    value={formData.rateLimitDown}
                    onChange={handleChange}
                    className="w-3/4 p-2 border border-gray-600 rounded bg-gray-700"
                    onKeyDown={(e) => keyNumberInteger(e)}
                  />
                  <select
                    id="rateLimitUnitDown"
                    value={formData.rateLimitUnitDown}
                    onChange={handleChange}
                    className="w-1/4 p-2 border border-gray-600 rounded bg-gray-700"
                  >
                    <option value="kb">KB</option>
                    <option value="mb">MB</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Limit Uptime [Duración]
            </label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-400 mb-1">Días</label>
                <input
                  id="limitUptimeDays"
                  type="text"
                  value={formData.limitUptimeDays}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                  onKeyDown={(e) => keyNumberInteger(e)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-400 mb-1">Horas</label>
                <input
                  id="limitUptimeHours"
                  type="text"
                  value={formData.limitUptimeHours}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                  onKeyDown={(e) => keyNumberInteger(e)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-400 mb-1">Minutos</label>
                <input
                  id="limitUptimeMinutes"
                  type="text"
                  value={formData.limitUptimeMinutes}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                  onKeyDown={(e) => keyNumberInteger(e)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-400 mb-1">Segundos</label>
                <input
                  id="limitUptimeSeconds"
                  type="text"
                  value={formData.limitUptimeSeconds}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                  onKeyDown={(e) => keyNumberInteger(e)}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Formato: d=Día | h=Hora | m=Minutos | s=Segundos</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Limit Quota [total Bytes]
            </label>
            <div className="flex space-x-2">
              <input
                id="limitQuota"
                type="text"
                value={formData.limitQuota}
                onChange={handleChange}
                className="w-3/4 p-2 border border-gray-600 rounded bg-gray-700"
                onKeyDown={(e) => keyNumberInteger(e)}
              />
              <select
                id="limitQuotaUnit"
                value={formData.limitQuotaUnit}
                onChange={handleChange}
                className="w-1/4 p-2 border border-gray-600 rounded bg-gray-700"
              >
                <option value="KB">KB</option>
                <option value="MB">MB</option>
                <option value="GB">GB</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Type Username
            </label>
            <input
              id="typeUsername"
              type="text"
              value={formData.typeUsername}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Type Password
            </label>
            <select
              id="typePassword"
              value={formData.typePassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
              disabled={formData.isUsingQr && !["01", "02"].includes(formData.typePassword)}
            >
              <option value="01">Password = Username</option>
              <option value="02">Username = Password</option>
              <option value="03" disabled={formData.isUsingQr}>Type Username = Password</option>
              <option value="04" disabled={formData.isUsingQr}>Random 3 Character</option>
              <option value="05" disabled={formData.isUsingQr}>Random 4 Character</option>
              <option value="06" disabled={formData.isUsingQr}>Random 5 Character</option>
              <option value="07" disabled={formData.isUsingQr}>Random Numeros</option>
            </select>
          </div>
          <div>
            <input
              type="checkbox"
              id="isUsingQr"
              className="mr-2"
              checked={formData.isUsingQr}
              onChange={handleChange}
            />
            <label htmlFor="isUsingQr" className="text-white">Activar impresión solo con QR</label>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-orange-600 text-white px-4 py-4 w-full rounded hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
            disabled={isLoading || !session}
          >
            {isLoading ? "Generando..." : "Generar Ficha"}
          </button>
        </div>
        {/* Tienes dudas */}
        <div className="mt-4">
          <div className="relative flex justify-end group">
            <button
              className="shadow-xl/30 text-white text-sm font-medium py-1.5 px-4 rounded-md transition duration-200"
            >
              ¿Tienes dudas?
            </button>
            <div className="absolute bottom-full right-0 mb-2 w-100 bg-gray-900 bg-opacity-90 text-white text-sm rounded-lg p-4 shadow-lg opacity-0 scale-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 z-10 pointer-events-auto">
              <p className="mb-3">Aprende cómo usar la herramienta con nuestro video explicativo</p>
              <div className="flex justify-around">
                <a
                  href="https://x.com/RMikrotik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-400 hover:bg-blue-500 text-white px-3 py-1 rounded-full text-xs"
                >
                  Twitter
                </a>
                <a
                  href="https://www.youtube.com/channel/UCq3nYbC1ceUwoZqYiESFb7g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs"
                >
                  YouTube
                </a>
                <a
                  href="https://www.tiktok.com/@rmikrotik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-full text-xs"
                >
                  TikTok
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61577406418771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/rmikrotik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded-full text-xs"
                >
                  Instagram
                </a>
              </div>
              <div className="absolute -bottom-1.5 right-3 w-3 h-3 rotate-45 bg-gray-900 bg-opacity-90"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Panel derecho - Resultado */}
      <div className="flex flex-col lg:w-1/2 min-h-0">
        <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Copy-Paste the Script to the Terminal
          </label>
          <div className="h-60 overflow-y-auto flex-grow bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm">
            {scriptResult ? (
              <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
            ) : (
              <p className="text-gray-500">
                {isLoading ? "Generating script..." : "The generated script will appear here"}
              </p>
            )}
          </div>
        </div>
        <div className="flex mt-4 space-x-4">
          <button
            type="button"
            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
            onClick={handleClear}
            disabled={!session}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Borrar Todo
          </button>
          <button
            type="button"
            className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:bg-red-500 disabled:cursor-not-allowed"
            onClick={handleCopyScript}
            disabled={!scriptResult?.html || !session}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copiar Script
          </button>
          <button
            type="button"
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:bg-green-500 disabled:cursor-not-allowed"
            onClick={handlePrint}
            disabled={!scriptResult?.pdf || !session}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormulariomikrotikUsernamePasswordHotspotGenerator;
