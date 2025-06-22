import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
interface Host {
  ip: string;
  description: string;
}

const FormularioMkrotikNetwatchMonitoring = () => {
  const [sendingOption, setSendingOption] = useState("Telegram");
  const [botTelegram, setBotTelegram] = useState("5633162xxx:AAFU1dsXcARJIAH_jJmvF...");
  const [chatIdTelegram, setChatIdTelegram] = useState("5537582xxx");
  const [hosts, setHosts] = useState<Host[]>([{ ip: "10.10.10.2", description: "Access Point Office" }]);

  const handleAddHost = () => {
    setHosts([...hosts, { ip: "", description: "" }]);
  };

  const handleRemoveHost = (index: number) => {
    const updatedHosts = [...hosts];
    updatedHosts.splice(index, 1);
    setHosts(updatedHosts);
  };

  const handleHostChange = (index: number, field: keyof Host, value: string) => {
    const updatedHosts = [...hosts];
    updatedHosts[index][field] = value;
    setHosts(updatedHosts);
  };

  const handleGenerateScript = () => {
    console.log("Generating script...");
  };

  const handleCopyAllScript = () => {
    console.log("Copying script...");
  };

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-lg text-white">
      <div className="flex justify-between mb-4">
        <div className="w-1/3 pr-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Sending Options</label>
          <select
            value={sendingOption}
            onChange={(e) => setSendingOption(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="Telegram">Telegram</option>
          </select>
        </div>
        <div className="w-1/3 px-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">BOT Telegram</label>
          <input
            type="text"
            value={botTelegram}
            onChange={(e) => setBotTelegram(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="w-1/3 pl-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Chat ID Telegram</label>
          <input
            type="text"
            value={chatIdTelegram}
            onChange={(e) => setChatIdTelegram(e.target.value)}
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
        {hosts.map((host, index) => (
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
        >
          Generate Script
        </button>
        <button
          onClick={handleCopyAllScript}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
        >
          Copy All Script
        </button>
      </div>
    </div>
  );
};




export default FormularioMkrotikNetwatchMonitoring;
