import SocialTooltipButton from "../SocialTooltipButton";
import { useState, useRef } from "react";
import { keyIPAddress } from "../../utils/keyEvent";

interface ScriptResult {
  html: string;
  text: string;
}

interface FormData {
  interfaceIsp: string;
  ipGatewayIsp: string;
  idRosVersion: string;
}

const FormularioRemoteIpPublicStatic = () => {
  // Estados iniciales con valores por defecto
  const [formData, setFormData] = useState<FormData>({
    interfaceIsp: "ether1-ISP",
    ipGatewayIsp: "192.168.10.1",
    idRosVersion: "ros6"
  });

  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refInterfaceIsp = useRef<HTMLInputElement>(null);

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validación básica
      if (!formData.interfaceIsp) {
        setError("Interface ISP is required");
        return;
      }

      if (!formData.ipGatewayIsp) {
        setError("IP Gateway ISP is required");
        return;
      }

      if (!formData.idRosVersion) {
        setError("RouterOS Version is required");
        return;
      }

      // Validación de formato de IP
      const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipRegex.test(formData.ipGatewayIsp)) {
        setError("Invalid IP format for Gateway ISP");
        return;
      }

      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/remote-ip-public-static`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "*/*",
          },
          body: JSON.stringify({
            interfaceIsp: formData.interfaceIsp,
            ipGatewayIsp: formData.ipGatewayIsp,
            idRosVersion: formData.idRosVersion
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ScriptResult = await response.json();
      setScriptResult(result);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error generating script. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Limpieza del formulario
  const handleClear = () => {
    setFormData({
      interfaceIsp: "ether1-ISP",
      ipGatewayIsp: "192.168.10.1",
      idRosVersion: "ros7"
    });
    setScriptResult(null);
    setError(null);
    refInterfaceIsp.current?.focus();
  };

  // Copiar script al portapapeles
  const handleCopy = () => {
    if (scriptResult) {
      navigator.clipboard.writeText(scriptResult.text)
        .then(() => alert("Script copied to clipboard!"))
        .catch(err => console.error("Failed to copy: ", err));
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg ">

      {/* Formulario */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="interfaceIsp" className="block text-sm font-semibold text-orange-400 mb-2">
              Interface ISP
            </label>
            <input
              ref={refInterfaceIsp}
              id="interfaceIsp"
              type="text"
              placeholder="ether1-ISP"
              className={`w-full bg-gray-700 text-gray-300 rounded-lg p-2 border ${error && !formData.interfaceIsp ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              value={formData.interfaceIsp}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="ipGatewayIsp" className="block text-sm font-semibold text-orange-400 mb-2">
              IP Gateway ISP
            </label>
            <input
              id="ipGatewayIsp"
              type="text"
              placeholder="192.168.10.1"
              className={`w-full bg-gray-700 text-gray-300 rounded-lg p-2 border ${error && !formData.ipGatewayIsp ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              value={formData.ipGatewayIsp}
              onChange={handleInputChange}
              onKeyDown={keyIPAddress}
            />
          </div>

          <div>
            <label htmlFor="idRosVersion" className="block text-sm font-semibold text-orange-400 mb-2">
              ROS Version
            </label>
            <select
              id="idRosVersion"
              className={`w-full bg-gray-700 border ${error && !formData.idRosVersion ? "border-red-500" : "border-gray-600"
                } rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400`}
              value={formData.idRosVersion}
              onChange={handleInputChange}
            >
              <option value="ros6">RouterOS v6.xx</option>
              <option value="ros7">RouterOS v7.xx</option>
            </select>
          </div>
          
        </div>
          <SocialTooltipButton />
      </div>

      {/* Resultado */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-orange-400 mb-2">Copy-Paste to Terminal.</h3>
          <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
            {scriptResult ? (
              <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
            ) : (
              <p className="text-gray-500 text-sm">
                {isSubmitting ? "Generando script..." : "El script generado aparecerá aquí"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          type="button"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          onClick={handleClear}
        >
          Borrar Todo
        </button>
        <button
          type="button"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Generating..." : "Generate"}
        </button>
        <button
          type="button"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
          onClick={handleCopy}
          disabled={!scriptResult}
        >
          Copy Script
        </button>
      </div>
    </div>
  );
};

export default FormularioRemoteIpPublicStatic;
