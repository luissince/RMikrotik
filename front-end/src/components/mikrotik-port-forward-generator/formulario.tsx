import SocialTooltipButton from "../SocialTooltipButton";
import { useEffect, useState } from "react";
import { keyIPAddress, keyNumberInteger } from "../../utils/keyEvent";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}

type LineInterfacesType = {
  id: number;
  idProtocol: string;
  remoteIp: string;
  remotePort: string;
  targetIp: string;
  targetPort: string;
  description: string;
};


const FormularioMikrotikPortForwardGenerator = ({ session, subscription }: Props) => {
  const [lineInterfaces, setLineInterfaces] = useState<LineInterfacesType[]>([]);

  // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);


  useEffect(() => {
    generateLines(1);
  }, []);

  const generateLines = (numbers: number) => {
    const list: LineInterfacesType[] = Array.from({ length: numbers }).map((_, i) => {
      const index = i + 1;
      return {
        id: index,
        idProtocol: "tcp",
        remoteIp: "",
        remotePort: "",
        targetIp: "",
        targetPort: "",
        description: "",
      };
    });
    setLineInterfaces(list);
  };

  const addLine = () => {
    const newLine: LineInterfacesType = {
      id: lineInterfaces.length + 1,
      idProtocol: "tcp",
      remoteIp: "",
      remotePort: "",
      targetIp: "",
      targetPort: "",
      description: "",
    };
    setLineInterfaces([...lineInterfaces, newLine]);
  };

  const removeLine = (id: number) => {
    setLineInterfaces(lineInterfaces.filter(line => line.id !== id));
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setLineInterfaces(prevLines =>
      prevLines.map(line =>
        line.id === id ? { ...line, [field]: value } : line
      )
    );
  };

  const handleSubmit = async () => {
    if (!validateAuth()) return;

    const result = await makeApiCall("/mikrotik-port-forward-generator", { forwards: lineInterfaces });
    if (result) {
      setScriptResult(result);
    }
  };

  const handleClear = () => {
    if (!validateAuth()) return;

    setLineInterfaces([]);
    generateLines(1);
    setScriptResult(null);
  };


  return (
    <div className="text-gray-950 shadow-2xl rounded-lg p-6 w-full ring-2 ring-blue-500">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="table-auto w-full border-spacing-2 border-slate-600">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              <th className="border-slate-700 p-2 border">Protocol</th>
              <th className="border-slate-700 p-2 border">Remote IP</th>
              <th className="border-slate-700 p-2 border">Remote Port</th>
              <th className="border-slate-700 p-2 border">Target IP</th>
              <th className="border-slate-700 p-2 border">Target Port</th>
              <th className="border-slate-700 p-2 border">Description</th>
              <th className="border-slate-700 p-2 border">Remove</th>
            </tr>
          </thead>
          <tbody>
            {lineInterfaces.map((line) => (
              <tr key={line.id} className="text-gray-800">
                <td className="p-2 border border-slate-700">
                  <select
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={line.idProtocol}
                    onChange={(e) => handleInputChange(line.id, 'idProtocol', e.target.value)}
                  >
                    <option value="tcp">TCP</option>
                    <option value="udp">UDP</option>
                  </select>
                </td>
                <td className="border-slate-700 p-2 border">
                  <input
                    type="text"
                    placeholder="0.0.0.0"
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={line.remoteIp}
                    onChange={(e) => handleInputChange(line.id, 'remoteIp', e.target.value)}
                    onKeyDown={(e) => keyIPAddress(e)}
                  />
                </td>
                <td className="border-slate-700 p-2 border">
                  <input
                    type="text"
                    placeholder="5151"
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={line.remotePort}
                    onChange={(e) => handleInputChange(line.id, 'remotePort', e.target.value)}
                    onKeyDown={(e) => keyNumberInteger(e)}
                  />
                </td>
                <td className="border-slate-700 p-2 border">
                  <input
                    type="text"
                    placeholder="192.168.50.1"
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={line.targetIp}
                    onChange={(e) => handleInputChange(line.id, 'targetIp', e.target.value)}
                    onKeyDown={(e) => keyIPAddress(e)}
                  />
                </td>
                <td className="border-slate-700 p-2 border">
                  <input
                    type="text"
                    placeholder="8291"
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={line.targetPort}
                    onChange={(e) => handleInputChange(line.id, 'targetPort', e.target.value)}
                    onKeyDown={(e) => keyNumberInteger(e)}
                  />
                </td>
                <td className="border-slate-700 p-2 border">
                  <input
                    type="text"
                    placeholder="Ej.: winbox"
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={line.description}
                    onChange={(e) => handleInputChange(line.id, 'description', e.target.value)}
                  />
                </td>
                <td className="border-slate-700 p-2 border">
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    onClick={() => removeLine(line.id)}
                  >
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <SocialTooltipButton />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6 mt-7">
        <button
          className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-gray-600 hover:-translate-y-1 hover:scale-110 hover:bg-slate-700 duration-300"
          onClick={handleClear}
          disabled={isLoading || !session}
        >
          Borrar Todo
        </button>
        <button
          className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300"
          onClick={handleSubmit}
          disabled={!session}
        >
          Generar Script
        </button>
        <button
          className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-teal-600 duration-300"
          onClick={handleCopyScript}
          disabled={!scriptResult?.html || !session}
        >
          Copiar Todo
        </button>
        <button
          className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300"
          onClick={addLine}
        >
          Agregar Fila
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

export default FormularioMikrotikPortForwardGenerator;
