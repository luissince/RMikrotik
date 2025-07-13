import { useState, useEffect } from "react";
import { keyIPAddress } from "../../utils/keyEvent";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";
import { alertKit } from "alert-kit";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}
type LineInterfacesType = {
  id: number;
  wan: string;
  wanInput: string;
  gateway: string;
  gatewayInput: string;
};

interface ScriptResult {
  html: string;
  text: string;
}

const FormularioEcmp = ({ session, subscription }: Props) => {
  // Estados para los campos del formulario
  const [idYourLineWanIsp, setIdYourLineWanIsp] = useState<string>("2");
  const [idRouterOsVersion, setIdRouterOsVersion] = useState<string>("ros6");
  const [lineInterfaces, setLineInterfaces] = useState<LineInterfacesType[]>([]);

  // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);

  // Generar líneas iniciales al montar el componente
  useEffect(() => {
    generateLines(Number(idYourLineWanIsp));
  }, []);

  // Función para generar líneas de interfaz
  const generateLines = (numbers: number) => {
    const list: LineInterfacesType[] = Array.from({ length: numbers }).map((_, i) => {
      const index = i + 1;
      return {
        id: index,
        wan: `WAN ISP ${index}`,
        wanInput: `ether${index}`,
        gateway: `Gateway ISP-${index}`,
        gatewayInput: `192.168.${index}.1`
      };
    });
    setLineInterfaces(list);
  };

  // Función para manejar cambios en el número de líneas WAN
  const handleLineWanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setIdYourLineWanIsp(value);
    generateLines(Number(value));
  };

  // Función para manejar cambios en la versión de RouterOS
  const handleRouterOsVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIdRouterOsVersion(e.target.value);
  };

  // Función para manejar cambios en los campos de interfaz
  const handleInterfaceChange = (id: number, field: string, value: string) => {
    setLineInterfaces(prevLines =>
      prevLines.map(line =>
        line.id === id ? { ...line, [field]: value } : line
      )
    );
  };

  // Función para generar el script
  const handleSubmit = async () => {
    if (!validateAuth()) return;

    // Validar que todos los campos requeridos estén completos
    if (!idRouterOsVersion) {
      alertKit.warning({
        title: 'ECMP',
        message: "RouterOS version is required"
      });
      return;
    }

    if (lineInterfaces.some(line => !line.wanInput || !line.gatewayInput)) {
      alertKit.warning({
        title: 'ECMP',
        message: "All WAN interfaces and gateways must be filled"
      });
      return;
    }

    const payload = {
      idYourLineWanIsp,
      idRouterOsVersion,
      interfaces: lineInterfaces.map(line => ({
        id: line.id,
        wanIsp: line.wanInput,
        gatewayIsp: line.gatewayInput
      }))
    };

    const result = await makeApiCall("/ecmp", payload);
    if (result) {
      setScriptResult(result);
    }

    // try {
    //   // Validar que todos los campos requeridos estén completos
    //   if (!idRouterOsVersion) {
    //     setError("RouterOS version is required");
    //     return;
    //   }

    //   if (lineInterfaces.some(line => !line.wanInput || !line.gatewayInput)) {
    //     setError("All WAN interfaces and gateways must be filled");
    //     return;
    //   }

    //   const payload = {
    //     idYourLineWanIsp,
    //     idRouterOsVersion,
    //     interfaces: lineInterfaces.map(line => ({
    //       id: line.id,
    //       wanIsp: line.wanInput,
    //       gatewayIsp: line.gatewayInput
    //     }))
    //   };

    //   const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/ecmp`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'accept': 'application/hal+json',
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   const resultData: ScriptResult = await response.json();
    //   setScriptResult(resultData);
    //   setError(null);
    // } catch (error) {
    //   setError('Error generating script: ' + (error as Error).message);
    // }
  };

  // Función para limpiar el formulario
  const handleClear = () => {
    if (!validateAuth()) return;

    setIdYourLineWanIsp("2");
    setIdRouterOsVersion("");
    setLineInterfaces([]);
    setScriptResult(null);
    generateLines(2);
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-900 p-6 rounded-lg shadow-lg">
      {/* Form Section */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="wan-type"
                className="block text-sm font-semibold text-gray-300"
              >
                Your Line WAN ISP
              </label>
              <select
                id="wan-type"
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                value={idYourLineWanIsp}
                onChange={handleLineWanChange}
              >
                <option value="2">2 Lineas WAN</option>
                <option value="3">3 Lineas WAN</option>
                <option value="4">4 Lineas WAN</option>
                <option value="5">5 Lineas WAN</option>
                <option value="6">6 Lineas WAN</option>
                <option value="7">7 Lineas WAN</option>
                <option value="8">8 Lineas WAN</option>
                <option value="9">9 Lineas WAN</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="routeros-version"
                className="block text-sm font-semibold text-gray-300"
              >
                RouterOS Version
              </label>
              <select
                id="routeros-version"
                className={`w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400`}
                value={idRouterOsVersion}
                onChange={handleRouterOsVersionChange}
              >
                <option value="ros6">RouterOS v6.xx</option>
                <option value="ros7">RouterOS v7.xx</option>
              </select>
            </div>
          </div>

          {lineInterfaces.map((line, index) => (
            <div key={line.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor={`wan-${index}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  {line.wan}
                </label>
                <input
                  id={`wan-${index}`}
                  type="text"
                  placeholder={`Ex: ether${index + 1}`}
                  className={`text-sky-400 font-semibold w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  value={line.wanInput}
                  onChange={(e) => handleInterfaceChange(line.id, 'wanInput', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor={`gateway-${index}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  {line.gateway}
                </label>
                <input
                  id={`gateway-${index}`}
                  type="text"
                  placeholder={`Ex: 192.168.${index + 1}.1`}
                  className={`w-full bg-gray-800 text-amber-600 border font-semibold border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  value={line.gatewayInput}
                  onChange={(e) => handleInterfaceChange(line.id, 'gatewayInput', e.target.value)}
                  onKeyDown={(e) => keyIPAddress(e)}
                />
              </div>
            </div>
          ))}


          {/* Tienes dudas */}

          <div className="mt-4">
            <div className="relative flex justify-end group">
              <button
                className="shadow-xl/30 text-white text-sm font-medium py-1.5 px-4 rounded-md transition duration-200"
              >
                ¿Tienes dudas?
              </button>

              {/* Tooltip flotante con redes sociales */}
              <div
                className="absolute bottom-full right-0 mb-2 w-100 bg-gray-900 bg-opacity-90 text-white
               text-sm rounded-lg p-4 shadow-lg opacity-0 scale-0 transition-all duration-200
               group-hover:opacity-100 group-hover:scale-100 z-10 pointer-events-auto"
              >
                <p className="mb-3">Aprende cómo usar la herramienta con nuestro video explicativo</p>

                {/* Botones de redes */}
                <div className="flex justify-around">
                  <a
                    href="https://x.com/RMikrotik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sky-400 hover:bg-blue-500 text-white px-3 py-1 rounded-full text-xs"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCq3nYbC1ceUwoZqYiESFb7g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://www.tiktok.com/@rmikrotik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-full text-xs"
                  >
                    TikTok
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61577406418771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/rmikrotik/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded-full text-xs"
                  >
                    Instagram
                  </a>
                </div>

                {/* Triángulo */}
                <div className="absolute -bottom-1.5 right-3 w-3 h-3 rotate-45 bg-gray-900 bg-opacity-90"></div>
              </div>
            </div>
          </div>

          {/* Tienes dudas Fin*/}

        </form>

      </div>

      {/* Result Section */}
      <div className="flex flex-col min-h-0">
        <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Script Generator Result
          </label>
          <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm">
            {scriptResult && (
              <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
            )}
          </div>
        </div>

        <div className="flex mt-4 space-x-4">
          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            onClick={handleSubmit}
            disabled={isLoading || !session}
          >
            Generar
          </button>

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
            onClick={()=>handleCopyScript()}
            disabled={!scriptResult?.html || !session}
          >
            Copiar Script
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioEcmp;
