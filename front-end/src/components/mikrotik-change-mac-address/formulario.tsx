import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";

import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}
type ScriptResult = {
  html: string;
  text: string;
};

interface FormData {
  interfaceName: string;
  macOption: string;
  macAddress: string;
}

const  FormulariomikrotikChangeMacAddress = ({ session, subscription }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    interfaceName: "ether1",
    macOption: "Change MAC Address Only",
    macAddress: "52:E2:4F:28:8B:9F",
  });

  const [error, setError] = useState<string | null>(null);
  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const generateRandomMAC = () => {
    const randomMAC = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join(':').toUpperCase();
    setFormData((prevData) => ({
      ...prevData,
      macAddress: randomMAC,
    }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-change-mac-address`,
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
      setError("Error generating script: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyScript = () => {
    if (scriptResult) {
      navigator.clipboard.writeText(scriptResult.text);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-700 rounded-lg">
      <div className="flex space-x-4">
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-100 mb-1">
            Interface Name (ether)
          </label>
          <input
            id="interfaceName"
            type="text"
            value={formData.interfaceName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-800 rounded bg-slate-200"
          />
        </div>

        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-100 mb-1">
            MAC Options
          </label>
          <select
            id="macOption"
            value={formData.macOption}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded bg-white"
          >
            <option value="01">Change MAC Address Only</option>
            <option value="02">Auto Random MAC Address</option>
          </select>
        </div>

        <div className="w-1/3 flex items-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-100 mb-1">
              MAC Address
            </label>
            <input
              id="macAddress"
              type="text"
              value={formData.macAddress}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white"
            />
          </div>
          <button
            type="button"
            onClick={generateRandomMAC}
            className="ml-2 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition mt-6"
          >
            Random
          </button>
        </div>
      </div>
  <SocialTooltipButton />
      <div className="flex space-x-4 mt-4">
        <button
          type="button"
          onClick={handleGenerate}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Generate
        </button>
        <button
          type="button"
          onClick={handleCopyScript}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Copy Script
        </button>
      </div>

      <div className="mt-4">
        <div className="bg-white border border-gray-300 rounded p-4">
          {scriptResult ? (
            <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
          ) : (
            <p className="text-gray-500">
              {isLoading ? "Generating script..." : "The generated script will appear here"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};



export default FormulariomikrotikChangeMacAddress;
