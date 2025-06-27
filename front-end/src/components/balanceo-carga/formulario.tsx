import { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
interface Props {
  session: Session | null;
  subscription: Subscription | null;
}
const lineInterfaceSchema = z.object({
  id: z.number(),
  wan: z.string(),
  wanInput: z.string().min(1, { message: "WAN interface es requerido" }),
  gateway: z.string(),
  gatewayInput: z
    .string()
    .min(1, { message: "Gateway es requerido" })
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, { message: "Invalid IP format" }),
});

const formSchema = z.object({
  linea: z.number().min(2).max(9),
  router: z.string().min(1, { message: "Router version es requerido" }),
  local: z.string().min(1, { message: "Local target es requerido" }),
  interfaceTarget: z.string().optional(),
  lineInterfaces: z.array(lineInterfaceSchema),
});

type FormValues = z.infer<typeof formSchema>;

type LineInterfacesType = z.infer<typeof lineInterfaceSchema>;

type ScriptResult = {
  html: string;
  text: string;
};

const Formulario = ({ session, subscription }: Props) => {
  
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linea: 2,
      router: "",
      local: "",
      interfaceTarget: "",
      lineInterfaces: [],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "lineInterfaces",
  });

  const localValue = watch("local");
  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);

  const generateLines = (numbers: number) => {
    const list: LineInterfacesType[] = Array.from({ length: numbers }).map(
      (_, i) => {
        const index = i + 1;
        return {
          id: index,
          wan: "wan isp" + index,
          wanInput: "",
          gateway: "Gateway ISP-" + index,
          gatewayInput: "",
        };
      }
    );
    replace(list);
    setValue("linea", numbers);
  };

  useEffect(() => {
    generateLines(2);
  }, []);

  const onSubmit = async (data: FormValues) => {
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

    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/pcc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const responseData: ScriptResult = await response.json();
      setScriptResult({
        html: responseData.html,
        text: responseData.text,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClearAll = () => {
    reset({
      linea: 2,
      router: "",
      local: "",
      interfaceTarget: "",
      lineInterfaces: fields.map((field) => ({
        ...field,
        wanInput: "",
        gatewayInput: "",
      })),
    });
    setScriptResult(null);
  };

  const handleCopyScript = () => {
    if (scriptResult) {
      const result = scriptResult.text;
      navigator.clipboard
        .writeText(result)
        .then(() => alert("Script copied to clipboard!"))
        .catch((err) => console.error("Failed to copy: ", err));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form Section */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              htmlFor="wan-type"
              className="block text-sm font-semibold text-gray-300"
            >
              Your Line WAN ISP
            </label>
            <Controller
              name="linea"
              control={control}
              render={({ field }) => (
                <select
                  id="wan-type"
                  className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                  {...field}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.onChange(value);
                    generateLines(value);
                  }}
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
              )}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="routeros-version"
              className="block text-sm font-semibold text-gray-300"
            >
              RouterOS Version
            </label>
            <Controller
              name="router"
              control={control}
              render={({ field }) => (
                <select
                  id="routeros-version"
                  className={`w-full bg-gray-800 border ${errors.router ? "border-red-500" : "border-gray-600"} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400`}
                  {...field}
                >
                  <option value="">- Seleccionar -</option>
                  <option value="6.x">RouterOS v6.xx</option>
                  <option value="v7">RouterOS v7.xx</option>
                </select>
              )}
            />
            {errors.router && (
              <p className="mt-1 text-sm text-red-500">
                {errors.router.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="local-target"
                className="block text-sm font-semibold text-gray-300"
              >
                Local Target
              </label>
              <Controller
                name="local"
                control={control}
                render={({ field }) => (
                  <select
                    id="local-target"
                    className={`w-full bg-gray-800 border ${errors.local ? "border-red-500" : "border-gray-600"} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400`}
                    {...field}
                  >
                    <option value="">- Seleccionar -</option>
                    <option value="local-ip">IP Address List</option>
                    <option value="local-ip1">in_interface</option>
                    <option value="local-ip2">in_interface_List</option>
                  </select>
                )}
              />
              {errors.local && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.local.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="interface-target"
                className="block text-sm font-semibold text-gray-300"
              >
                Interface Target
              </label>
              <Controller
                name="interfaceTarget"
                control={control}
                render={({ field }) => (
                  <input
                    id="interface-target"
                    type="text"
                    disabled={localValue === "local-ip"}
                    placeholder={"Indicar Puerto LAN"}
                    className={`${localValue === "local-ip" ? "disabled:bg-slate-900" : ""} text-sky-400 font-semibold w-full bg-gray-800 border ${errors.interfaceTarget ? "border-red-500" : "border-gray-600"} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    {...field}
                  />
                )}
              />
              {errors.interfaceTarget && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.interfaceTarget.message}
                </p>
              )}
            </div>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <label
                  htmlFor={`wan-${index}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  {field.wan}
                </label>
                <Controller
                  name={`lineInterfaces.${index}.wanInput`}
                  control={control}
                  render={({ field: inputField }) => (
                    <input
                      id={`wan-${index}`}
                      type="text"
                      placeholder={`Ex: ether${index + 1}`}
                      className={`text-sky-400 font-semibold w-full bg-gray-800 border ${errors.lineInterfaces?.[index]?.wanInput ? "border-red-500" : "border-gray-600"} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      {...inputField}
                    />
                  )}
                />
                {errors.lineInterfaces?.[index]?.wanInput && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lineInterfaces[index]?.wanInput?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor={`gateway-${index}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  {field.gateway}
                </label>
                <Controller
                  name={`lineInterfaces.${index}.gatewayInput`}
                  control={control}
                  render={({ field: inputField }) => (
                    <input
                      id={`gateway-${index}`}
                      type="text"
                      placeholder={`Ex: 192.168.${index + 1}.1`}
                      className={`w-full bg-gray-800 text-amber-600 border font-semibold ${errors.lineInterfaces?.[index]?.gatewayInput ? "border-red-500" : "border-gray-600"} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      {...inputField}
                    />
                  )}
                />
                {errors.lineInterfaces?.[index]?.gatewayInput && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lineInterfaces[index]?.gatewayInput?.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div className="mt-4">
            <p className="text-sm text-gray-400">
              Cambie el nombre de su interfaz WAN con la condición de su
              enrutador...
            </p>
          </div>
        </form>
      </div>

      {/* Result Section */}
      <div className="bg-gray-700 p-4 rounded-lg flex flex-col">
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Script Generator Result
        </label>
        <div
          className="flex-grow bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 overflow-x-scroll"
          dangerouslySetInnerHTML={{ __html: scriptResult?.html || "" }}
        ></div>

        <div className="flex mt-4 space-x-4">
          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generando..." : "Generar"}
          </button>

          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            onClick={handleClearAll}
          >
            Borrar Todo
          </button>

          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:bg-green-300 disabled:cursor-not-allowed"
            onClick={handleCopyScript}
            disabled={!scriptResult?.html}
          >
            Copiar Script
          </button>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
