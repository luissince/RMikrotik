import { useEffect, useState } from "react";
import { keyIPAddress } from "../../utils/keyEvent";
import type { Session } from "@auth/core/types";
<<<<<<< HEAD
import AlertKit, { alertKit } from "alert-kit";
import { buttonPresets } from "../../styles/buttonStyles";
=======
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";
>>>>>>> aderyq

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}

<<<<<<< HEAD
AlertKit.setGlobalDefaults({
  headerClassName: 'bg-white p-4 border-b border-gray-200 rounded-t-2xl cursor-move',
  headerTitle: 'RMikrotik',
  showCloseButton: false,
  primaryButtonClassName: buttonPresets.modalAccept,
  cancelButtonClassName: buttonPresets.modalCancel,
  acceptButtonClassName: buttonPresets.modalAccept,
  defaultTexts: {
    success: 'Éxito',
    error: 'Error',
    warning: 'Advertencia',
    info: 'Información',
    question: 'Confirmación',
    accept: 'Aceptar',
    cancel: 'Cancelar',
    ok: 'Aceptar'
  }
});

const lineInterfaceSchema = z.object({
  id: z.number(),
  wan: z.string(),
  wanInput: z.string().min(1, { message: "WAN interface es requerido" }),
  gateway: z.string(),
  gatewayInput: z
    .string()
    .min(1, { message: "Gateway es requerido" })
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, { message: "Formato de IP inválido" }),
});
=======
interface InterfacesType {
  id: number;
  wan: string;
  wanIsp: string;
  gateway: string;
  gatewayIsp: string;
}
>>>>>>> aderyq

interface FormDataType {
  idLineWan: number;
  idRouterVersion: string;
  idLocalTarget: string;
  interfaceTarget: string;
  interfaces: InterfacesType[],
}

const defaultData: FormDataType = {
  idLineWan: 2,
  idRouterVersion: "6.x",
  idLocalTarget: "local-ip",
  interfaceTarget: "ether1",
  interfaces: [],
}

const FormularioPcc = ({ session, subscription }: Props) => {
  // Datos del formulario
  const [formData, setFormData] = useState<FormDataType>(defaultData);

<<<<<<< HEAD
  const { fields, replace } = useFieldArray({
    control,
    name: "lineInterfaces",
  });

  const localValue = watch("local");
  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
=======
  // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);
>>>>>>> aderyq

  // Función para generar líneas iniciales
  useEffect(() => {
<<<<<<< HEAD
    if (!session) {
      alertKit.warning({
        title: 'Sesión no iniciada',
        message: 'Inicie sesión para continuar.',
        primaryButton: {
          text: 'Aceptar',
        }
      });
    }
  }, [session]);
=======
    generateLines(2);
  }, []);
>>>>>>> aderyq

  const generateLines = (numbers: number) => {
    const list: InterfacesType[] = Array.from({ length: numbers }).map(
      (_, i) => {
        const index = i + 1;
        return {
          id: index,
          wan: `WAN ISP ${index}`,
          wanIsp: `ether${index}`,
          gateway: `Gateway ISP-${index}`,
          gatewayIsp: `192.168.${index}.1`,
        };
      }
    );
<<<<<<< HEAD
    replace(list);
    setValue("linea", numbers);
  };

  useEffect(() => {
    generateLines(2);
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (!session) {
      alertKit.warning({
        title: 'Sesión no iniciada',
        message: 'Inicie sesión para continuar.',
        primaryButton: {
          text: 'Aceptar',
        }
      });
      return;
    }

    if (session.user?.subscription?.status !== "active") {
      alertKit.warning({
        title: 'Suscripción no activa',
        message: 'Compruebe suscripción para continuar.',
        primaryButton: {
          text: 'Aceptar',
        }
      });
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        idLineWan: String(data.linea),
        idRouterVersion: data.router,
        idLocalTarget: data.local,
        interfaceTarget: data.interfaceTarget || "",
        interfaces: data.lineInterfaces.map((line) => ({
          id: line.id,
          wanIsp: line.wanInput,
          gatewayIsp: line.gatewayInput,
        })),
      };

      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/pcc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData: ScriptResult = await response.json();
      setScriptResult(responseData);
    } catch (error) {
      console.error("Error al enviar datos:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    if (!session) {
      alertKit.warning({
        title: 'Sesión no iniciada',
        message: 'Inicie sesión para continuar.',
        primaryButton: {
          text: 'Aceptar',
        }
      });
      return;
    }

    if (session.user?.subscription?.status !== "active") {
      alertKit.warning({
        title: 'Suscripción no activa',
        message: 'Compruebe suscripción para continuar.',
        primaryButton: {
          text: 'Aceptar',
        }
      });
      return;
    }

    reset({
      linea: 2,
      router: "6.x",
      local: "local-ip",
      interfaceTarget: "ether1",
      lineInterfaces: fields.map((field) => ({
        ...field,
        wanInput: `ether${field.id}`,
        gatewayInput: `192.168.${field.id}.1`,
      })),
=======
    setFormData({
      ...formData,
      interfaces: list,
>>>>>>> aderyq
    });
  };

  const handleSubmit = async () => {
    if (!validateAuth()) return;

    const result = await makeApiCall("/pcc", formData);
    if (result) {
      setScriptResult(result);
    }
  };

  const handleClear = () => {
    if (!validateAuth()) return;

    setFormData(defaultData);
    setScriptResult(null);
  };

<<<<<<< HEAD
  const handleCopyScript = () => {
    if (!session) {
      alertKit.warning({
        title: 'Sesión no iniciada',
        message: 'Inicie sesión para continuar.',
        primaryButton: {
          text: 'Aceptar',
        }
      });
      return;
    }

    if (scriptResult) {
      navigator.clipboard
        .writeText(scriptResult.text)
        .then(() => alert("Script copiado al portapapeles!"))
        .catch((err) => console.error("Error al copiar: ", err));
    }
  };

  const handleCloseModal = () => {
    window.location.href = '/account';
  };

=======
>>>>>>> aderyq
  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg">
      {/* Form Section */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        <form className="space-y-4">
          <div className="space-y-0">
            <label
              htmlFor="wan-type"
              className="block font-semibold text-gray-200 bg-slate-700 rounded-t-lg pl-2 p-1"
            >
              Número de Líneas WAN ISP
            </label>

            <select
              id="wan-type"
              className="w-full bg-gray-800 border border-slate-700 rounded-b-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
              value={formData.idLineWan}
              onChange={(e) => {
                const value = Number(e.target.value);
                setFormData({
                  ...formData,
                  idLineWan: value,
                });
                generateLines(value);
              }}
            >
              <option value="2">2 Líneas WAN</option>
              <option value="3">3 Líneas WAN</option>
              <option value="4">4 Líneas WAN</option>
              <option value="5">5 Líneas WAN</option>
              <option value="6">6 Líneas WAN</option>
              <option value="7">7 Líneas WAN</option>
              <option value="8">8 Líneas WAN</option>
              <option value="9">9 Líneas WAN</option>
            </select>

          </div>

          <div className="space-y-0">
            <label
              htmlFor="routeros-version"
              className="block font-semibold text-gray-200 bg-slate-700 rounded-t-lg pl-2 p-1"
            >
              Versión de RouterOS
            </label>
            <select
              id="routeros-version"
              className={`w-full bg-gray-800 border border-slate-700 rounded-b-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400`}
              value={formData.idRouterVersion}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  idRouterVersion: e.target.value,
                });
              }}
            >
              <option value="">- Seleccionar -</option>
              <option value="6.x">RouterOS v6.xx</option>
              <option value="v7">RouterOS v7.xx</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-0">
              <label
                htmlFor="local-target"
                className="block font-semibold text-gray-200 bg-blue-600 rounded-t-lg pl-2"
              >
                {/* === Botón con tooltip de ayuda ================== */}
                <div className="relative inline-block group">
                  {/* 1. Botón */}
                  <button
                    type="button"
                    className="flex items-center gap-1 text-white px-3 py-1.5"
                  >
                    Local Target
                    <span className="sr-only">Mostrar ayuda</span>
                  </button>

                  {/* 2. Tooltip */}
                  <div
                    className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg bg-gray-800 text-gray-200 text-sm p-3 shadow-lg opacity-0 scale-95 pointer-events-none transition duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
                  >
                    Ingrese el nombre del puerto LAN que conecta su Mikrotik al switch o dispositivo final.
                    <strong className="text-red-500">Debe coincidir exactamente con el nombre configurado en su Mikrotik </strong>.
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-gray-800"></div>
                  </div>
                </div>
              </label>
              <select
                id="local-target"
                className={`w-full bg-gray-800 border border-blue-600 rounded-b-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400`}
                value={formData.idLocalTarget}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    idLocalTarget: e.target.value,
                  });
                }}
              >
                <option value="">- Seleccionar -</option>
                <option value="local-ip">IP Address List</option>
                <option value="local-ip1">in_interface</option>
                <option value="local-ip2">in_interface_List</option>
              </select>
            </div>

            <div className="space-y-0">
              <label
                htmlFor="interface-target"
                className="block font-semibold text-gray-200 bg-blue-600 rounded-t-lg pl-2"
              >
                {/* === Botón con tooltip de ayuda ================== */}
                <div className="relative inline-block group">
                  {/* 1. Botón */}
                  <button
                    type="button"
                    className="flex items-center gap-1 text-white px-3 py-1.5"
                  >
                    Interface Target
                    <span className="sr-only">Mostrar ayuda</span>
                  </button>

                  {/* 2. Tooltip */}
                  <div
                    className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg bg-gray-800 text-gray-200 text-sm p-3 shadow-lg opacity-0 scale-95 pointer-events-none transition duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
                  >
                    Ingrese el nombre del puerto LAN que conecta su Mikrotik al switch o dispositivo final.
                    <strong className="text-red-500">Debe coincidir exactamente con el nombre configurado en su Mikrotik </strong>.
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-gray-800"></div>
                  </div>
                </div>
              </label>
              <input
                id="interface-target"
                type="text"
                disabled={formData.idLocalTarget === "local-ip"}
                placeholder="Ej: ether1, bridge-local"
                className={`${formData.idLocalTarget === "local-ip" ? "bg-gray-700 opacity-60 cursor-not-allowed" : "bg-gray-800"} w-full border border-blue-600 rounded-b-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400`}
                value={formData.interfaceTarget}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    interfaceTarget: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          {formData.interfaces.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor={`wan-${index}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  {field.wan}
                </label>

                <input
                  id={`wan-${index}`}
                  type="text"
                  placeholder={`Ej: ether${index + 1}`}
                  className={`text-sky-400 font-semibold w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  value={field.wanIsp}
                  onChange={(e)=>{
                    const list = [...formData.interfaces];

                    list[index].wanIsp = e.target.value;

                    setFormData({
                      ...formData,
                      interfaces: list,
                    });
                  }}
                />

              </div>
              <div className="space-y-2">
                <label
                  htmlFor={`gateway-${index}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  {field.gateway}
                </label>

                <input
                  id={`gateway-${index}`}
                  type="text"
                  placeholder={`Ej: 192.168.${index + 1}.1`}
                  className={`w-full bg-gray-800 text-amber-600 border font-semibold border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  value={field.gatewayIsp}
                  onChange={(e) => {
                    const list = [...formData.interfaces];

                    list[index].gatewayIsp = e.target.value;

                    setFormData({
                      ...formData,
                      interfaces: list,
                    });
                  }}
                  onKeyDown={(e) => keyIPAddress(e)}
                />

              </div>
            </div>
          ))}

          <div className="mt-4">
            <p className="text-sm text-gray-400">
              Cambie el nombre de su interfaz WAN con la condición de su enrutador...
            </p>
          </div>
        </form>
      </div>

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
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={isLoading || !session}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            {isLoading ? "Generando..." : " Generar"}
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

          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:bg-indigo-500 disabled:cursor-not-allowed"
            onClick={handleCopyScript}
            disabled={!scriptResult?.html || !session}
          >
            <i className="fa-solid fa-arrow-up-from-bracket mr-2"></i>
            Copiar Script
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioPcc;
