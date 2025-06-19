import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
const FormularioMikrotikQrCodeGenerator = () => {
  const [routerOption, setRouterOption] = useState("MikroTik Hotspot");
  const [ssid, setSsid] = useState("MYCAFE-WIFI");
  const [dnsName, setDnsName] = useState("mycafe.net");
  const [username, setUsername] = useState("mycafe");
  const [password, setPassword] = useState("12345678");
  const [templateSize, setTemplateSize] = useState("A5 Paper Size");

  const handleGenerateQRCode = () => {
    // Lógica para generar el código QR
    console.log("Generating QR Code with:", { routerOption, ssid, dnsName, username, password, templateSize });
  };

  const handlePrintQRTemplate = () => {
    // Lógica para imprimir la plantilla QR
    console.log("Printing QR Template with size:", templateSize);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg">
      {/* Form Section */}
      <div className="flex flex-col gap-4 w-full lg:w-1/2">
        <div className="space-y-2">
          <label htmlFor="routerOption" className="block text-sm font-semibold text-gray-300">
            Wireless Router Options
          </label>
          <select
            id="routerOption"
            value={routerOption}
            onChange={(e) => setRouterOption(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
          >
            <option value="MikroTik Hotspot">MikroTik Hotspot</option>
            <option value="MikroTik Hotspot">Wireless Router Only </option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="ssid" className="block text-sm font-semibold text-gray-300">
            SSID / Network id
          </label>
          <input
            id="ssid"
            type="text"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="dnsName" className="block text-sm font-semibold text-gray-300">
            Hotspot DNS Name
          </label>
          <input
            id="dnsName"
            type="text"
            value={dnsName}
            onChange={(e) => setDnsName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-300">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-300">
            Password / Wi-Fi Key
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="templateSize" className="block text-sm font-semibold text-gray-300">
            Template Size
          </label>
          <select
            id="templateSize"
            value={templateSize}
            onChange={(e) => setTemplateSize(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
          >
            <option value="A5 Paper Size">A5 Paper Size</option>
            <option value="A4 Paper Size">A4 Paper Size</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            onClick={handleGenerateQRCode}
          >
            Generate QR Code
          </button>
          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            onClick={handlePrintQRTemplate}
          >
            Print QR Template
          </button>
          
        </div>
        <SocialTooltipButton />
      </div>

      {/* Result Section */}
      <div className="flex flex-col lg:w-1/2 min-h-0">
        <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            QR Result: https://buanet.com
          </label>
          <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm">
            <p className="text-gray-500 text-sm">
              QR Code will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioMikrotikQrCodeGenerator;
