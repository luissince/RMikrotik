import type { Session } from "@auth/core/types";
import type { Subscription } from "../types/subscription/subscription";
import { getSession } from "auth-astro/server";
import type { User } from "../types/user/user";

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
    const session = await getSession(request);
    let subscription: Subscription | null = null;
    let user: User | null = null;
    let shouldSignOut = false;

    if (session) {
        try {
            const responseUser = await fetch(
                `${import.meta.env.PUBLIC_BASE_URL_API}/user/id`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `${session?.user?.type} ${session.user?.token}`,
                    },
                }
            );

            if (responseUser.status === 401) {
                shouldSignOut = true;
            }

            if (responseUser.ok) {
                const result = await responseUser.json();
                user = result.user;
            }

            const responseSubscription = await fetch(
                `${import.meta.env.PUBLIC_BASE_URL_API}/payment`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `${session?.user?.type} ${session.user?.token}`,
                    },
                }
            );

            if (responseSubscription.status === 401) {
                shouldSignOut = true;
            }

            if (responseSubscription.ok) {
                const result = await responseSubscription.json();
                subscription = result.subscription;
            }
        } catch (error) {
            console.error("Error fetching subscription:", error);
        }
    }

    return { session, subscription, user, shouldSignOut };
}