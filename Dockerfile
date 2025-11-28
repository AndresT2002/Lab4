

# Imagen base: Node.js 20 Alpine (ligera y segura)
FROM node:20-alpine

# Metadata del contenedor
LABEL maintainer="Estudiante UdeA"
LABEL description="Laboratorio 4 - Aplicación Docker"
LABEL version="1.0.0"

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias primero (para aprovechar cache de Docker)
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --production

# Copiar el resto del código fuente
COPY . .

# Crear usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Cambiar ownership de los archivos
RUN chown -R nodeuser:nodejs /app

# Cambiar al usuario no-root
USER nodeuser

# Puerto que expone la aplicación
EXPOSE 4000

# Variable de entorno para el puerto
ENV PORT=4000

# Health check para verificar que la aplicación está corriendo
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:4000/health || exit 1

# Comando para iniciar la aplicación
CMD ["node", "app.js"]

