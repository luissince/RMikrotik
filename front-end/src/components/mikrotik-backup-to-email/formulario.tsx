import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Esquema de validación con Zod
const backupFormSchema = z.object({
    emailServer: z
        .string()
        .min(1, "El servidor de email es obligatorio")
        .regex(
            /^(\d{1,3}\.){3}\d{1,3}$|^[\w.-]+\.[a-zA-Z]{2,}$/,
            "Ingresa una IP válida o nombre de dominio"
        ),

    emailPort: z
        .string()
        .min(1, "El puerto es obligatorio")
        .refine(
            (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 65535,
            "Puerto inválido (1-65535)"
        ),

    idRouterOsVersion: z.string().min(1, "Selecciona una versión"),

    emailUser: z
        .string()
        .min(1, "El usuario de email es obligatorio")
        .email("Email de usuario inválido"),

    emailPassword: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),

    idBackupFileOption: z.string().min(1, "Selecciona una opción"),

    sendBackupFileToEmail: z
        .string()
        .min(1, "El email de destino es obligatorio")
        .email("Email de destino inválido"),

    routerDescriptionEmailTitle: z
        .string()
        .min(1, "La descripción es obligatoria")
        .max(100, "Máximo 100 caracteres"),

    schedulerSedingEmail: z
        .string()
        .min(1, "El tiempo es obligatorio")
        .regex(/^\d+d$/, "Formato inválido. Usa formato: 7d"),
});

type FormValues = z.infer<typeof backupFormSchema>;

interface ScriptResponse {
    html: string;
    text: string;
}

export default function FormularioBackupToEmail() {
    const [scriptResponse, setScriptResponse] = useState<ScriptResponse | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(backupFormSchema),
        defaultValues: {
            emailServer: "74.125.200.109",
            emailPort: "587",
            idRouterOsVersion: "v7.xx",
            emailUser: "backup.mikrotik.ros@gmail.com",
            emailPassword: "KASNLKMALM",
            idBackupFileOption: "Full Backup Files (.backup)",
            sendBackupFileToEmail: "",
            routerDescriptionEmailTitle: "",
            schedulerSedingEmail: "7d",
        },
    });

    // Función para enviar a la API
    const submitToApi = async (data: FormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-backup-to-mail`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            setScriptResponse(result);
            console.log("Respuesta de la API:", result);
        } catch (err) {
            console.error("Error al enviar datos:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrió un error al contactar con el servidor"
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Función para copiar el script al portapapeles
    const copyToClipboard = () => {
        if (scriptResponse?.text) {
            navigator.clipboard
                .writeText(scriptResponse.text)
                .then(() => alert("Script copiado al portapapeles"))
                .catch((err) => console.error("Error al copiar: ", err));
        }

    };

    return (

        <div className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg">
            {/* Panel de Configuración */}
            <div className="flex flex-col gap-6 lg:w-1/2">
                {/* E-Mail Server */}


                <form className="ring-2 ring-blue-500 p-4 rounded-lg" onSubmit={handleSubmit(submitToApi)}>
                <div>
                    <label
                        htmlFor="emailServer"
                        className="block font-semibold text-gray-300 mb-2 mt-4"
                    >
                        E-Mail Server
                    </label>
                    <Controller
                        name="emailServer"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="emailServer"
                                type="text"
                                placeholder="74.125.200.109"
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        )}
                    />
                    {errors.emailServer && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.emailServer.message}
                        </p>
                    )}

                    {/* E-Mail Port and RouterOS Version */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                htmlFor="emailPort"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                E-Mail Port
                            </label>
                            <Controller
                                name="emailPort"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id="emailPort"
                                        type="text"
                                        placeholder="587"
                                        className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-200"
                                    />
                                )}
                            />
                            {errors.emailPort && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.emailPort.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="idRouterOsVersion"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                RouterOS Version
                            </label>
                            <Controller
                                name="idRouterOsVersion"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        id="idRouterOsVersion"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="v6.xx">v6.xx</option>
                                        <option value="v7.xx">v7.xx</option>
                                    </select>
                                )}
                            />
                            {errors.idRouterOsVersion && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.idRouterOsVersion.message}
                                </p>
                            )}
                        </div>





                    </div>

                    {/* E-Mail User */}
                    <div>
                        <label
                            htmlFor="emailUser"
                            className="block font-semibold text-gray-300 mb-2 mt-4"
                        >
                            E-Mail User
                        </label>
                        <Controller
                            name="emailUser"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="emailUser"
                                    type="text"
                                    placeholder="backup.mikrotik.ros@gmail.com"
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            )}
                        />
                        {errors.emailUser && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.emailUser.message}
                            </p>
                        )}
                    </div>

                    {/* E-Mail Password */}
                    <div>
                        <label
                            htmlFor="emailPassword"
                            className="block font-semibold text-gray-300 mb-2 mt-4"
                        >
                            E-Mail Password
                        </label>
                        <Controller
                            name="emailPassword"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="emailPassword"
                                    type="text"
                                    placeholder="contraseña"
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            )}
                        />
                        {errors.emailPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.emailPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Backup File Option */}
                    <div>
                        <label
                            htmlFor="idBackupFileOption"
                            className="block font-semibold text-gray-300 mb-2 mt-4"
                        >
                            Backup File Option
                        </label>
                        <Controller
                            name="idBackupFileOption"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    id="idBackupFileOption"
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="Full Backup Files (.backup)">
                                        Full Backup Files (.backup)
                                    </option>
                                    <option value="Full RSC Files (.rsc)">
                                        Full RSC Files (.rsc)
                                    </option>
                                    <option value="Queue Simple (.rsc)">
                                        Queue Simple (.rsc)
                                    </option>
                                    <option value="Queue Tree (.rsc)">
                                        Queue Tree (.rsc)
                                    </option>
                                    <option value="Mangle (.rsc)">Mangle (.rsc)</option>
                                    <option value="Hotspot (.rsc)">Hotspot (.rsc)</option>
                                    <option value="PPP / PPPoE (.rsc)">
                                        PPP / PPPoE (.rsc)
                                    </option>
                                    <option value="Address List (.rsc)">
                                        Address List (.rsc)
                                    </option>
                                    <option value="IP Routes (.rsc)">IP Routes (.rsc)</option>
                                    <option value="Routing BGP, RIF, etc. (.rsc)">
                                        Routing BGP, RIF, etc. (.rsc)
                                    </option>
                                </select>
                            )}
                        />
                        {errors.idBackupFileOption && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.idBackupFileOption.message}
                            </p>
                        )}
                    </div>

                    {/* Destination Email */}
                    <div>
                        <label
                            htmlFor="sendBackupFileToEmail"
                            className="block font-semibold text-gray-300 mb-2 mt-4"
                        >
                            Send Backup File To Your E-Mail
                        </label>
                        <Controller
                            name="sendBackupFileToEmail"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="sendBackupFileToEmail"
                                    type="text"
                                    placeholder="your-email@gmail.com"
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            )}
                        />
                        {errors.sendBackupFileToEmail && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.sendBackupFileToEmail.message}
                            </p>
                        )}
                    </div>

                    {/* Router Description */}
                    <div>
                        <label
                            htmlFor="routerDescriptionEmailTitle"
                            className="block font-semibold text-gray-300 mb-2 mt-4"
                        >
                            Router Description / E-Mail Title
                        </label>
                        <Controller
                            name="routerDescriptionEmailTitle"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="routerDescriptionEmailTitle"
                                    type="text"
                                    placeholder="Backup From my Router"
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            )}
                        />
                        {errors.routerDescriptionEmailTitle && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.routerDescriptionEmailTitle.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Scheduler Time */}
                <div>
                    <label
                        htmlFor="schedulerSedingEmail"
                        className="block font-semibold text-gray-300 mb-2 mt-4"
                    >
                        Scheduler Sending E-Mail
                    </label>
                    <p className="text-gray-300">
                        d (day) : 1d, 3d, 7d, 14d, 20d, 30d
                    </p>
                    <Controller
                        name="schedulerSedingEmail"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="schedulerSedingEmail"
                                type="text"
                                placeholder="7d"
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        )}
                    />
                    {errors.schedulerSedingEmail && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.schedulerSedingEmail.message}
                        </p>
                    )}
                </div>
                {/* Scheduler Time */}
                <div>
                    <label
                        htmlFor="schedulerSedingEmail"
                        className="block font-semibold text-gray-300 mb-2 mt-4"
                    >
                        Scheduler Sending E-Mail
                    </label>
                    <p className="text-gray-300">
                        d (day) : 1d, 3d, 7d, 14d, 20d, 30d
                    </p>
                    <Controller
                        name="schedulerSedingEmail"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="schedulerSedingEmail"
                                type="text"
                                placeholder="7d"
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        )}
                    />
                    {errors.schedulerSedingEmail && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.schedulerSedingEmail.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex flex-wrap justify-center gap-4 mb-6 mt-7">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`text-white w-full py-2 rounded-md transition ease-in-out delay-150 ${isLoading
                            ? "bg-gray-500"
                            : "bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-teal-600"
                            } duration-300`}
                    >
                        {isLoading ? "Generando..." : "Generar"}
                    </button>
                </div>

                {/* Error message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}
                </form>
                <p className="text-2sm text-orange-500 mt-5">
                    CREATE YOUR OWN GMAIL SERVER :
                </p>

                <p className="text-gray-400">
                    1. First go here https://myaccount.google.com/security then follow the
                    instructions to activate 2-step verification, then a code will be sent
                    to your cellphone number.<br />
                    2. Then create an application password here https://myaccount.google.com/apppasswords
                    later this password will be used to input the Mikrotik mail server.
                </p>

                <div className="bg-gray-700 p-4 rounded-lg mt-5">
                    <p className="text-sm text-gray-300">
                        Tenemos un video tutorial de como utilizar nuestra herramienta, Ver
                        Video...
                    </p>
                </div>

            </div>
            {/* Script Generator Section */}
            <div className="flex flex-col lg:w-1/2 min-h-0 ">
                <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Script Generator Result</label>
                    <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
                        {scriptResponse && (
                            <div dangerouslySetInnerHTML={{ __html: scriptResponse.html }} />
                        )}
                    </div>
                </div>

                <div className="flex mt-4 space-x-4">
                    <button
                        type="button"
                        onClick={copyToClipboard}
                        className="bg-orange-500 text-white px-4 py-2 w-full justify-center  rounded hover:bg-orange-600 transition flex items-center"
                        disabled={!scriptResponse?.text}
                    >
                        Copiar Script
                    </button>
                </div>
            </div>

        </div>

    );
}