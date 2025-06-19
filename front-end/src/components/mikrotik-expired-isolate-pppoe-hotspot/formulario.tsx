import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
type ScriptResult = {
  html: string;
  text: string;
};

interface FormData {
  routerOSVersion: string;
  wanIPAddress: string;
  proxyPort: string;
  expiredMessage: string;
  titleColor: string;
  contentColor: string;
  backgroundImage: string;
}

const FormularioMikrotikExpirediSolatePppoeHotspot = () => {
  const [formData, setFormData] = useState<FormData>({
    routerOSVersion: "RouterOS v6.xx",
    wanIPAddress: "192.168.1.1",
    proxyPort: "8082",
    expiredMessage: "DEAR CUSTOMERS, WE INFORM YOU THAT YOUR INTERNET SERVICE IS CURRENTLY TERMINATED. PLEASE MAKE BILL PAYMENTS THROUGH THE ACCOUNT WE PROVIDE. IN ORDER TO REMAIN INTERNET SERVICE ACTIVE, YOU ARE REQUESTED TO MAKE PAYMENT BEFORE THE DATE OF EVERY MONTH",
    titleColor: "white",
    contentColor: "black",
    backgroundImage: "linear-gradient(to bottom right, red, orange)",
  });

  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
        `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-expired-isolate-pppoe-hotspot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
      console.error("Error generating script:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      routerOSVersion: "RouterOS v6.xx",
      wanIPAddress: "",
      proxyPort: "",
      expiredMessage: "",
      titleColor: "",
      contentColor: "",
      backgroundImage: "",
    });
    setScriptResult(null);
  };

  const handleCopyScript = () => {
    if (scriptResult) {
      navigator.clipboard.writeText(scriptResult.text);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-gray-900 text-white">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 bg-gray-800 p-4 rounded-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              RouterOS Version
            </label>
            <select
              id="routerOSVersion"
              value={formData.routerOSVersion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            >
              <option value="RouterOS v6.xx">RouterOS v6.xx</option>
              <option value="RouterOS v7.xx">RouterOS v7.xx</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              WAN IP Address (IP Gateway)
            </label>
            <input
              id="wanIPAddress"
              type="text"
              value={formData.wanIPAddress}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Proxy Port (Redirect)
            </label>
            <input
              id="proxyPort"
              type="text"
              value={formData.proxyPort}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Expired Message
            </label>
            <textarea
              id="expiredMessage"
              value={formData.expiredMessage}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title Color
            </label>
            <input
              id="titleColor"
              type="text"
              value={formData.titleColor}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Content Color
            </label>
            <input
              id="contentColor"
              type="text"
              value={formData.contentColor}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Background Image
            </label>
            <input
              id="backgroundImage"
              type="text"
              value={formData.backgroundImage}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div className="flex space-x-4">
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
              className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
            >
              Clear All
            </button>
          </div>
            <SocialTooltipButton />

        </div>
      </div>

      {/* Right Column - Script Result */}
      <div className="w-full lg:w-1/2 bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Script Generator Result
          </label>
          <div className="h-60 overflow-y-auto  flex-grow o bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm">
            {scriptResult ? (
              <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
            ) : (
              <p className="text-gray-500">
                {isLoading
                  ? "Generando script..."
                  : "El script generado aparecerá aquí"}
              </p>
            )}
          </div>
          <button
            type="button"
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            onClick={handleCopyScript}
          >
            Copy Script
          </button>
        </div>
      </div>
    </div>
  );
};



export default FormularioMikrotikExpirediSolatePppoeHotspot;
