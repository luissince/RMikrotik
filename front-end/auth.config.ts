import Credentials from '@auth/core/providers/credentials'
import GitHub from '@auth/core/providers/github'
import Google from '@auth/core/providers/google'
import { defineConfig } from "auth-astro";

export default defineConfig({
	secret: import.meta.env.AUTH_SECRET,
	providers: [
		GitHub({
			clientId: import.meta.env.GITHUB_CLIENT_ID,
			clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.name,
					email: profile.email,
					image: profile.avatar_url,
					// Puedes agregar el providerId aquí
					providerId: `github_${profile.id}`
				};
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
			authorize: async (credentials, _) => {
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
		signIn: async ({ user }) => {
			console.log('----------signIn----------');
			console.log('Datos de usuario para guardar en la base de datos', user);

			const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/user/auth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"accept": "application/json",
				},
				body: JSON.stringify({
					providerId: user.providerId,
					email: user.email,
					name: user.name,
					image: user.image,
				}),
			});

			const result = await response.json();

			if(response.ok){
				// response {
				// 	type: 'Bearer',
				// 	token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGV4YW5kZXIgKFhhbmRlcikiLCJpYXQiOjE3NDk5OTQ2MTMsImV4cCI6MTc1MDA4MTAxM30.7YynI9GFgn23qIW8cHqYMMLRGxjZsbh864jlU6Bs9hE'
				//   }
				console.log('response', result);
				user.token = result.token;
				user.type = result.type;
			}

			
			return true;
		},
		jwt: async ({ token, user }) => {
			// Cuando el usuario hace login, 'user' contiene la info
			if (user) {
				console.log('----------jwt----------');
				token.user = user;
			}

			return token;
		},
		// Este callback determina qué datos estarán disponibles en el cliente
		session: async ({ session, user, token }) => {
			if (session.user) {
				console.log('----------session----------');
				session.user.token = token.user.token;
				session.user.type = token.user.type;
			}
			return session;
		},
	},
})