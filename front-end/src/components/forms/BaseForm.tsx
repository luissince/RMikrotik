import { useEffect, useState } from "react";
import type { Session } from "@auth/core/types";
import AlertKit, { alertKit } from "alert-kit";
import { buttonPresets } from "../../styles/buttonStyles";
import type { Subscription } from "../../types/subscription/subscription";

// Configuración global de AlertKit
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

export interface BaseFormProps {
    session: Session | null;
    subscription: Subscription | null;
    apiEndpoint: string;
}

export interface ScriptResult {
    html: string;
    pdf?: string;
    text: string;
    html1?: string;
    html2?: string;
    html3?: string;
    text1?: string;
    text2?: string;
    text3?: string;
    data?: {
        "upload-max-limit": string;
        "download-actual-burst-duration": string;
        "upload-threshold": string;
        "upload-actual-burst-duration": string;
        "upload-limit-at": string;
        "download-limit-at": string;
        "upload-burst-time-value": string;
        "upload-burst-limit": string;
        "download-max-limit": string;
        "download-burst-limit": string;
        "download-threshold": string;
        "download-burst-time-value": string;

        "dnsIPv4Server1": string;
        "dnsIPv4Server2": string;
        "dnsIPv6Server1": string;
        "dnsIPv6Server2": string;
        "dohServer": string;
        "dohHostname": string;
    };
    reateLimit?: string;
    categories?: any;
    message?: string;
}

/**
 * Hook personalizado para manejar validaciones de sesión y suscripción
 */
export const useAuthValidation = (session: Session | null, subscription: Subscription | null) => {
    useEffect(() => {
        if (!session) {
            alertKit.warning({
                title: 'Sesión',
                message: 'Inicie sesión para continuar.',
            });
        }
    }, [session]);

    const validateAuth = (): boolean => {
        if (!session) {
            alertKit.warning({
                title: 'Sesión',
                message: 'Inicie sesión para continuar.',
            });
            return false;
        }
        if (!subscription) {
            alertKit.warning({
                title: 'Suscripción',
                message: 'No tienes una suscripción activa.',
            });
            return false;
        }
        if (subscription?.status !== "active") {
            alertKit.warning({
                title: 'Suscripción',
                message: 'Suscripción no activa. Compruebe suscripción para continuar.',
            });
            return false;
        }
        return true;
    };

    return { validateAuth };
};

/**
 * Hook personalizado para manejar llamadas a la API
 */
export const useApiCall = (session: Session | null) => {
    const [isLoading, setIsLoading] = useState(false);

    const makeApiCall = async (endpoint: string, payload?: any, method: string = "POST",): Promise<ScriptResult | null> => {
        setIsLoading(true);
        try {
            alertKit.loading({ message: 'Generando...' });

            const config: RequestInit = {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `${session?.user?.type} ${session?.user?.token}`,
                },
            };

            if (method !== "GET" && payload) {
                config.body = JSON.stringify(payload);
            }

            const response = await fetch(
                `${import.meta.env.PUBLIC_BASE_URL_API}${endpoint}`,
                config
            );

            const result = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '/logout?reason=expired';
                    return null;
                }
                throw new Error(result.message || 'Error al realizar la petición');
            }

            alertKit.close();
            return result as ScriptResult;
        } catch (error) {
            alertKit.error({
                title: 'Error',
                message: (error as Error).message,
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { makeApiCall, isLoading };
};

/**
 * Hook para manejar operaciones comunes del script
 */
export const useScriptOperations = (session: Session | null, subscription: Subscription | null) => {
    const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
    const { validateAuth } = useAuthValidation(session, subscription);

    const handleCopyScript = (text?: string) => {
        if (!validateAuth()) return;
        if (scriptResult) {
            navigator.clipboard
                .writeText(text || scriptResult.text || scriptResult.reateLimit!)
                .then(() => {
                    alertKit.success({
                        title: "Script",
                        message: "Script copiado al portapapeles!",
                    })
                })
                .catch((err) => console.error("Error al copiar: ", err));
        }
    };

    return {
        scriptResult,
        setScriptResult,
        handleCopyScript,
        validateAuth
    };
};
