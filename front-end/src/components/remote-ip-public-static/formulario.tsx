import SocialTooltipButton from "../SocialTooltipButton";
import { useState, useRef } from "react";
import { keyIPAddress } from "../../utils/keyEvent";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}

interface FormData {
  interfaceIsp: string;
  ipGatewayIsp: string;
  idRosVersion: string;
}

const FormularioRemoteIpPublicStatic = ({ session, subscription }: Props) => {
  // Estados iniciales con valores por defecto
  const [formData, setFormData] = useState<FormData>({
    interfaceIsp: "ether1-ISP",
    ipGatewayIsp: "192.168.10.1",
    idRosVersion: "ros6"
  });

  // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);

  const refInterfaceIsp = useRef<HTMLInputElement>(null);

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    if (!validateAuth()) return;

    const result = await makeApiCall("/remote-ip-public-static", formData);
    if (result) {
      setScriptResult(result);
    }
  };
  // Limpieza del formulario
  const handleClear = () => {
    if (!validateAuth()) return;

    setFormData(formData);
    setScriptResult(null);
  };


  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg ">

      {/* Formulario */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="interfaceIsp" className="block text-sm font-semibold text-orange-400 mb-2">
              Interface ISP
            </label>
            <input
              ref={refInterfaceIsp}
              id="interfaceIsp"
              type="text"
              placeholder="ether1-ISP"
              className={`w-full bg-gray-700 text-gray-300 rounded-lg p-2 border border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              value={formData.interfaceIsp}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="ipGatewayIsp" className="block text-sm font-semibold text-orange-400 mb-2">
              IP Gateway ISP
            </label>
            <input
              id="ipGatewayIsp"
              type="text"
              placeholder="192.168.10.1"
              className={`w-full bg-gray-700 text-gray-300 rounded-lg p-2 border border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              value={formData.ipGatewayIsp}
              onChange={handleInputChange}
              onKeyDown={keyIPAddress}
            />
          </div>

          <div>
            <label htmlFor="idRosVersion" className="block text-sm font-semibold text-orange-400 mb-2">
              ROS Version
            </label>
            <select
              id="idRosVersion"
              className={`w-full bg-gray-700 border border-gray-600"
                } rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400`}
              value={formData.idRosVersion}
              onChange={handleInputChange}
            >
              <option value="ros6">RouterOS v6.xx</option>
              <option value="ros7">RouterOS v7.xx</option>
            </select>
          </div>

        </div>
        <SocialTooltipButton />
      </div>

      {/* Resultado */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-orange-400 mb-2">Copy-Paste to Terminal.</h3>
          <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
            {scriptResult ? (
              <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
            ) : (
              <p className="text-gray-500 text-sm">
                {isLoading ? "Generando script..." : "El script generado aparecerá aquí"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          type="button"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          onClick={handleClear}
          disabled={!session}
        >
          Borrar Todo
        </button>
        <button
          type="button"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
          onClick={handleSubmit}
          disabled={isLoading || !session}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
        <button
          type="button"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
          onClick={() => handleCopyScript()}
          disabled={!scriptResult?.html || !session}

        >
          Copy Script
        </button>
      </div>
    </div>
  );
};

export default FormularioRemoteIpPublicStatic;
