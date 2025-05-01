# 1 - Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias primero (para usar el caché)
COPY package.json package-lock.json ./

# Instalar dependencias de desarrollo y producción
RUN npm ci

# Copiar el resto del proyecto
COPY . .

# Construir la aplicación Astro
RUN npm run build

# 2 - Etapa de producción
FROM node:18-alpine AS runner

WORKDIR /app

# Variables de entorno
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Copiar archivos necesarios desde el builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/dist ./dist

# Instalar solo las dependencias de producción
RUN npm ci --omit=dev

# Exponer el puerto
EXPOSE 4321

# Healthcheck (opcional)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --spider http://localhost:4321 || exit 1

# Comando de inicio (depende del adapter que uses)
# CMD ["node", "./dist/server/entry.mjs"]  # Para @astrojs/node
CMD node ./dist/server/entry.mjs
# CMD ["npm", "run", "preview"]  # Alternativa para SSG