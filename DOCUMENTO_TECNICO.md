# Documento Técnico - Laboratorio 4
## Contenedores y Despliegue con Docker



### Descripción Técnica del Laboratorio

Este laboratorio implementa una **aplicación web en Node.js** utilizando el framework **Express**, empaquetada y desplegada dentro de un **contenedor Docker**. La aplicación expone una API REST con múltiples endpoints que permiten:

- Mostrar mensajes de bienvenida
- Realizar operaciones matemáticas básicas (suma, resta, multiplicación, división)
- Consultar información del servidor y estado de salud del servicio

**Tecnologías utilizadas:**
- **Runtime:** Node.js 20 (imagen Alpine)
- **Framework:** Express 4.18
- **Contenedor:** Docker con imagen base `node:20-alpine`
- **Puerto expuesto:** 3000

El **Dockerfile** está optimizado siguiendo buenas prácticas:
- Uso de imagen Alpine (ligera, ~130MB total)
- Separación de capas para aprovechar el cache de Docker
- Usuario no-root por seguridad
- Health check integrado

---

### ¿Cómo Docker Mejora la Arquitectura de Despliegue?

**1. Portabilidad**
Docker elimina el problema de "funciona en mi máquina". Un contenedor encapsula la aplicación junto con todas sus dependencias, configuraciones y el sistema operativo necesario. La misma imagen Docker se ejecuta de forma idéntica en:
- Entorno de desarrollo local (Windows, Mac, Linux)
- Servidores de staging/testing
- Servidores de producción
- Servicios cloud (AWS, Azure, GCP)

**2. Aislamiento**
Cada contenedor opera en un entorno aislado con su propio filesystem, red y procesos. Esto significa que:
- Las dependencias de una aplicación no interfieren con otras
- Los conflictos de versiones se eliminan
- Mayor seguridad al limitar el alcance de posibles vulnerabilidades

**3. Escalabilidad**
Docker facilita el escalamiento horizontal de aplicaciones:
- Se pueden crear múltiples instancias del mismo contenedor en segundos
- Orquestadores como Kubernetes o Docker Swarm gestionan automáticamente la distribución de carga
- El escalamiento es rápido porque los contenedores inician en milisegundos (vs minutos de las VMs)

**4. Consistencia y Reproducibilidad**
El Dockerfile actúa como documentación ejecutable del entorno:
- Cualquier persona puede reconstruir exactamente el mismo ambiente
- Los despliegues son predecibles y repetibles
- Se elimina la configuración manual propensa a errores

**5. Eficiencia de Recursos**
A diferencia de las máquinas virtuales tradicionales:
- Los contenedores comparten el kernel del sistema operativo host
- Menor consumo de RAM y CPU
- Más contenedores pueden ejecutarse en el mismo hardware
- Tiempos de inicio casi instantáneos

**6. Integración con CI/CD**
Docker se integra naturalmente con pipelines de integración y despliegue continuo:
- Las imágenes se construyen automáticamente en cada commit
- Las pruebas se ejecutan en contenedores idénticos a producción
- El despliegue consiste simplemente en actualizar la imagen del contenedor

---

### Conclusión

Docker transforma fundamentalmente cómo desarrollamos, probamos y desplegamos aplicaciones. Al empaquetar nuestra aplicación Node.js en un contenedor, garantizamos que funcionará de manera consistente en cualquier entorno, desde la laptop del desarrollador hasta el cluster de producción en la nube.

