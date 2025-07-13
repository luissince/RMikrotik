import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}

interface Chain {
  id: number;
  mangleChain: string;
  localInterface: string;
  localIPAddress: string;
  changeTTL: string;
  description: string;
}

const FormulariomikrotikBlockSharingHotspot = ({ session, subscription }: Props) => {
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);

  const [chains, setChains] = useState<Chain[]>([
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

  const removeChain = (id: number) => {
    if (chains.length > 1) {
      setChains(chains.filter((chain) => chain.id !== id));
    }
  };

  const handleSubmit = async () => {
    if (!validateAuth()) return;

    const payload = {
      forwards: chains,
    };

    const result = await makeApiCall("/mikrotik-block-sharing-hotspot", payload);
    if (result) {
      setScriptResult(result);
    }
  };

  const handleClear = () => {
    if (!validateAuth()) return;
    setChains([
      {
        id: 1,
        mangleChain: "postrouting",
        localInterface: "ether5",
        localIPAddress: "10.5.50.0/24",
        changeTTL: "1",
        description: "Hotspot Protect",
      },
    ]);
    setScriptResult(null);
  };

  const handleInputChange = (id: number, field: keyof Chain, value: string) => {
    const updatedChains = chains.map((chain) =>
      chain.id === id ? { ...chain, [field]: value } : chain
    );
    setChains(updatedChains);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="w-full">
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
                    onClick={() => removeChain(chain.id)}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
                <td className="py-2 px-4 border">
                  <select
                    value={chain.mangleChain}
                    onChange={(e) => handleInputChange(chain.id, "mangleChain", e.target.value)}
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
                    onChange={(e) => handleInputChange(chain.id, "localInterface", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={chain.localIPAddress}
                    onChange={(e) => handleInputChange(chain.id, "localIPAddress", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={chain.changeTTL}
                    onChange={(e) => handleInputChange(chain.id, "changeTTL", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={chain.description}
                    onChange={(e) => handleInputChange(chain.id, "description", e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-4 py-2 rounded mr-2"
          >
            Generate Script
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            onClick={handleClear}
            disabled={!session}
          >
            <i className="fa-solid fa-trash mr-2"></i>
            Borrar Todo
          </button>
        </div>
        <SocialTooltipButton />
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

export default FormulariomikrotikBlockSharingHotspot;
