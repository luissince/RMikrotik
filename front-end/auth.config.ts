import Credentials from '@auth/core/providers/credentials'
import GitHub from '@auth/core/providers/github'
import Google from '@auth/core/providers/google'
import { defineConfig } from 'auth-astro'

export default defineConfig({
	secret: import.meta.env.AUTH_SECRET,
	providers: [
		GitHub({
			clientId: import.meta.env.GITHUB_CLIENT_ID,
			clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name,
					email: profile.email,
					image: profile.avatar_url,
					// Puedes agregar el providerId aquí
					providerId: `github_${profile.id}`
				}
			}
		}),
		Google({
			clientId: import.meta.env.GOOGLE_CLIENT_ID,
			clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
					// Puedes agregar el providerId aquí
					providerId: `google_${profile.sub}`
				}
			}
		}),
		Credentials({
			name: "Credentials",
			credentials: {
				email: {},
				password: {}
			},
			authorize: async (credentials, req) => {
				console.log('authorize', credentials);
				return {
					id: "ssss",
					name: "jua ramos",
					email: "alao@sdsd.com",
					providerId: "email_22342334"
				}
			},
		}),
	],
	callbacks: {
		signIn: async ({ user, account, profile }) => {
			console.log('----------signIn----------');
			console.log('Datos de usuario para guardar en la base de datos', user);
			return true;
		},
		jwt: async ({ token, user, account, profile }) => {
			// Cuando el usuario hace login, 'user' contiene la info
			if (user) {
				console.log('----------jwt----------');
				token.providerId = user.providerId
				token.userId = user.id
			}

			return token;
		},
		// Este callback determina qué datos estarán disponibles en el cliente
		session: async ({ session, user, token }) => {
			// console.log('session auth', session, user);
			if (session.user) {
				console.log('----------session----------');
				session.user.providerId = token.providerId
				session.user.id = token.userId
			}
			return session;
		},
	},
})