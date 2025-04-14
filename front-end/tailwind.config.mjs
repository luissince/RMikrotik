/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
				  css: {
					'h1': {
					  color: 'orange',
					},
					'h2': {
						color: 'black',
					},
					'h3': {
						color: 'black',
					},
					'li': {
						color: 'black',
					},
					'p': {
						color: '#172554'
					},
					'code': {
					  backgroundColor: 'black',
					  padding: '0.2em 0.4em',
					  borderRadius: '0.25rem',
					},
					'pre': {
					  backgroundColor: '#1d293d',
					},
				  },
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
