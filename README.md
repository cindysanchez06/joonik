# Joonik - Sistema de Gestión de Sedes

Este proyecto es un sistema de gestión de sedes desarrollado con React (frontend) y Laravel Lumen (backend).

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- `frontend-joonik/`: Aplicación React con TypeScript
- `backend-joonik/`: API REST con Laravel Lumen (containerizado con Docker)

## Requisitos Previos

### Frontend
- Node.js (v14 o superior)
- npm o yarn

### Backend
- Docker
- Docker Compose

## Configuración del Frontend

1. Navega al directorio del frontend:
```bash
cd frontend-joonik
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Configura las variables de entorno en `.env`:
```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_API_KEY=tu_api_key
```

5. Inicia el servidor de desarrollo:
```bash
npm start
```

## Configuración del Backend (Docker)

1. Navega al directorio del backend:
```bash
cd backend-joonik
```

2. Construye y levanta los contenedores:
```bash
docker-compose up -d
```

3. Instala las dependencias dentro del contenedor:
```bash
docker-compose exec app composer install
```

4. Crea un archivo `.env` basado en `.env.example`:
```bash
docker-compose exec app cp .env.example .env
```

5. Genera la clave de la aplicación:
```bash
docker-compose exec app php artisan key:generate
```

6. Ejecuta las migraciones:
```bash
docker-compose exec app php artisan migrate
```

### Comandos Docker útiles

- Iniciar los contenedores:
```bash
docker-compose up -d
```

- Detener los contenedores:
```bash
docker-compose down
```

- Ver logs:
```bash
docker-compose logs -f
```

- Ejecutar comandos artisan:
```bash
docker-compose exec app php artisan [comando]
```

- Ejecutar tests:
```bash
docker-compose exec app vendor/bin/phpunit
```

## Scripts Disponibles

### Frontend

- `npm start`: Inicia el servidor de desarrollo
- `npm test`: Ejecuta los tests
- `npm run build`: Construye la aplicación para producción
- `npm run format`: Formatea el código con Prettier
- `npm run format:check`: Verifica el formato del código
- `npm run lint`: Ejecuta ESLint

### Backend

- `docker-compose up -d`: Inicia los contenedores
- `docker-compose down`: Detiene los contenedores
- `docker-compose exec app vendor/bin/phpunit`: Ejecuta los tests

## Tecnologías Utilizadas

### Frontend
- React
- TypeScript
- Material UI
- Axios
- React Testing Library
- Jest
- Prettier
- ESLint

### Backend
- Laravel Lumen
- PHP
- MySQL
- Docker
- Docker Compose
- PHPUnit

## Estructura de la API

### Endpoints

- `GET /api/locations`: Obtiene todas las sedes

## Autenticación

La API utiliza autenticación Bearer token. Para acceder a los endpoints protegidos, incluye el token en el header:

```
Authorization: Bearer tu_token
```
