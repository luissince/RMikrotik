import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";

type ScriptResult = {
  html: string;
  text: string;
};

interface FormData {
  bondingName_a: string;
  bondingIPAddress: string;
  bondingSlaves: string[];
  arpMonitoring: boolean;
}

const FormularioMikrotikBondingInterface = () => {
  const [formData, setFormData] = useState<FormData>({
    bondingName_a: "",
    bondingIPAddress: "192.168.50.2/24",
    bondingSlaves: ["Ether1", "Ether2"],
    arpMonitoring: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [formDataA, setFormDataA] = useState<FormData>({
    bondingName_a: "",
    bondingIPAddress: "192.168.50.1/24",
    bondingSlaves: ["Ether1", "Ether2", "Ether3", "Ether4"],
    arpMonitoring: true,
  });
  const handleGenerate = async () => {
    setIsLoading(true);
    try {

      // Simulate API call
      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-bonding-interface`,
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
  const [formDataB, setFormDataB] = useState<FormData>({
    bondingName_a: "",
    bondingIPAddress: "192.168.50.2/24",
    bondingSlaves: ["Ether1", "Ether2"],
    arpMonitoring: false,
  });

 const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleCheckboxChange = (ether: string, form: "A" | "B") => {
    const setFormData = form === "A" ? setFormDataA : setFormDataB;

    setFormData((prevData) => {
      const bondingSlaves = prevData.bondingSlaves.includes(ether)
        ? prevData.bondingSlaves.filter((e) => e !== ether)
        : [...prevData.bondingSlaves, ether];

      return { ...prevData, bondingSlaves };
    });
  };

  const handleCopyScript = (formData: FormData) => {
    const script = `
      /interface bonding
      add name=${formData.bondingName_a} slaves=${formData.bondingSlaves.join(",")} ${formData.arpMonitoring ? "arp-ip=192.168.50.1" : ""}
      /ip address
      add address=${formData.bondingIPAddress} interface=${formData.bondingName_a}
    `;
    navigator.clipboard.writeText(script);
    
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-800">
      {/* MikroTik A */}
      <div className="w-full md:w-1/2 bg-gray-700 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-center text-orange-500 mb-4">
          MIKROTIK - A
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Bonding Name
            </label>
            <input
              id="bondingName_a"
              type="text"
              value={formDataA.bondingName_a}
                onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Bonding IP Address
            </label>
            <input
              id="bondingIPAddress"
              type="text"
              value={formDataA.bondingIPAddress}
               onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Bonding Slaves
            </label>
            <div className="flex space-x-4 text-gray-100">
              {["Ether1", "Ether2", "Ether3", "Ether4", "Ether5"].map((ether) => (
                <div key={ether} className="flex items-center">
                  <input
                    type="checkbox"
                    id={ether}
                    checked={formDataA.bondingSlaves.includes(ether)}
                    onChange={() => handleCheckboxChange(ether, "A")}
                    className="mr-2"
                  />
                  <label htmlFor={ether}>{ether}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="arpMonitoring"
              type="checkbox"
              checked={formDataA.arpMonitoring}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="arpMonitoring" className="text-sm font-medium text-gray-100">
              ARP Monitoring / Failover Bonding Interface
            </label>
          </div>

          <div className="mt-4">
           
               <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">
             Copy-Paste to Terminal MikroTik - A
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
          </div>

          <button
            type="button"
            onClick={() => handleCopyScript(formDataA)}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Copy Script
          </button>
        </div>
      </div>

      {/* MikroTik B */}
      <div className="w-full md:w-1/2 bg-gray-600 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-center text-orange-500 mb-4">
          MIKROTIK - B
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Bonding Name
            </label>
            <input
              id="bondingName_a"
              type="text"
              value={formDataB.bondingName_a}
               onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Bonding IP Address
            </label>
            <input
              id="bondingIPAddress"
              type="text"
              value={formDataB.bondingIPAddress}
               onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Bonding Slaves
            </label>
            <div className="flex space-x-4 text-gray-100">
              {["Ether1", "Ether2", "Ether3", "Ether4", "Ether5"].map((ether) => (
                <div key={ether} className="flex items-center">
                  <input
                    type="checkbox"
                    id={ether}
                    checked={formDataB.bondingSlaves.includes(ether)}
                    onChange={() => handleCheckboxChange(ether, "B")}
                    className="mr-2"
                  />
                  <label htmlFor={ether}>{ether}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="arpMonitoring"
              type="checkbox"
              checked={formDataB.arpMonitoring}
                onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="arpMonitoring" className="text-sm font-medium text-gray-100">
              ARP Monitoring / Failover Bonding Interface
            </label>
          </div>

          <div className="mt-4">
           
              <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">
        Copy-Paste to Terminal MikroTik - B
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
           
    </div>
    
  );
};

export default FormularioMikrotikBondingInterface;
