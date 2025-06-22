import type { Session, User } from "@auth/core/types";
import type { Subscription } from "../types/subscription/subscription";
import { getSession } from "auth-astro/server";

export interface AuthData {
    session: Session | null;
    subscription: Subscription | null;
    user: User | null;
    shouldSignOut: boolean;
}

/**
 * Obtiene los datos de sesión y suscripción del usuario
 * @param request - Request object de Astro
 * @returns Promise con session, subscription y shouldSignOut
 */
export async function getAuthData(request: Request): Promise<AuthData> {
    // Importación dinámica para evitar problemas de SSR

    const session = await getSession(request);
    let subscription: Subscription | null = null;
    let user: User | null = null;
    let shouldSignOut = false;

    if (session) {
        try {
            const response = await fetch(
                `${import.meta.env.PUBLIC_BASE_URL_API}/payment`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `${session?.user?.type} ${session.user?.token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                subscription = data.subscription;
                user = data.user;
            } else if (response.status === 401) {
                shouldSignOut = true;
            }
        } catch (error) {
            console.error("Error fetching subscription:", error);
            // Opcional: manejar errores de red
        }
    }

    return { session, subscription, user, shouldSignOut };
}