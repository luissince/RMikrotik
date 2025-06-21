import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

type ScriptResult = {
    html: string;
    text: string;
};

const FormumarioMikrotikPcqGenerator = () => {
    const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
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

    const handleCopyScript = () => {
        if (scriptResult) {
            navigator.clipboard
                .writeText(scriptResult.text)
                .then(() => alert("Script copiado al portapapeles!"))
                .catch((err) => console.error("Error al copiar: ", err));
        }
    };

    const onSubmit = async (data: FormValues) => {
        try {
            setIsLoading(true);
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

            const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-pcq-generator`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Error en la API");
            }

            const result: ScriptResult = await response.json();
            setScriptResult(result);
        } catch (error) {
            console.error("Error enviando datos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg"
        >
            {/* Panel izquierdo - Controles */}
            <div className="flex flex-col gap-6 lg:w-1/2">
                <div>
                    <label className="block font-semibold text-gray-300 mb-2">
                        Queue Option
                    </label>
                    <Controller
                        name="queueOption"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="queue-tree">Queue Tree</option>
                                <option value="queue-simple">Queue Simple</option>
                            </select>
                        )}
                    />
                    {errors.queueOption && (
                        <p className="text-red-500 text-sm mt-1">{errors.queueOption.message}</p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold text-gray-300 mb-2">
                        Parent Name Queue
                    </label>
                    <Controller
                        name="parentNameQueue"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        )}
                    />
                    {errors.parentNameQueue && (
                        <p className="text-red-500 text-sm mt-1">{errors.parentNameQueue.message}</p>
                    )}
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block font-semibold text-gray-300 mb-2">
                            Sub Queue Upload
                        </label>
                        <Controller
                            name="uploadClient"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            )}
                        />
                        {errors.uploadClient && (
                            <p className="text-red-500 text-sm mt-1">{errors.uploadClient.message}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold text-gray-300 mb-2">
                            Sub Queue Download
                        </label>
                        <Controller
                            name="downloadClient"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            )}
                        />
                        {errors.downloadClient && (
                            <p className="text-red-500 text-sm mt-1">{errors.downloadClient.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block font-semibold text-gray-300 mb-2">
                            Upload Max-Limit
                        </label>
                        <Controller
                            name="uploadMaxLimit"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            )}
                        />
                        {errors.uploadMaxLimit && (
                            <p className="text-red-500 text-sm mt-1">{errors.uploadMaxLimit.message}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold text-gray-300 mb-2">
                            Download Max-Limit
                        </label>
                        <Controller
                            name="downloadMaxLimit"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            )}
                        />
                        {errors.downloadMaxLimit && (
                            <p className="text-red-500 text-sm mt-1">{errors.downloadMaxLimit.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block font-semibold text-gray-300 mb-2">
                        Setup PCQ Custom Name and Rate for limit Client
                    </label>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block font-semibold text-gray-300 mb-2">
                                PCQ Upload Name
                            </label>
                            <Controller
                                name="pcqUploadName"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                )}
                            />
                            {errors.pcqUploadName && (
                                <p className="text-red-500 text-sm mt-1">{errors.pcqUploadName.message}</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block font-semibold text-gray-300 mb-2">
                                PCQ Download Name
                            </label>
                            <Controller
                                name="pcqDownloadName"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                )}
                            />
                            {errors.pcqDownloadName && (
                                <p className="text-red-500 text-sm mt-1">{errors.pcqDownloadName.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block font-semibold text-gray-300 mb-2">
                                PCQ Up Limit / Client
                            </label>
                            <Controller
                                name="pcqUpLimitClient"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                )}
                            />
                            {errors.pcqUpLimitClient && (
                                <p className="text-red-500 text-sm mt-1">{errors.pcqUpLimitClient.message}</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block font-semibold text-gray-300 mb-2">
                                PCQ Down Limit / Client
                            </label>
                            <Controller
                                name="pcqDownLimitClient"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                )}
                            />
                            {errors.pcqDownLimitClient && (
                                <p className="text-red-500 text-sm mt-1">{errors.pcqDownLimitClient.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center">
                    <Controller
                        name="autoSetPcq"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                className="mr-2"
                            />
                        )}
                    />
                    <label className="text-gray-300">Auto set PCQ for full Bandwidth Shared</label>
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                        disabled={isSubmitting || isLoading}
                    >
                        {isSubmitting || isLoading ? "Generando..." : "Generar"}
                    </button>
                    <button
                        type="reset"
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Borrar Todo
                    </button>
                 
                </div>
                <SocialTooltipButton />
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
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                        onClick={handleCopyScript}
                        disabled={!scriptResult?.text}
                    >
                        Copiar Script
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormumarioMikrotikPcqGenerator;
