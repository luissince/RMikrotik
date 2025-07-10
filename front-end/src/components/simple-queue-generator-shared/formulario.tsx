import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}
type ScriptResult = {
    html: string;
    text: string;
};
interface FormData {
    parentNameQueue: string;
    targetLocalIP: string;
    upTotal: string;
    downTotal: string;
    clientNameQueue: string;
    clientIdentity: string;
    startIPClient: string;
    endIPClient: string;
    upClient: string;
    downClient: string;
    upLimitAt: string;
    downLimitAt: string;
}
const defaultData: FormData = {
 parentNameQueue: "Global-Connection",
    targetLocalIP: "192.168.88.0/24",
    upTotal: "5M",
    downTotal: "10M",
    clientNameQueue: "Client-",
    clientIdentity: "1",
    startIPClient: "192.168.88.10",
    endIPClient: "192.168.88.35",
    upClient: "512K",
    downClient: "1M",
    upLimitAt: "0",
    downLimitAt: "0",
}



const FormularioSimpleQueueGeneratorShared = ({ session, subscription }: Props) => {
     // Datos del formulario
      const [formData, setFormData] = useState<FormData>(defaultData);


    const [parentNameQueue, setParentNameQueue] = useState("Global-Connection");
    const [targetLocalIP, setTargetLocalIP] = useState("192.168.88.0/24");
    const [upTotal, setUpTotal] = useState("5M");
    const [downTotal, setDownTotal] = useState("10M");
    const [clientNameQueue, setClientNameQueue] = useState("Client-");
    const [clientIdentity, setClientIdentity] = useState("1");
    const [startIPClient, setStartIPClient] = useState("192.168.88.10");
    const [endIPClient, setEndIPClient] = useState("192.168.88.35");
    const [upClient, setUpClient] = useState("512K");
    const [downClient, setDownClient] = useState("1M");
    const [upLimitAt, setUpLimitAt] = useState("0");
    const [downLimitAt, setDownLimitAt] = useState("0");
    const [autoSetBandwidth, setAutoSetBandwidth] = useState(false);

  // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);


     const handleSubmit = async () => {
    if (!validateAuth()) return;

    const result = await makeApiCall("/simple-queue-generator-shared", formData);
    if (result) {
      setScriptResult(result);
    }
  };

  const handleClear = () => {
    if (!validateAuth()) return;

    setFormData(defaultData);
    setScriptResult(null);
  };


    return (
        <div className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg ">
            {/* Form Section */}
            <div className="flex flex-col gap-6 lg:w-1/2">
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="parentNameQueue" className="block text-sm font-semibold text-gray-300">
                            Parent Name Queue
                        </label>
                        <input
                            id="parentNameQueue"
                            type="text"
                            value={parentNameQueue}
                            onChange={(e) => setParentNameQueue(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            placeholder="Global-Connection"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="targetLocalIP" className="block text-sm font-semibold text-gray-300">
                            Target Local IP / Interface
                        </label>
                        <input
                            id="targetLocalIP"
                            type="text"
                            value={targetLocalIP}
                            onChange={(e) => setTargetLocalIP(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            placeholder="192.168.88.0/24"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label htmlFor="upTotal" className="block text-sm font-semibold text-gray-300">
                                Upload Max-Limit
                            </label>
                            <input
                                id="upTotal"
                                type="text"
                                value={upTotal}
                                onChange={(e) => setUpTotal(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="5M"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label htmlFor="downTotal" className="block text-sm font-semibold text-gray-300">
                                Download Max-Limit
                            </label>
                            <input
                                id="downTotal"
                                type="text"
                                value={downTotal}
                                onChange={(e) => setDownTotal(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="10M"
                            />
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold text-orange-400 mb-4">Sub Parent Queue / Child Queue</h2>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label htmlFor="clientNameQueue" className="block text-sm font-semibold text-gray-300">
                                Client Name Queue
                            </label>
                            <input
                                id="clientNameQueue"
                                type="text"
                                value={clientNameQueue}
                                onChange={(e) => setClientNameQueue(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="Client-"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label htmlFor="clientIdentity" className="block text-sm font-semibold text-gray-300">
                                Client Identity
                            </label>
                            <input
                                id="clientIdentity"
                                type="text"
                                value={clientIdentity}
                                onChange={(e) => setClientIdentity(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="1"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label htmlFor="startIPClient" className="block text-sm font-semibold text-gray-300">
                                Start IP Client
                            </label>
                            <input
                                id="startIPClient"
                                type="text"
                                value={startIPClient}
                                onChange={(e) => setStartIPClient(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="192.168.88.10"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label htmlFor="endIPClient" className="block text-sm font-semibold text-gray-300">
                                End IP Client
                            </label>
                            <input
                                id="endIPClient"
                                type="text"
                                value={endIPClient}
                                onChange={(e) => setEndIPClient(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="192.168.88.35"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label htmlFor="upClient" className="block text-sm font-semibold text-gray-300">
                                Upload Max-Limit
                            </label>
                            <input
                                id="upClient"
                                type="text"
                                value={upClient}
                                onChange={(e) => setUpClient(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="512K"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label htmlFor="downClient" className="block text-sm font-semibold text-gray-300">
                                Download Max-Limit
                            </label>
                            <input
                                id="downClient"
                                type="text"
                                value={downClient}
                                onChange={(e) => setDownClient(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="1M"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label htmlFor="upLimitAt" className="block text-sm font-semibold text-gray-300">
                                Upload Limit-At
                            </label>
                            <input
                                id="upLimitAt"
                                type="text"
                                value={upLimitAt}
                                onChange={(e) => setUpLimitAt(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="0"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label htmlFor="downLimitAt" className="block text-sm font-semibold text-gray-300">
                                Download Limit-At
                            </label>
                            <input
                                id="downLimitAt"
                                type="text"
                                value={downLimitAt}
                                onChange={(e) => setDownLimitAt(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                        <input
                            id="autoSetBandwidth"
                            type="checkbox"
                            checked={autoSetBandwidth}
                            onChange={(e) => setAutoSetBandwidth(e.target.checked)}
                            className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-600 rounded"
                        />
                        <label htmlFor="autoSetBandwidth" className="text-sm text-gray-300">
                            Auto Set For Bandwidth Shared (UP-TO)
                        </label>
                    </div>

                    <div className="flex mt-4 space-x-4">
                        <button
                            type="button"
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                            onClick={handleSubmit}
                        >
                            Generar
                        </button>
                        <button
                            type="button"
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                            onClick={handleClear}
                        >
                            Borrar Todo
                        </button>
                        <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                               onClick={() => scriptResult && navigator.clipboard.writeText(scriptResult.text)}                   >
                            Copiar Script
                        </button>
                    </div>
                    <SocialTooltipButton />
                </form>
            </div>

            {/* Result Section */}
            <div className="flex flex-col lg:w-1/2 min-h-0">
                <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Script Generator Result</label>
                    <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
                        {scriptResult && (
                            <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
                        )}
                    </div>
                </div>

      
            </div>
        </div>
    );
};

export default FormularioSimpleQueueGeneratorShared;
