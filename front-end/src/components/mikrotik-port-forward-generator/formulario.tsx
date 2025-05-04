import { useEffect, useState } from "react";
import { z } from "zod";
import { keyIPAddress, keyNumberInteger } from "../../utils/keyEvent";

type LineInterfacesType = {
  id: number;
  idProtocol: string;
  remoteIp: string;
  remotePort: string;
  targetIp: string;
  targetPort: string;
  description: string;
};

interface ScriptResult {
  html: string;
  text: string;
}

const lineInterfaceSchema = z.object({
  idProtocol: z.string().nonempty({ message: "Protocol is required" }),
  remoteIp: z.string().nonempty({ message: "Remote IP is required" }).refine((val) => /^(\d{1,3}\.){3}\d{1,3}$/.test(val), {
    message: "Invalid IP format",
  }),
  remotePort: z.string().nonempty({ message: "Remote Port is required" }).refine((val) => !isNaN(Number(val)), {
    message: "Remote Port must be a number",
  }),
  targetIp: z.string().nonempty({ message: "Target IP is required" }).refine((val) => /^(\d{1,3}\.){3}\d{1,3}$/.test(val), {
    message: "Invalid IP format",
  }),
  targetPort: z.string().nonempty({ message: "Target Port is required" }).refine((val) => !isNaN(Number(val)), {
    message: "Target Port must be a number",
  }),
  description: z.string().optional(),
});

const FormularioMikrotikPortForwardGenerator = () => {
  const [lineInterfaces, setLineInterfaces] = useState<LineInterfacesType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScriptResult | null>(null);

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

  const handleGenerate = async () => {
    try {
      // Validate the data using zod
      lineInterfaces.forEach(line => {
        lineInterfaceSchema.parse(line);
      });

      setError(null);

      const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-port-forward-generator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/hal+json',
        },
        body: JSON.stringify({ forwards: lineInterfaces }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const resultData: ScriptResult = await response.json();
      setResult(resultData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError('Error generating script: ' + (error as Error).message);
      }
    }
  };

  const handleClear = () => {
    setLineInterfaces([]);
    generateLines(1);
    setResult(null);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.text);
    }
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
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap justify-center gap-4 mb-6 mt-7">
        <button
          className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-gray-600 hover:-translate-y-1 hover:scale-110 hover:bg-slate-700 duration-300"
          onClick={handleClear}
        >
          Borrar Todo
        </button>
        <button
          className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300"
          onClick={handleGenerate}
        >
          Generar Script
        </button>
        <button
          className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-teal-600 duration-300"
          onClick={handleCopy}
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
        <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
          {result && (
            <div dangerouslySetInnerHTML={{ __html: result.html }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormularioMikrotikPortForwardGenerator;
