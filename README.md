# Proyecto Banco

Este proyecto es una solución completa para la gestión de créditos bancarios, desarrollada con tecnologías modernas en el frontend y backend, todo empaquetado y gestionado mediante Docker Compose.

## Tecnologías Utilizadas

- **Backend:** [NestJS](https://nestjs.com/) con MongoDB como base de datos.
- **Frontend:** [NextJS](https://nextjs.org/) para la interfaz de usuario.
- **Contenerización:** Docker Compose para la gestión y orquestación de contenedores.

## Estructura del Proyecto

- **`backend-banco`**: Código fuente del backend desarrollado con NestJS.
- **`frontend-banco`**: Código fuente del frontend desarrollado con NextJS.
- **`docker`**: Se encuentra el archivo docker-compose.yaml. Archivo de configuración para levantar todos los servicios necesarios.

## Requisitos Previos

Antes de empezar, asegúrate de tener instalados los siguientes componentes:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Configuración del Proyecto

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local utilizando el siguiente comando:

```bash
git clone https://github.com/camilollamas/pt-banco.git
cd pt-banco
```

### 2. Levantar los Servicios con Docker Compose

Ejecuta los siguientes comandos para construir y levantar los servicios:

```bash
cd docker
docker-compose up --build
```

Verifica que los contenedores estén corriendo:

```bash
docker ps
```

## Acceso a la Aplicación

### Frontend
Accede a la interfaz del usuario a través de tu navegador en la siguiente URL:

```bash
http://localhost:3000/login
```

### Backend
La API estará disponible en el puerto 3001:

```bash
http://localhost:3001
```

## Uso de la Aplicación

### Inicio de Sesión
Para comenzar a usar la aplicación, puedes iniciar sesión o registrarte accediendo a la siguiente ruta:

```bash
http://localhost:3000/login
```

#### Credenciales por Defecto:
- **Usuario:** admin
- **Contraseña:** admin

### Carga de Registros de Clientes y Creditos de prueba
Para cargar registros de clientes en la base de datos, realiza una petición `POST` a la siguiente dirección:

```bash
POST http://localhost:3000/clientes/cargar
POST http://localhost:3000/creditos/cargar
```

## Documentación de la API

La API cuenta con documentación interactiva generada con Swagger. Puedes acceder a ella en:

```bash
http://localhost:3001/api/
```

## Notas Adicionales

- Asegúrate de que los puertos 3000 y 3001 no estén siendo utilizados por otras aplicaciones.
- Si deseas personalizar la configuración de los contenedores o servicios, edita el archivo `docker-compose.yml`.

