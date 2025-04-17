# 1 - Etapa de construcción (builder)
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias primero (capa caché)
COPY package.json pnpm-lock.yaml* yarn.lock* npm-shrinkwrap.json* ./

# Instalar dependencias (usa el gestor que uses: npm, yarn, pnpm)
RUN npm ci --frozen-lockfile || \
    yarn install --frozen-lockfile || \
    pnpm install --frozen-lockfile

# Copiar el resto de archivos
COPY . .

# Build de la aplicación (Astro genera archivos en /dist)
RUN npm run build

# 2 - Etapa de producción (runner)
FROM node:18-alpine AS runner

WORKDIR /app

# Variables de entorno
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Dependencias necesarias para SSR (si usas adapters como @astrojs/node)
RUN apk add --no-cache curl

# Si usas SSR (con @astrojs/node), copia los archivos necesarios
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist

# Si usas SSG (static), copia solo los archivos estáticos
# COPY --from=builder /app/dist ./dist

# Instala solo dependencias de producción (para SSR)
RUN npm install --production

# Expone el puerto
EXPOSE 4321

# Comando de inicio (depende del adapter que uses)
# CMD ["node", "./dist/server/entry.mjs"]  # Para @astrojs/node
CMD node ./dist/server/entry.mjs
# CMD ["npm", "run", "preview"]  # Alternativa para SSG