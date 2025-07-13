import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialTooltipButton from "../SocialTooltipButton";
import { z } from "zod";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

// Esquema de validación con Zod
const formSchema = z.object({
  queueOption: z.string().min(1, "Campo obligatorio"),
  parentNameQueue: z.string().min(1, "Campo obligatorio"),
  uploadClient: z.string().min(1, "Campo obligatorio"),
  downloadClient: z.string().min(1, "Campo obligatorio"),
  uploadMaxLimit: z.string().min(1, "Campo obligatorio"),
  downloadMaxLimit: z.string().min(1, "Campo obligatorio"),
  pcqUploadName: z.string().min(1, "Campo obligatorio"),
  pcqDownloadName: z.string().min(1, "Campo obligatorio"),
  pcqUpLimitClient: z.string().min(1, "Campo obligatorio"),
  pcqDownLimitClient: z.string().min(1, "Campo obligatorio"),
  autoSetPcq: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}

const FormularioMikrotikPcqGenerator = ({ session, subscription }: Props) => {
  const { control, handleSubmit: rhfHandleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      queueOption: "queue-tree",
      parentNameQueue: "GLOBAL-CONNECTION",
      uploadClient: "Upload-Client",
      downloadClient: "Download-Client",
      uploadMaxLimit: "10M",
      downloadMaxLimit: "50M",
      pcqUploadName: "PCQ-Up",
      pcqDownloadName: "PCQ-Down",
      pcqUpLimitClient: "1M",
      pcqDownLimitClient: "2M",
      autoSetPcq: false,
    },
  });

  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);

  const onSubmit = async (data: FormValues) => {
    if (!validateAuth()) return;

    const payload = {
      idQueueOption: data.queueOption,
      parentNameQueue: data.parentNameQueue,
      subQueueUpload: data.uploadClient,
      subQueueDownload: data.downloadClient,
      uploadMaxLimit: data.uploadMaxLimit,
      downloadMaxLimit: data.downloadMaxLimit,
      pcqUploadName: data.pcqUploadName,
      pcqDownloadName: data.pcqDownloadName,
      pcqUpLimitClient: data.pcqUpLimitClient,
      pcqDownLimitClient: data.pcqDownLimitClient,
      autoSetPcq: data.autoSetPcq,
    };

    const result = await makeApiCall("/mikrotik-pcq-generator", payload);
    if (result) {
      setScriptResult(result);
    }
  };

  const handleClear = () => {
    if (!validateAuth()) return;
    setScriptResult(null);
  };

  return (
    <form onSubmit={rhfHandleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg">
      {/* Panel izquierdo - Controles */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        <Controller
          name="queueOption"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block font-semibold text-gray-300 mb-2">Queue Option</label>
              <select
                {...field}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="queue-tree">Queue Tree</option>
                <option value="queue-simple">Queue Simple</option>
              </select>
            </div>
          )}
        />

        <Controller
          name="parentNameQueue"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block font-semibold text-gray-300 mb-2">Parent Name Queue</label>
              <input
                {...field}
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}
        />

        <div className="flex gap-4">
          <Controller
            name="uploadClient"
            control={control}
            render={({ field }) => (
              <div className="flex-1">
                <label className="block font-semibold text-gray-300 mb-2">Sub Queue Upload</label>
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}
          />

          <Controller
            name="downloadClient"
            control={control}
            render={({ field }) => (
              <div className="flex-1">
                <label className="block font-semibold text-gray-300 mb-2">Sub Queue Download</label>
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Controller
            name="uploadMaxLimit"
            control={control}
            render={({ field }) => (
              <div className="flex-1">
                <label className="block font-semibold text-gray-300 mb-2">Upload Max-Limit</label>
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}
          />

          <Controller
            name="downloadMaxLimit"
            control={control}
            render={({ field }) => (
              <div className="flex-1">
                <label className="block font-semibold text-gray-300 mb-2">Download Max-Limit</label>
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-300 mb-2">Setup PCQ Custom Name and Rate for limit Client</label>
          <div className="flex gap-4">
            <Controller
              name="pcqUploadName"
              control={control}
              render={({ field }) => (
                <div className="flex-1">
                  <label className="block font-semibold text-gray-300 mb-2">PCQ Upload Name</label>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}
            />

            <Controller
              name="pcqDownloadName"
              control={control}
              render={({ field }) => (
                <div className="flex-1">
                  <label className="block font-semibold text-gray-300 mb-2">PCQ Download Name</label>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}
            />
          </div>

          <div className="flex gap-4">
            <Controller
              name="pcqUpLimitClient"
              control={control}
              render={({ field }) => (
                <div className="flex-1">
                  <label className="block font-semibold text-gray-300 mb-2">PCQ Up Limit / Client</label>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}
            />

            <Controller
              name="pcqDownLimitClient"
              control={control}
              render={({ field }) => (
                <div className="flex-1">
                  <label className="block font-semibold text-gray-300 mb-2">PCQ Down Limit / Client</label>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}
            />
          </div>
        </div>

        <Controller
          name="autoSetPcq"
          control={control}
          render={({ field }) => (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="mr-2"
              />
              <label className="text-gray-300">Auto set PCQ for full Bandwidth Shared</label>
            </div>
          )}
        />

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
            disabled={isLoading || !session}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            {isLoading ? "Generando..." : "Generar"}
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            onClick={handleClear}
          >
            Borrar Todo
          </button>
        </div>
        <SocialTooltipButton />
      </div>

      {/* Panel derecho - Resultado */}
      <div className="flex flex-col lg:w-1/2 min-h-0">
        <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">Resultado del Generador de Script</label>
          <div className="h-60 overflow-y-auto flex-grow bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm">
            {scriptResult ? (
              <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
            ) : (
              <p className="text-gray-500">
                {isLoading ? "Generando script..." : "El script generado aparecerá aquí"}
              </p>
            )}
          </div>
        </div>
        <div className="flex mt-4 space-x-4">
          <button
            type="button"
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
            onClick={()=>handleCopyScript()}
            disabled={!scriptResult?.text}
          >
            Copiar Script
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormularioMikrotikPcqGenerator;
