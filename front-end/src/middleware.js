import { getToken } from "@auth/core/jwt";
import { sequence } from "astro:middleware";
const validAuthRoutes = ['signin' , 'csrf', 'signout', 'error','callback', 'signin/github', 'signin/google', 'signin/facebook', 'callback/google', 'callback/github', 'callback/facebook', 'callback/credentials'];

async function auth(context, next) {
    const url = new URL(context.request.url);
    if (url.pathname.startsWith('/api/auth/')) {
        const endpoint = url.pathname.split('/api/auth/')[1];
        if (!validAuthRoutes.includes(endpoint)) {
            return Response.redirect(new URL("/", context.url), 302);
        }
    }
    return next();
}


export const onRequest = sequence(auth);