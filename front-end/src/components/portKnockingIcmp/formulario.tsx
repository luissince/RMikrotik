import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";

type ScriptResult = {
  html: string;
  text: string;
};

const FormularioPortKnockingIcmp = () => {
  const [formData, setFormData] = useState({
    firstIcmpPacketSize: "100",
    secondIcmpPacketSize: "200",
    onLoginTimeDuration: "00:00:00",
    portServiceToProtected: "21,22,23",
  });

    const [error, setError] = useState<string | null>(null);
    const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        `${import.meta.env.PUBLIC_BASE_URL_API}/port-knocking-icmp`,
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
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-gray-900 text-white">
      {/* Panel izquierdo - Formulario */}
      <div className="w-full lg:w-1/2 bg-gray-800 p-4 rounded-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              First Icmp Packet Size
            </label>
            <label className="block text-xs text-gray-400 mb-1">
              range: 50-65535
            </label>
            <label className="block text-xs text-gray-400 mb-1">
              example: 100
            </label>
            <input
              id="firstIcmpPacketSize"
              type="text"
              value={formData.firstIcmpPacketSize}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Second Icmp Packet Size
            </label>
            <label className="block text-xs text-gray-400 mb-1">
              range: 50-65535
            </label>
            <label className="block text-xs text-gray-400 mb-1">
              example: 200
            </label>
            <input
              id="secondIcmpPacketSize"
              type="text"
              value={formData.secondIcmpPacketSize}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              On Login Time Duration
            </label>
            <label className="block text-xs text-gray-400 mb-1">
              example: 00:30:00 (30 minute)
            </label>
            <label className="block text-xs text-gray-400 mb-1">
              example: 00:00:00 (unlimited)
            </label>
            <input
              id="onLoginTimeDuration"
              type="text"
              value={formData.onLoginTimeDuration}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Port Service To Protected
            </label>
            <input
              id="portServiceToProtected"
              type="text"
              value={formData.portServiceToProtected}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Generate
          </button>
          
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
  <div className=" p-6 rounded shadow">
    <h2 className="text-xl font-bold mb-2">Default Port Services:</h2>
    <p>8728 (api)</p>
 <p>8729 (api-ssl)</p>
  <p>21 (ftp)</p>
   <p>22 (ssh)</p>
    <p>23 (telnet)</p>
  </div>
  <div className=" p-6 rounded shadow">
  <p> <br></br></p>
<p> <br></br></p>
    <p>8291 (winbox)</p>
<p>80 (www)</p>
<p>443 (www-ssl)</p>
<p>3128 (web proxy)</p>

  </div>
</div>
  <SocialTooltipButton />
        </div>
      </div>

      {/* Panel derecho - Resultado */}
      <div className="w-full lg:w-1/2 bg-gray-800 p-4 rounded-lg">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Script Generator Result
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
          <button
            type="button"
            onClick={() => scriptResult && navigator.clipboard.writeText(scriptResult.text)}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition mt-4"
          >
            Copy Script
          </button>

          <div className="mt-4">
            <p className="text-orange-400 text-sm font-medium">
              Unique Packet Size For Key Knocking:
            </p>
            <p className="text-green-400 text-sm font-medium mt-2">
              Example Manually Open Key Ping in CMD Windows:
            </p>
            <p className="text-green-400 text-xs mt-1">
              First Key Knock -&gt; ping -l (IP Address)
            </p>
            <p className="text-green-400 text-xs">
              Second Key Knock -&gt; ping -l (IP Address)
            </p>
            <p className="text-green-400 text-sm font-medium mt-2">
              Example Manually Open Key Ping in Terminal Linux or MacOS:
            </p>
            <p className="text-green-400 text-xs mt-1">
              First Key Knock -&gt; ping -s (IP Address)
            </p>
            <p className="text-green-400 text-xs">
              Second Key Knock -&gt; ping -s (IP Address)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioPortKnockingIcmp;
