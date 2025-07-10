import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}
interface FormData {
    idRoutingOptions: string;
    idRosVersion: string;
    ispGateway: string;
    routingMark: string;
}

interface ScriptResult {
    html1: string;
    html2: string;
    text1: string;
    text2: string;
}

const FormularioMikrotikStaticRouting = ({ session, subscription }: Props) => {
    const [formData, setFormData] = useState<FormData>({
        idRoutingOptions: 'Youtube',
        idRosVersion: 'ros6',
        ispGateway: '0.0.0.0',
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

    const result = await makeApiCall("/mikrotik-static-routing", formData);
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
                        <label htmlFor="idRoutingOptions" className="block font-semibold text-orange-400 mb-2">Routing Options</label>
                        <select
                            id="idRoutingOptions"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.idRoutingOptions}
                            onChange={handleChange}
                        >
                            <option disabled value="">----------- Streaming</option>
                            <option value="Youtube">Youtube</option>
                            <option value="Tiktok">Tiktok</option>
                            <option value="Vidio">Vidio</option>
                            <option value="Iflix">Iflix</option>
                            <option value="Netflix">Netflix</option>
                            <option disabled value="">----------- Social Media</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Instagram">Instagram</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Telegram">Telegram</option>
                            <option value="Threads">Threads</option>
                            <option value="Imo">Imo.im</option>
                            <option disabled value="">----------- E-Commerce</option>
                            <option value="Shopee">Shopee</option>
                            <option value="Tokopedia">Tokopedia</option>
                            <option value="Bukalapak">Bukalapak</option>
                            <option value="Lazada">Lazada</option>
                            <option disabled value="">----------- Video Conperence</option>
                            <option value="Zoom">Zoom Meeting</option>
                            <option value="Teams">Microsoft Teams</option>
                            <option value="Google-Meet">Google Meet</option>
                            <option disabled value="">----------- Other List IP</option>
                            <option value="Meta">Meta</option>
                            <option value="Google">Google</option>
                            <option value="Speedtest">Speedtest</option>
                            <option value="GGC">GGC (Google Global Cache)</option>
                            <option value="NICE-OIXP">Nice IIX or OIXP (indonesia)</option>
                            <option value="Bank-Indonesia">All Indonesian Bank</option>
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

            {/* Resultado 1 */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-orange-400 mb-2">Copy-Paste to Terminal.</h3>
                    <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
                        {scriptResult ? (
                            <div>
                                <div dangerouslySetInnerHTML={{ __html: scriptResult.html1 }} />
                                <button
                                    type="button"
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 mt-2"
                                    onClick={() => handleCopyScript(scriptResult.text1)}
                                >
                                    Copy STEP 1
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                El script generado aparecerá aquí
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Resultado 2 */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-orange-400 mb-2">Copy-Paste to Terminal.</h3>
                    <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
                        {scriptResult ? (
                            <div>
                                <div dangerouslySetInnerHTML={{ __html: scriptResult.html2 }} />
                                <button
                                    type="button"
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 mt-2"
                                    onClick={() => handleCopyScript(scriptResult.text2)}
                                >
                                    Copy STEP 2
                                </button>
                            </div>
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
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
                    onClick={handleSubmit}
                >
                    Generate Script
                </button>
            </div>
        </form>
    );
};

export default FormularioMikrotikStaticRouting;
