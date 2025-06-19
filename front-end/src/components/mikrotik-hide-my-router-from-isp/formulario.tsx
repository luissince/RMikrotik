import { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Esquema para validación
const formSchema = z.object({
  interface: z.string().min(1, { message: "Interface es requerido" }),
  identity: z.string().min(1, { message: "Router Identity es requerido" }),
  macAddress: z
    .string()
    .min(1, { message: "MAC Address es requerido" })
    .regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, {
      message: "Formato de MAC Address inválido",
    }),
  protections: z.object({
    blockWinboxScan: z.boolean().optional(),
    blockNeighborDisc: z.boolean().optional(),
    blockMacServer: z.boolean().optional(),
    blockTraceroute: z.boolean().optional(),
    blockRoMON: z.boolean().optional(),
    blockOpenDNS: z.boolean().optional(),
    blockOpenPROXY: z.boolean().optional(),
    blockBTest: z.boolean().optional(),
    blockSNMP: z.boolean().optional(),
    blockTheDude: z.boolean().optional(),
    blockIPCloud: z.boolean().optional(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

type ScriptResult = {
  html: string;
  text: string;
};

const MikrotikForm = () => {
  const [scriptResult, setScriptResult] = useState<ScriptResult>({
    html: "",
    text: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interface: "ether1",
      identity: "My Desktop PC",
      macAddress: "",
      protections: {
        blockWinboxScan: false,
        blockNeighborDisc: false,
        blockMacServer: false,
        blockTraceroute: false,
        blockRoMON: false,
        blockOpenDNS: false,
        blockOpenPROXY: false,
        blockBTest: false,
        blockSNMP: false,
        blockTheDude: false,
        blockIPCloud: false,
      },
    },
  });

  const generateRandomMac = () => {
    const hexDigits = "0123456789ABCDEF";
    let macAddress = "";

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 2; j++) {
        macAddress += hexDigits.charAt(Math.floor(Math.random() * 16));
      }
      if (i < 5) macAddress += ":";
    }

    setValue("macAddress", macAddress);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Preparar el payload para enviar al backend
      const payload = {
        interfaceToIsp: data.interface,
        changeRouterIdentity: data.identity,
        changeRouterMacAddress: data.macAddress,
        blockWinboxScan: data.protections.blockWinboxScan,
        blockNeighborDiscovery: data.protections.blockNeighborDisc,
        blockMacAddress: data.protections.blockMacServer,
        blockTraceroute: data.protections.blockTraceroute,
        blockRoMon: data.protections.blockRoMON,
        blockOpenDns: data.protections.blockOpenDNS,
        blockOpenProxy: data.protections.blockOpenPROXY,
        blockBTest: data.protections.blockBTest,
        blockSnmp: data.protections.blockSNMP,
        blockTheDude: data.protections.blockTheDude,
        blockIpCloud: data.protections.blockIPCloud,
      };

      // Enviar datos al backend
      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-hide-my-router-from-isp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyScript = () => {
    if (scriptResult) {
      navigator.clipboard
        .writeText(scriptResult.text) // Solo copiamos el texto plano
        .then(() => {
          alert("¡Script copiado al portapapeles como texto!");
        })
        .catch((err) => {
          console.error("Error al copiar: ", err);
          alert("Hubo un error al copiar el contenido.");
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg "
    >
      {/* Panel izquierdo - Controles */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        <div className="text-gray-950 shadow-2xl rounded-lg p-6 w-full ring-2 ring-blue-500">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="table-auto w-full border-spacing-2 border-slate-600">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="border-slate-700 p-2 border">
                    Interface (ether) to ISP
                  </th>
                  <th className="border-slate-700 p-2 border">
                    Change Router Identity
                  </th>
                  <th className="border-slate-700 p-2 border">
                    Change Router Mac Address
                  </th>
                  <th className="border-slate-700 p-2 border"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-800">
                  <td className="border-slate-700 p-2 border">
                    <Controller
                      name="interface"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          placeholder="ether1"
                          className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.interface ? "ring-2 ring-red-500" : ""}`}
                          {...field}
                        />
                      )}
                    />
                    {errors.interface && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.interface.message}
                      </p>
                    )}
                  </td>
                  <td className="border-slate-700 p-2 border">
                    <Controller
                      name="identity"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          placeholder="My Desktop PC"
                          className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.identity ? "ring-2 ring-red-500" : ""}`}
                          {...field}
                        />
                      )}
                    />
                    {errors.identity && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.identity.message}
                      </p>
                    )}
                  </td>
                  <td className="border-slate-700 p-2 border">
                    <Controller
                      name="macAddress"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          placeholder="52:E2:4F:28:8B:9F"
                          className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.macAddress ? "ring-2 ring-red-500" : ""}`}
                          {...field}
                        />
                      )}
                    />
                    {errors.macAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.macAddress.message}
                      </p>
                    )}
                  </td>
                  <td className="p-2 border border-slate-700">
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                      onClick={generateRandomMac}
                    >
                      Random
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-gray-300 mb-2 mt-4">
            More Hidden Protections from Internet (WAN) Scanning
          </h3>
          <div className="flex flex-col gap-4">
            <div className="w-full p-4 bg-gray-700 rounded mt-4 text-gray-200">
              <div className="space-y-2">
                <div>
                  <Controller
                    name="protections.blockWinboxScan"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <input
                        type="checkbox"
                        id="blockWinboxScan"
                        className="mr-2"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
                  />
                  <label htmlFor="blockWinboxScan">Block Winbox Scan</label>
                </div>
                <div>
                  <Controller
                    name="protections.blockNeighborDisc"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <input
                        type="checkbox"
                        id="blockNeighborDisc"
                        className="mr-2"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
                  />
                  <label htmlFor="blockNeighborDisc">Block Neighbor Disc</label>
                </div>
                <div>
                  <Controller
                    name="protections.blockMacServer"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <input
                        type="checkbox"
                        id="blockMacServer"
                        className="mr-2"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
                  />
                  <label htmlFor="blockMacServer">Block Mac Server</label>
                </div>
                <div>
                  <Controller
                    name="protections.blockTraceroute"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <input
                        type="checkbox"
                        id="blockTraceroute"
                        className="mr-2"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
                  />
                  <label htmlFor="blockTraceroute">Block Traceroute</label>
                </div>
                <div>
                  <Controller
                    name="protections.blockRoMON"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <input
                        type="checkbox"
                        id="blockRoMON"
                        className="mr-2"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
                  />
                  <label htmlFor="blockRoMON">Block RoMON</label>
                </div>
                <div>
                  <Controller
                    name="protections.blockOpenDNS"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <input
                        type="checkbox"
                        id="blockOpenDNS"
                        className="mr-2"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
                  />
                  <label htmlFor="blockOpenDNS">Block Open DNS</label>
                </div>
                <div>
                  <Controller
                    name="protections.blockOpenPROXY"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <input
                        type="checkbox"
                        id="blockOpenPROXY"
                        className="mr-2"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
                  />
                  <label htmlFor="blockOpenPROXY">Block Open PROXY</label>
                </div>
                <div>
                  <Controller
                    name="protections.blockBTest"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <input
                        type="checkbox"
                        id="blockBTest"
                        className="mr-2"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
                  />
                  <label htmlFor="blockBTest">Block BTest</label>
                </div>
                <div>
                  <Controller
                    name="protections.blockSNMP"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <input
                        type="checkbox"
                        id="blockSNMP"
                        className="mr-2"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
                  />
                  <label htmlFor="blockSNMP">Block SNMP</label>
                </div>
                <div>
                  <Controller
                    name="protections.blockTheDude"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <input
                        type="checkbox"
                        id="blockTheDude"
                        className="mr-2"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
                  />
                  <label htmlFor="blockTheDude">Block The Dude</label>
                </div>
                <div>
                  <Controller
                    name="protections.blockIPCloud"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <input
                        type="checkbox"
                        id="blockIPCloud"
                        className="mr-2"
                        checked={value}
                        onChange={onChange}
                        ref={ref}
                      />
                    )}
                  />
                  <label htmlFor="blockIPCloud">Block IP Cloud</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SocialTooltipButton />
      </div>

      {/* Panel derecho - Resultado */}
      <div className="flex flex-col lg:w-1/2 min-h-0">
        <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Script Generator Result
          </label>
          <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
            {scriptResult && (
              <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
            )}
          </div>
        </div>
        <div className="flex mt-4 space-x-4">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generando..." : "Generar Script"}
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={handleCopyScript}
            disabled={!scriptResult.html}
          >
            Copiar Script
          </button>
        </div>
      </div>
    </form>
  );
};

export default MikrotikForm;
