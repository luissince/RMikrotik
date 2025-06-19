import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
const FormulariomikrotikBlockSharingHotspot = () => {
  const [chains, setChains] = useState([
    {
      id: 1,
      mangleChain: "postrouting",
      localInterface: "ether5",
      localIPAddress: "10.5.50.0/24",
      changeTTL: "1",
      description: "Hotspot Protect",
    },
  ]);

  const addChain = () => {
    const newChain = {
      id: chains.length + 1,
      mangleChain: "",
      localInterface: "",
      localIPAddress: "",
      changeTTL: "",
      description: "",
    };
    setChains([...chains, newChain]);
  };

 // const removeChain = (id) => {
   // setChains(chains.filter((chain) => chain.id !== id));
 // };

  const generateScript = () => {
    // Aquí simplemente registrarás la acción, ya que la generación del script se manejará en otro lugar.
    console.log("Generate Script button clicked. Chains data:", chains);
    // Enviar datos a tu servicio para manejar la generación del script.
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Panel izquierdo - Tabla */}
      <div className="w-full ">
        <table className="min-w-full bg-gray-800 border border-gray-900 rounded-t-lg">
          <thead>
            <tr className="bg-gray-800 text-gray-100">
              <th className="py-2 px-4 border">
                <button
                  onClick={addChain}
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                >
                  Add+
                </button>
              </th>
              <th className="py-2 px-4 border">Mangle Chain</th>
              <th className="py-2 px-4 border">Local Interface</th>
              <th className="py-2 px-4 border">Local IP Address</th>
              <th className="py-2 px-4 border">Change TTL</th>
              <th className="py-2 px-4 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {chains.map((chain) => (
              <tr key={chain.id} className="text-gray-700">
                <td className="py-2 px-4 border">
                  <button
                 //   onClick={() => removeChain(chain.id)}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
                <td className="py-2 px-4 border">
                  <select
                    value={chain.mangleChain}
                    onChange={(e) => {
                      const updatedChains = chains.map((c) =>
                        c.id === chain.id ? { ...c, mangleChain: e.target.value } : c
                      );
                      setChains(updatedChains);
                    }}
                    className="w-full p-1 border rounded"
                  >
                    <option value="postrouting">postrouting</option>
                    <option value="prerouting">prerouting</option>
                  </select>
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={chain.localInterface}
                    onChange={(e) => {
                      const updatedChains = chains.map((c) =>
                        c.id === chain.id ? { ...c, localInterface: e.target.value } : c
                      );
                      setChains(updatedChains);
                    }}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={chain.localIPAddress}
                    onChange={(e) => {
                      const updatedChains = chains.map((c) =>
                        c.id === chain.id ? { ...c, localIPAddress: e.target.value } : c
                      );
                      setChains(updatedChains);
                    }}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={chain.changeTTL}
                    onChange={(e) => {
                      const updatedChains = chains.map((c) =>
                        c.id === chain.id ? { ...c, changeTTL: e.target.value } : c
                      );
                      setChains(updatedChains);
                    }}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={chain.description}
                    onChange={(e) => {
                      const updatedChains = chains.map((c) =>
                        c.id === chain.id ? { ...c, description: e.target.value } : c
                      );
                      setChains(updatedChains);
                    }}
                    className="w-full p-1 border rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={generateScript}
            className="bg-orange-500 text-white px-4 py-2 rounded mr-2"
          >
            Generate Script
          </button>
        </div>
          <SocialTooltipButton />

      </div>

      {/* Panel derecho - Resultado */}
      <div className="flex flex-col  min-h-0">
        <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Resultado del Generador de Script
          </label>
          <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm">
            <p className="text-gray-500">
              El script se generará en otro lugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



export default FormulariomikrotikBlockSharingHotspot;
