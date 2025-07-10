import SocialTooltipButton from "../SocialTooltipButton";
import React, { useState } from "react";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}

interface FormData {
    idRoutingOption: string;
    idIpOption: string;
    idRosVersion: string;
    ispGateway: string;
    targetClientIp: string;
    routingMark: string;
}

interface ScriptResult {
    html: string;
    text: string;
}

const FormularioMikrotikLocalIpPbr = ({ session, subscription }: Props) => {
    
    const [formData, setFormData] = useState<FormData>({
        idRoutingOption: 'R1',
        idIpOption: 'global-IPP',
        idRosVersion: 'ros6',
        ispGateway: '0.0.0.0',
        targetClientIp: '0.0.0.0/0',
        routingMark: 'To-ISP-1',
    });
    const [error, setError] = useState<string | null>(null);

  // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

  const handleSubmit = async () => {
    if (!validateAuth()) return;

    const result = await makeApiCall("/mikrotik-local-ip-pbr", formData);
    if (result) {
      setScriptResult(result);
    }
  };

 

      const handleClear = () => {
    if (!validateAuth()) return;

    setFormData(formData);
    setScriptResult(null);
  };

    return (
        <form className="bg-gray-900 p-6 rounded-lg shadow-lg min-h-[70vh]">
            {/* Formulario */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="idRoutingOption" className="block font-semibold text-orange-400 mb-2">Routing Options</label>
                        <select
                            id="idRoutingOption"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.idRoutingOption}
                            onChange={handleChange}
                        >
                            <option value="R1">Route Mangle</option>
                            {/* <option value="R2">Route Routes</option> */}
                            <option value="R2">Route Rules</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="idIpOptions" className="block font-semibold text-orange-400 mb-2">IP Options</label>
                        <select
                            id="idIpOptions"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.idIpOption}
                            onChange={handleChange}
                        >
                            <option value="global-IP">Global IP</option>
                            <option value="range-IP">Range IP</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="idRosVersion" className="block font-semibold text-orange-400 mb-2">ROS Version</label>
                        <select
                            id="idRosVersion"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.idRosVersion}
                            onChange={handleChange}
                        >
                            <option value="ros6">RouterOS v6.xx</option>
                            <option value="ros7">RouterOS v7.xx</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="ispGateway" className="block font-semibold text-orange-400 mb-2">ISP Gateway</label>
                        <input
                            id="ispGateway"
                            type="text"
                            placeholder="0.0.0.0"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.ispGateway}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="targetClientIp" className="block font-semibold text-orange-400 mb-2">Target Client IP</label>
                        <input
                            id="targetClientIp"
                            type="text"
                            placeholder="0.0.0.0/0"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.targetClientIp}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="routingMark" className="block font-semibold text-orange-400 mb-2">Routing Mark</label>
                        <input
                            id="routingMark"
                            type="text"
                            placeholder="To-ISP-1"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.routingMark}
                            onChange={handleChange}
                        />
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
                                El script generado aparecerá aquí
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
                >
                    Borrar Todo
                </button>
               <button
            type="button"
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={isLoading || !session}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            {isLoading ? "Generando..." : " Generar"}
          </button>
               <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:bg-indigo-500 disabled:cursor-not-allowed"
            onClick={handleCopyScript}
            disabled={!scriptResult?.html || !session}
          >
            <i className="fa-solid fa-arrow-up-from-bracket mr-2"></i>
            Copiar Script
          </button>
            </div>
        </form>
    );
};

export default FormularioMikrotikLocalIpPbr;
