import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

const FormularioMikrotikFailoverScriptGenerator = () => {
  // Estado para controlar el número de líneas
  const [numLineas, setNumLineas] = useState<number>(2);
  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);

  // Configuración de React Hook Form con validación Zod
  const {
    control,
    handleSubmit,
    formState: { errors },
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
    const newNumLines = Number(event.target.value) || 2;
    setNumLineas(newNumLines);

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

  const handleCopyToClipboard = () => {
    if (scriptResult) {
      navigator.clipboard
        .writeText(scriptResult.text)
        .then(() => {
          alert("Script copiado al portapapeles!");
        })
        .catch((err) => console.error("Error al copiar: ", err));
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
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

      console.log("Payload listo para enviar:", payload);

      // Hacer la petición POST
      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-failover-script-generator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la API");
      }

      const result: ScriptResult = await response.json();
      console.log("Respuesta de la API:", result);

      setScriptResult({ text: result.text, html: result.html });
    } catch (error) {
      console.error("Error enviando datos:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg min-h-[70vh]"
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
          >
            Generar
          </button>
          <button
            type="reset"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Borrar Todo
          </button>
          <button
            type="button"
            onClick={handleCopyToClipboard}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Copiar Script
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormularioMikrotikFailoverScriptGenerator;
