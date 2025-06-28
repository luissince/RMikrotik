import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}

interface FormData {
  idRoutingOptions: string;
  idRosVersion: string;
  ispGateway: string;
  routingMark: string;
  maxLimit: string;
  priority:string;
}

interface ScriptResult {
  html1: string;
  html2: string;
  text1: string;
  text2: string;
}

const FormularioMikrotikQueue = ({ session, subscription }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    idRoutingOptions: "Youtube",
    idRosVersion: "ros6",
    ispGateway: "0.0.0.0",
    routingMark: "",
    maxLimit:"",
     priority:"8",

  });

  const [error, setError] = useState<string | null>(null);
  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleGenerate = async () => {
    try {
      // Simulate API call
      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-queue-qos`,
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

  const handleCopyScript = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="idRoutingOptions"
              className="block font-semibold text-orange-400 mb-2"
            >
              Queue List
            </label>
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
            <label
              htmlFor="idRosVersion"
              className="block font-semibold text-orange-400 mb-2"
            >
              Queue Options
            </label>
            <select
              id="idRosVersion"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.idRosVersion}
              onChange={handleChange}
            >
              <option value="queueSimple">Queue Simple</option>
               <option value="queueTree">Queue Tree</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label
              htmlFor="routingMark"
              className="block font-semibold text-orange-400 mb-2"
            >
              Queue Name
            </label>
            <input
              id="routingMark"
              type="text"
              placeholder="-> YOUTUBE"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.routingMark}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="priority"
              className="block font-semibold text-orange-400 mb-2"
            >
              Priority (1-8)
            </label>
            <input
              
              id="priority"
              type="text"
              placeholder="8"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
           value={formData.priority}
               onChange={handleChange}
           />
          </div>
          <div>
            <label
              htmlFor="maxLimit"
              className="block font-semibold text-orange-400 mb-2"
            >
              Max-Limit
            </label>
            <input
            
              id="maxLimit"
              type="text"
              placeholder="20M"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.maxLimit}
               onChange={handleChange}
           />
          </div>
        </div>
         <SocialTooltipButton />
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          type="button"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
          onClick={handleGenerate}
        >
          Generate Script
        </button>
      </div>

      {scriptResult && (
        <div className="mt-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-orange-400 mb-2">
                STEP 1 - Copy Paste to Terminal
              </h3>
              <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
                <div dangerouslySetInnerHTML={{ __html: scriptResult.html1 }} />
                <button
                  type="button"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 mt-2"
                  onClick={() => handleCopyScript(scriptResult.text1)}
                >
                  Copy STEP 1
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-orange-400 mb-2">
                STEP 2 - Copy Paste to Terminal
              </h3>
              <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
                <div dangerouslySetInnerHTML={{ __html: scriptResult.html2 }} />
                <button
                  type="button"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 mt-2"
                  onClick={() => handleCopyScript(scriptResult.text2)}
                >
                  Copy STEP 2
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

 
    </div>
  );
};

export default FormularioMikrotikQueue;



