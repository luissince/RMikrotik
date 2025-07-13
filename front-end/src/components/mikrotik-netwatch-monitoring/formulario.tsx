import { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}

interface Host {
  ip: string;
  description: string;
}

interface FormData {
  sendingOption: string;
  botTelegram: string;
  chatIdTelegram: string;
  hosts: Host[];
}

const FormularioMkrotikNetwatchMonitoring = ({ session, subscription }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    sendingOption: "Telegram",
    botTelegram: "5633162xxx:AAFU1dsXcARJIAH_jJmvF...",
    chatIdTelegram: "5537582xxx",
    hosts: [{ ip: "10.10.10.2", description: "Access Point Office" }]
  });

  // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);

  const handleAddHost = () => {
    setFormData({
      ...formData,
      hosts: [...formData.hosts, { ip: "", description: "" }]
    });
  };

  const handleRemoveHost = (index: number) => {
    const updatedHosts = [...formData.hosts];
    updatedHosts.splice(index, 1);
    setFormData({
      ...formData,
      hosts: updatedHosts
    });
  };

  const handleHostChange = (index: number, field: keyof Host, value: string) => {
    const updatedHosts = [...formData.hosts];
    updatedHosts[index][field] = value;
    setFormData({
      ...formData,
      hosts: updatedHosts
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleGenerateScript = async () => {
    if (!validateAuth()) return;
    const result = await makeApiCall("/mikrotik-netwatch-monitoring", formData);
    if (result) {
      setScriptResult(result);
    }
  };

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-lg text-white">
      <div className="flex justify-between mb-4">
        <div className="w-1/3 pr-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Sending Options</label>
          <select
            id="sendingOption"
            value={formData.sendingOption}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="Telegram">Telegram</option>
          </select>
        </div>
        <div className="w-1/3 px-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">BOT Telegram</label>
          <input
            id="botTelegram"
            type="text"
            value={formData.botTelegram}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="w-1/3 pl-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Chat ID Telegram</label>
          <input
            id="chatIdTelegram"
            type="text"
            value={formData.chatIdTelegram}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2 bg-gray-800 p-2 rounded-t-lg">
          <button
            onClick={handleAddHost}
            className="bg-orange-500 text-white px-4 py-2 rounded-l-md hover:bg-orange-600"
          >
            Add [+]
          </button>
          <span className="block w-1/3 text-center font-medium text-gray-300">Host / IP Address Monitoring</span>
          <span className="block w-2/3 text-center font-medium text-gray-300">Host / IP Address Description</span>
        </div>
        {formData.hosts.map((host, index) => (
          <div key={index} className="flex items-center mb-2">
            <button
              onClick={() => handleRemoveHost(index)}
              className="bg-gray-600 text-white px-4 py-2 rounded-l-md hover:bg-gray-500"
            >
              Remove
            </button>
            <input
              type="text"
              value={host.ip}
              onChange={(e) => handleHostChange(index, "ip", e.target.value)}
              className="w-1/3 p-2 bg-gray-800 border-t border-b border-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Host / IP Address"
            />
            <input
              type="text"
              value={host.description}
              onChange={(e) => handleHostChange(index, "description", e.target.value)}
              className="w-2/3 p-2 bg-gray-800 border border-gray-600 rounded-r-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Description"
            />
          </div>
        ))}
      </div>

      <SocialTooltipButton />

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleGenerateScript}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
          disabled={isLoading || !session}
        >
          {isLoading ? "Generating..." : "Generate Script"}
        </button>
        <button
          onClick={() => handleCopyScript()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
          disabled={!scriptResult?.html || !session}
        >
          Copy All Script
        </button>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg flex flex-col">
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Script Generator Result
        </label>
        <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 h-60">
          {scriptResult && (
            <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormularioMkrotikNetwatchMonitoring;
