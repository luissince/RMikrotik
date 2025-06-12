import React, { useState } from "react";

type ScriptResult = {
  html: string;
  text: string;
};

interface FormData {
  dhcpInterface: string;
  validMacInterface: string;
  alertTimeout: string;
  sendingOption: string;
  botTelegram: string;
  chatIdTelegram: string;
}

const FormularioMikrotikDhcpRogue = () => {
  const [formData, setFormData] = useState<FormData>({
    dhcpInterface: "ether1 or Bridge",
    validMacInterface: "XX:XX:XX:XX:XX:XX",
    alertTimeout: "00:01:00",
    sendingOption: "Telegram",
    botTelegram: "5633162xxx.AAFU1dsXcARJIAH_jJrr",
    chatIdTelegram: "5537582xxx",
  });

  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      // Simulate API call
      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-dhcp-rogue`,
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

  const handleCopyScript = () => {
    if (scriptResult) {
      navigator.clipboard.writeText(scriptResult.text);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 bg-gray-900 text-white">
      <div className="w-full bg-gray-800 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="dhcpInterface" className="block text-sm font-medium text-gray-300 mb-1">
              DHCP Interface / Bridge
            </label>
            <input
              id="dhcpInterface"
              type="text"
              value={formData.dhcpInterface}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="validMacInterface" className="block text-sm font-medium text-gray-300 mb-1">
              Valid MAC Interface
            </label>
            <input
              id="validMacInterface"
              type="text"
              value={formData.validMacInterface}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="alertTimeout" className="block text-sm font-medium text-gray-300 mb-1">
              Alert Timeout
            </label>
            <input
              id="alertTimeout"
              type="text"
              value={formData.alertTimeout}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="sendingOption" className="block text-sm font-medium text-gray-300 mb-1">
              Sending Options
            </label>
            <select
              id="sendingOption"
              value={formData.sendingOption}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            >
              <option value="01">Telegram</option>
               <option value="02">E-Mail</option>
                <option value="03">SMS</option>
                 <option value="04">Log Message Only</option>
            </select>
          </div>

          <div>
            <label htmlFor="botTelegram" className="block text-sm font-medium text-gray-300 mb-1">
              BOT Telegram
            </label>
            <input
              id="botTelegram"
              type="text"
              value={formData.botTelegram}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="chatIdTelegram" className="block text-sm font-medium text-gray-300 mb-1">
              Chat ID Telegram
            </label>
            <input
              id="chatIdTelegram"
              type="text"
              value={formData.chatIdTelegram}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={handleGenerate}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Generate
          </button>
          <button
            type="button"
            onClick={handleCopyScript}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Copy Script
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Copy-Paste Script to Terminal
          </label>
          <textarea
            className="w-full h-32 p-2 border border-gray-600 rounded bg-gray-700 text-gray-400"
            value={scriptResult ? scriptResult.text : "The generated script will appear here..."}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default FormularioMikrotikDhcpRogue;
