import { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

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

  // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);

  useEffect(() => {
    generateLines(2);
  }, []);

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

  const onSubmit = async (data: FormValues) => {
    if (!validateAuth()) return;

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

    const result = await makeApiCall("/Balanceo_NTH", payload);
    if (result) {
      setScriptResult(result);
    }
  };

  const handleClearAll = () => {
    if (!validateAuth()) return;

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

 <button
  type="button"
  className="outline-2 outline-offset-2 outline-solid font-sans  bg-orange-600 text-white px-4 py-3 w-full rounded hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center justify-center"
  onClick={handleSubmit(onSubmit)}
  disabled={isLoading || !session}
>
  
  {isSubmitting ? "Generando..." : "Generar"}

</button>


        </form>

      </div>

      {/* Result Section */}
      <div className="bg-gray-700 p-4 rounded-lg flex flex-col">
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Script Generator Result
        </label>
        <div
          className="h-60 overflow-y-auto  flex-grow o bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm"
          dangerouslySetInnerHTML={{ __html: scriptResult?.html || "" }}
        ></div>

        <div className="flex mt-4 space-x-4">
          <button
            type="button"
            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
            onClick={handleClearAll}
            disabled={!session}
          >
            {/* Icono de Heroicons para borrar */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Borrar Todo
          </button>

          <button
            type="button"
            className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:bg-indigo-500 disabled:cursor-not-allowed"
            onClick={handleCopyScript}
            disabled={!scriptResult?.html || !session}
          >
            {/* Icono de Heroicons para copiar */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copiar Script
          </button>
        </div>
      </div>
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

    </div>

  );
};

export default Formulario;