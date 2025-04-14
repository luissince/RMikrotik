// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

import auth from 'auth-astro';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), auth(), react()],
  output: "server",
  adapter: node({
    mode: 'standalone'
  })
});