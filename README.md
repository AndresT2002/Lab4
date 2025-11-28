# 🐳 Laboratorio 4 - Contenedores y Despliegue con Docker

**Universidad de Antioquia - 2025**

## 📋 Descripción

Aplicación web simple desarrollada en Node.js con Express que expone endpoints HTTP para demostrar el uso de contenedores Docker. La aplicación incluye operaciones matemáticas básicas y mensajes de bienvenida.

---

## 🚀 Requisitos Previos

1. **Docker Desktop** o **Docker Engine** instalado
2. **Cuenta en Docker Hub** (gratuita)
3. **Git** (opcional, para clonar el repositorio)

### Verificar instalación de Docker

```bash
docker --version
docker info
```

---

## 📁 Estructura del Proyecto

```
Lab4/
├── app.js              # Aplicación principal Node.js
├── package.json        # Dependencias del proyecto
├── Dockerfile          # Instrucciones para construir la imagen
├── .dockerignore       # Archivos a ignorar en la imagen
├── README.md           # Este archivo
└── DOCUMENTO_TECNICO.md # Documento técnico del laboratorio
```

---

## 🛠️ Instrucciones de Uso

### 1️⃣ Construir la Imagen Docker

```bash
# Navegar al directorio del proyecto
cd Lab4

# Construir la imagen con tag
docker build -t miapp-docker:v1 .
```

### 2️⃣ Verificar la Imagen Creada

```bash
docker images
```

Deberías ver algo como:
```
REPOSITORY      TAG       IMAGE ID       CREATED          SIZE
miapp-docker    v1        xxxxxxxxxxxx   10 seconds ago   ~130MB
```

### 3️⃣ Ejecutar el Contenedor

```bash
# Ejecutar en segundo plano (-d) mapeando el puerto 3000
docker run -d -p 3000:3000 --name mi-contenedor miapp-docker:v1
```

### 4️⃣ Verificar que el Contenedor está Corriendo

```bash
# Ver contenedores activos
docker ps

# Ver logs del contenedor
docker logs mi-contenedor

# Ver logs en tiempo real
docker logs -f mi-contenedor
```

### 5️⃣ Probar la Aplicación

Abre tu navegador y visita:

- **Bienvenida:** http://localhost:3000/
- **Saludo personalizado:** http://localhost:3000/saludo/TuNombre
- **Suma:** http://localhost:3000/suma/10/5
- **Resta:** http://localhost:3000/resta/20/8
- **Multiplicación:** http://localhost:3000/multiplicacion/7/6
- **División:** http://localhost:3000/division/100/4
- **Info del servidor:** http://localhost:3000/info
- **Health check:** http://localhost:3000/health

### 6️⃣ Detener y Eliminar el Contenedor

```bash
# Detener el contenedor
docker stop mi-contenedor

# Eliminar el contenedor
docker rm mi-contenedor

# O en un solo comando
docker rm -f mi-contenedor
```

---

## 📤 Publicar en Docker Hub

### 1️⃣ Iniciar Sesión en Docker Hub

```bash
docker login
```

### 2️⃣ Etiquetar la Imagen

```bash
# Reemplaza 'tu-usuario' con tu nombre de usuario de Docker Hub
docker tag miapp-docker:v1 tu-usuario/miapp-docker:v1
```

### 3️⃣ Subir la Imagen

```bash
docker push tu-usuario/miapp-docker:v1
```

### 4️⃣ Verificar en Docker Hub

Visita https://hub.docker.com y verifica que tu imagen aparece en tus repositorios.

---

## 📥 Descargar y Ejecutar desde Docker Hub

Desde cualquier otro equipo con Docker instalado:

```bash
# Descargar la imagen
docker pull tu-usuario/miapp-docker:v1

# Ejecutar el contenedor
docker run -d -p 3000:3000 tu-usuario/miapp-docker:v1
```

---

## 🔧 Comandos Docker Útiles

### Gestión de Imágenes

```bash
# Listar imágenes
docker images

# Eliminar imagen
docker rmi miapp-docker:v1

# Eliminar imágenes no utilizadas
docker image prune
```

### Gestión de Contenedores

```bash
# Listar contenedores activos
docker ps

# Listar todos los contenedores (incluyendo detenidos)
docker ps -a

# Entrar al contenedor (shell interactivo)
docker exec -it mi-contenedor sh

# Ver estadísticas de recursos
docker stats mi-contenedor

# Inspeccionar contenedor
docker inspect mi-contenedor
```

### Limpieza

```bash
# Eliminar todos los contenedores detenidos
docker container prune

# Eliminar todo lo no utilizado (imágenes, contenedores, volúmenes, redes)
docker system prune -a
```

---

## 🌐 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Mensaje de bienvenida y lista de endpoints |
| GET | `/saludo/:nombre` | Saludo personalizado |
| GET | `/suma/:a/:b` | Suma de dos números |
| GET | `/resta/:a/:b` | Resta de dos números |
| GET | `/multiplicacion/:a/:b` | Multiplicación de dos números |
| GET | `/division/:a/:b` | División de dos números |
| GET | `/info` | Información del servidor/contenedor |
| GET | `/health` | Health check del servicio |

---

## 📝 Ejemplo de Respuestas

### GET /
```json
{
  "mensaje": "¡Hola desde Docker! 🐳",
  "descripcion": "Laboratorio 4 - Contenedores y Despliegue con Docker",
  "universidad": "Universidad de Antioquia",
  "año": 2025
}
```

### GET /suma/10/5
```json
{
  "operacion": "suma",
  "a": 10,
  "b": 5,
  "resultado": 15
}
```

### GET /info
```json
{
  "aplicacion": "Lab4 Docker - UdeA",
  "version": "1.0.0",
  "nodejs": "v20.x.x",
  "plataforma": "linux",
  "contenedor": "abc123def456"
}
```

---

## 🐛 Solución de Problemas

### El contenedor no inicia
```bash
# Ver logs para identificar el error
docker logs mi-contenedor
```

### Puerto 3000 ocupado
```bash
# Usar un puerto diferente
docker run -d -p 8080:3000 --name mi-contenedor miapp-docker:v1
# Luego acceder via http://localhost:8080
```

### Error de permisos en Docker
```bash
# En Linux, agregar usuario al grupo docker
sudo usermod -aG docker $USER
# Reiniciar sesión
```

---

## 👨‍💻 Autor

Estudiante - Universidad de Antioquia

**Computación en la Nube - 2025**

---

## 📄 Licencia

MIT License

