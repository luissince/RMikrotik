import React, { useState } from "react";
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

// Esquema de validación con Zod
const lineInterfaceSchema = z.object({
  wanInput: z.string().min(1, "Campo obligatorio"),
  gatewayInput: z
    .string()
    .min(1, "Campo obligatorio")
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Debe ser una dirección IP válida"),
  distanciaInput: z
    .string()
    .min(1, "Campo obligatorio")
    .refine((val) => !isNaN(Number(val)), "Debe ser un número")
    .refine((val) => Number(val) > 0, "Debe ser mayor a cero"),
  dnsInput: z
    .string()
    .min(1, "Campo obligatorio")
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Debe ser una dirección IP válida"),
});

const formSchema = z.object({
  metodoConmutacion: z.string(),
  numeroLineas: z.string(),
  lineInterfaces: z.array(lineInterfaceSchema),
});

type FormValues = z.infer<typeof formSchema>;

const dnsPlaceholder = [
  "8.8.8.8",
  "8.8.4.4",
  "8.8.8.1",
  "8.8.8.2",
  "8.8.8.3",
  "8.8.4.4",
  "8.8.8.6",
];

type ScriptResult = {
  html: string;
  text: string;
};

const FormularioMikrotikFailoverScriptGenerator = ({ session, subscription }: Props) => {
    // Usar hooks personalizados
    const { validateAuth } = useAuthValidation(session, subscription);
    const { makeApiCall, isLoading } = useApiCall(session);
    const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);
  // Estado para controlar el número de líneas


  // Configuración de React Hook Form con validación Zod
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metodoConmutacion: "Failover - Check Gateway",
      numeroLineas: "2",
      lineInterfaces: Array.from({ length: 2 }, (_, i) => ({
        wanInput: `ISP - ${i + 1}`,
        gatewayInput: "",
        distanciaInput: (i + 1).toString(),
        dnsInput: "",
      })),
    },
  });

  // Hook para manejar arreglos de campos
  const { fields, replace } = useFieldArray({
    control,
    name: "lineInterfaces",
  });

  // Actualiza el número de líneas cuando cambia la selección
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
     if (!validateAuth()) return;
    const newNumLines = Number(event.target.value) || 2;

    setValue("numeroLineas", event.target.value);

    let currentValues = fields.map((field, i) => ({
      wanInput: field.wanInput || `ISP - ${i + 1}`,
      gatewayInput: field.gatewayInput || "",
      distanciaInput: field.distanciaInput || (i + 1).toString(),
      dnsInput: field.dnsInput || "",
    }));

    // Si el nuevo número de líneas es mayor, agregamos inputs
    if (newNumLines > currentValues.length) {
      const additional = Array.from({ length: newNumLines - currentValues.length }, (_, i) => ({
        wanInput: `ISP - ${currentValues.length + i + 1}`,
        gatewayInput: "",
        distanciaInput: (currentValues.length + i + 1).toString(),
        dnsInput: "",
      }));
      currentValues = [...currentValues, ...additional];
    }

    // Si el nuevo número de líneas es menor, recortamos
    if (newNumLines < currentValues.length) {
      currentValues = currentValues.slice(0, newNumLines);
    }

    replace(currentValues);
  };



  const onSubmit = async (data: FormValues) => {
      if (!validateAuth()) return;
   
      // Transformar los datos
      const payload = {
        idSelectYourFailoverMethod: data.metodoConmutacion,
        idSelectNumberYourIspLine: data.numeroLineas,
        lines: data.lineInterfaces.map((line, index) => ({
          id: index,
          identityIsp: line.wanInput,
          gatewayIsp: line.gatewayInput,
          distance: line.distanciaInput,
          ipPublicCheck: line.dnsInput,
        })),
      };
   const result = await makeApiCall("/mikrotik-failover-script-generator", payload);
    if (result) {
      setScriptResult(result);
    }
        
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg "
    >
      {/* Panel izquierdo - Controles */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        <div>
          <label className="block font-semibold text-gray-300 mb-2">
            Seleccione el método de conmutación
          </label>
          <Controller
            name="metodoConmutacion"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>Failover - Check Gateway</option>
                <option>Failover - Recursive Gateway</option>
              </select>
            )}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-300 mb-2">
            Seleccione el número de su línea ISP
          </label>
          <Controller
            name="numeroLineas"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => {
                  field.onChange(e);
                  onChangeSelect(e);
                }}
              >
                <option value="2">2 Lineas ISP</option>
                <option value="3">3 Lineas ISP</option>
                <option value="4">4 Lineas ISP</option>
                <option value="5">5 Lineas ISP</option>
                <option value="6">6 Lineas ISP</option>
                <option value="7">7 Lineas ISP</option>
              </select>
            )}
          />
        </div>

        {fields.map((field, index) => {
          const position = index + 1;
          return (
            <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div>
                <label
                  htmlFor={`wanInput-${index}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  Identity ISP-{position}
                </label>
                <Controller
                  name={`lineInterfaces.${index}.wanInput`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id={`wanInput-${index}`}
                      type="text"
                      placeholder={`Ej: ISP - ${position}`}
                      className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-300"
                    />
                  )}
                />
                {errors.lineInterfaces?.[index]?.wanInput && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lineInterfaces[index]?.wanInput?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor={`gatewayInput-${index}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  Gateway ISP-{position}
                </label>
                <Controller
                  name={`lineInterfaces.${index}.gatewayInput`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id={`gatewayInput-${index}`}
                      type="text"
                      placeholder={`Ej: 192.168.${position}.1`}
                      className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-300"
                    />
                  )}
                />
                {errors.lineInterfaces?.[index]?.gatewayInput && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lineInterfaces[index]?.gatewayInput?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor={`distanciaInput-${index}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  Distancia
                </label>
                <Controller
                  name={`lineInterfaces.${index}.distanciaInput`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id={`distanciaInput-${index}`}
                      type="text"
                      placeholder={position.toString()}
                      className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-300"
                    />
                  )}
                />
                {errors.lineInterfaces?.[index]?.distanciaInput && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lineInterfaces[index]?.distanciaInput?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor={`dnsInput-${index}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  IP Public Check
                </label>
                <Controller
                  name={`lineInterfaces.${index}.dnsInput`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id={`dnsInput-${index}`}
                      type="text"
                      placeholder={dnsPlaceholder[index] || "8.8.8.8"}
                      className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-300"
                    />
                  )}
                />
                {errors.lineInterfaces?.[index]?.dnsInput && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lineInterfaces[index]?.dnsInput?.message}
                  </p>
                )}
                
              </div>
              
            </div>
            
          );
        })}
      </div>

      {/* Panel derecho - Resultado */}
      <div className="flex flex-col lg:w-1/2 min-h-0">
        <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Resultado del Generador de Script
          </label>
          <div className="h-60 overflow-y-auto  flex-grow o bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm">
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
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || isLoading}
          >    <i className="fa-solid fa-wand-magic-sparkles"></i>

            {isSubmitting || isLoading ? "Generando..." : " Generar"}
          </button>
          <button
            type="reset"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Borrar Todo
          </button>
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:bg-indigo-500 disabled:cursor-not-allowed"
            onClick={handleCopyScript}
            disabled={!scriptResult?.html}
          > <i className="fa-solid fa-arrow-up-from-bracket mr-2"></i>
             Copiar Script
          </button>
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
      </div>
      
    </form>
    
  );
};

export default FormularioMikrotikFailoverScriptGenerator;
