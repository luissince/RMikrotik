import { useEffect, useState } from "react";
import type { Session } from "@auth/core/types";
import AlertKit, { alertKit } from "alert-kit";
import { buttonPresets } from "../../styles/buttonStyles";
import type { Subscription } from "../../types/subscription/subscription";

// Configuración global de AlertKit (mover a un archivo separado si se usa en múltiples lugares)
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

    const makeApiCall = async (endpoint: string, payload: any): Promise<ScriptResult | null> => {
        setIsLoading(true);
        try {

            alertKit.loading({ message: 'Generando...' });

            const response = await fetch(
                `${import.meta.env.PUBLIC_BASE_URL_API}${endpoint}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `${session?.user?.type} ${session?.user?.token}`,
                    },
                    body: JSON.stringify(payload),
                }
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

    const handleCopyScript = () => {
        if (!validateAuth()) return;

        if (scriptResult) {
            navigator.clipboard
                .writeText(scriptResult.text)
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