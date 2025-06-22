import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
type ScriptResult = {
  html: string;
  text: string;
};

interface FormData {
  pppServiceOptions: string;
  quantityUserPPP: string;
  pppProfileName: string;
  rateLimit: string;
  localServerIPAddress: string;
  clientIPAddressStartFrom: string;
  typeUsername: string;
  typePassword: string;

}

const FormularioMikrotikUsernamePasswordPppGenerator = () => {

  const [formData, setFormData] = useState<FormData>({

    pppServiceOptions: "ANY (default)",
    quantityUserPPP: "20",
    pppProfileName: "default",
    rateLimit: "2M/3M",
    localServerIPAddress: "172.16.16.1",
    clientIPAddressStartFrom: "10",
    typeUsername: "user@",
    typePassword: "Password = Username",
  });
  const [error, setError] = useState<string | null>(null);
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
        `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-username-password-ppp-generator`,
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

  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-gray-900 text-white">
      {/* Panel izquierdo - Formulario */}
      <div className="w-full lg:w-1/2 bg-gray-800 p-4 rounded-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              PPP Service Options
            </label>
            <select
            id="pppServiceOptions"
              value={formData.pppServiceOptions}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            >
              <option value="ANY (default)">ANYaaa (default)</option>
              <option value="PPPOE">PPPOE</option>
              <option value="L2TP">L2TP</option>
              <option value="OVPN">OVPN</option>
              <option value="PPTP">PPTP</option>
              <option value="SSTP">SSTP</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Quantity User PPP
            </label>
            <input
              id="quantityUserPPP"
              type="text"
              value={formData.quantityUserPPP}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              PPP Profile Name
            </label>
            <input
            id="pppProfileName"
              type="text"
              value={formData.pppProfileName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Rate Limit [up/down]
            </label>
            <input
            id="rateLimit"
              type="text"
              value={formData.rateLimit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Local Server IP Address
            </label>
            <input
            id="localServerIPAddress"
              type="text"
              value={formData.localServerIPAddress}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Client IP Address Start from
            </label>
            <input
            id="clientIPAddressStartFrom"
              type="text"
              value={formData.clientIPAddressStartFrom}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Type Username
            </label>
            <input
            id="typeUsername"
              type="text"
              value={formData.typeUsername}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Type Password
            </label>
            <select
              id="typePassword"
              value={formData.typePassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            >
              <option value="01">Password = Username</option>
              <option value="02">Username = Password</option>
              <option value="03">Type Username = Password</option>
              <option value="04">Type Username = IP Client</option>
              <option value="05">Password = IP Client</option>
              <option value="06">Random 3 Character</option>
              <option value="07">Random 4 Character</option>
              <option value="08">Random 5 Character</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Generate
          </button>
        </div>
          <SocialTooltipButton />
      </div>

      {/* Panel derecho - Resultado */}
      {/* Result Section */}
      <div className="flex flex-col lg:w-1/2 min-h-0">
        <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Resultado del Generador de Script
          </label>
          <div className="h-60 overflow-y-auto flex-grow bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm">
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
        </div>

        <div className="flex mt-4 space-x-4">

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
            onClick={() => scriptResult && navigator.clipboard.writeText(scriptResult.text)}
          >
            Copiar Script
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioMikrotikUsernamePasswordPppGenerator;
