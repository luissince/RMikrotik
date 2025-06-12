import React, { useState } from "react";

type ScriptResult = {
  script: string;
   text: string;
};
interface FormData {
 
 wifiIdMode: string;
    targetInterface: string;
    username: string;
    password: string;
    makel: string;
    gwId: string;
    wlan: string;
    sessionId: string;
    redirUrl: string;
 

}
const FormularioWifidwmsSeamless = () => {
  const [formData, setFormData] = useState({
    wifiIdMode: "SEAMLESS WIFI_ID",
    targetInterface: "wlan1",
    username: "cintalaura",
    password: "cintalaura123",
    makel: "@wms.1562532780.000",
    gwId: "GW_ID",
    wlan: "MGMUN00048-N/TLK-DI-103929:CI",
    sessionId: "0C02FFFF78006120-70C0DFA0",
    redirUrl: "http://www.msftconnecttest.com/redirect",
  });

    const [error, setError] = useState<string | null>(null);
   
    const [isLoading, setIsLoading] = useState(false);

  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {

      // Simulate API call
      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/wifid-wms-seamless`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const resultData: ScriptResult = await response.json();
      setScriptResult(resultData);
    } catch (error) {
      setError("Error generating script: " + (error as Error).message);
    }
  };

  const handleClear = () => {
    setFormData({
      wifiIdMode: "SEAMLESS WIFI_ID",
      targetInterface: "wlan1",
      username: "",
      password: "",
      makel: "",
      gwId: "",
      wlan: "",
      sessionId: "",
      redirUrl: "",
    });
    setScriptResult(null);
  };

  const handleCopyScript = () => {
    if (scriptResult) {
      navigator.clipboard.writeText(scriptResult.script);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-gray-900 text-white">
      {/* Panel izquierdo - Formulario */}
      <div className="w-full lg:w-1/2 bg-gray-800 p-4 rounded-lg">
        <div className="space-y-4">
          <div>
            <label htmlFor="wifiIdMode" className="block text-sm font-medium text-gray-300 mb-1">
              Select Wifi_id Mode
            </label>
            <select
              id="wifiIdMode"
              value={formData.wifiIdMode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            >
              <option value="SEAMLESS WIFI_ID">SEAMLESS WIFI_ID</option>
            </select>
          </div>

          <div>
            <label htmlFor="targetInterface" className="block text-sm font-medium text-gray-300 mb-1">
              Select target default interface
            </label>
            <select
              id="targetInterface"
              value={formData.targetInterface}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            >
              <option value="wlan1">wlan1</option>
            </select>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="text"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="makel" className="block text-sm font-medium text-gray-300 mb-1">
              makel
            </label>
            <input
              id="makel"
              type="text"
              value={formData.makel}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="gwId" className="block text-sm font-medium text-gray-300 mb-1">
              GW_ID
            </label>
            <input
              id="gwId"
              type="text"
              value={formData.gwId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="wlan" className="block text-sm font-medium text-gray-300 mb-1">
              WLAN
            </label>
            <input
              id="wlan"
              type="text"
              value={formData.wlan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="sessionId" className="block text-sm font-medium text-gray-300 mb-1">
              Session ID
            </label>
            <input
              id="sessionId"
              type="text"
              value={formData.sessionId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="redirUrl" className="block text-sm font-medium text-gray-300 mb-1">
              Redirect URL
            </label>
            <input
              id="redirUrl"
              type="text"
              value={formData.redirUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={handleGenerate}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Panel derecho - Resultado */}
      <div className="w-full lg:w-1/2 bg-gray-800 p-4 rounded-lg">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Copy-Paste Script to Terminal
          </label>
          <div className="h-60 overflow-y-auto bg-gray-700 border border-gray-600 rounded p-2">
            {scriptResult ? (
              <pre className="text-gray-400 text-sm whitespace-pre-wrap">
                {scriptResult.script}
              </pre>
            ) : (
              <p className="text-gray-500">The generated script will appear here</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleCopyScript}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition mt-4"
          >
            Copy Script
          </button>
        </div>
      </div>
    </div>
  );
};



export default FormularioWifidwmsSeamless;
