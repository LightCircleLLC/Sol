# CDAS Backend — Content Distribution Automation System

API REST desarrollada con **Node.js + Express + PostgreSQL** como capa de persistencia externa para un sistema de automatización de distribución de contenido multimedia orquestado con N8N.

---

## Datos del Proyecto

| Campo      | Detalle                                      |
|------------|----------------------------------------------|
| Materia    | Sistemas Cliente-Servidor 1 / Bases de Datos |
| Profesor   | —                                            |
| Integrante | —                                            |
| Matrícula  | —                                            |
| Repositorio | [GitHub](#)                                 |

---

## Descripción

El sistema **CDAS** monitorea fuentes de contenido externas (Danbooru, Reddit, YouTube y Twitter/X) y distribuye las publicaciones obtenidas a servidores de Discord mediante webhooks. Esta API REST permite gestionar toda la configuración del sistema: servidores Discord, canales, webhooks, fuentes, suscripciones, etiquetas, reglas de filtro, publicaciones y el historial de entregas.

La base de datos corre en un contenedor Docker de PostgreSQL independiente del contenedor N8N, conectándose a través del módulo nativo de PostgreSQL de N8N.

---

## Requisitos

- Node.js 18+
- PostgreSQL 15+ (o Docker con la imagen oficial)
- npm

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd cdas-backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL

# 4. Crear y poblar la base de datos
npm run db:setup

# 5. Iniciar el servidor
npm run dev        # Con hot-reload (node --watch)
npm start          # Producción
```

---

## Estructura del Proyecto

```
cdas-backend/
├── db/
│   └── setup.js              ← Script de creación y población de BD
├── src/
│   ├── db/
│   │   └── connection.js     ← Pool de conexiones PostgreSQL
│   ├── controllers/          ← Lógica de negocio por entidad
│   │   ├── servidores.controller.js
│   │   ├── canales.controller.js
│   │   ├── webhooks.controller.js
│   │   ├── fuentes.controller.js
│   │   ├── suscripciones.controller.js
│   │   ├── etiquetas.controller.js
│   │   ├── publicaciones.controller.js
│   │   ├── reglas.controller.js
│   │   └── entregas.controller.js
│   └── routes/               ← Definición de endpoints por entidad
│       ├── servidores.routes.js
│       ├── canales.routes.js
│       ├── webhooks.routes.js
│       ├── fuentes.routes.js
│       ├── suscripciones.routes.js
│       ├── etiquetas.routes.js
│       ├── publicaciones.routes.js
│       ├── reglas.routes.js
│       └── entregas.routes.js
├── index.js                  ← Punto de entrada del servidor
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## Scripts Disponibles

| Comando            | Descripción                                      |
|--------------------|--------------------------------------------------|
| `npm start`        | Inicia el servidor en modo producción            |
| `npm run dev`      | Inicia con hot-reload (`node --watch index.js`)  |
| `npm run db:setup` | Crea el esquema y puebla la BD con datos de prueba |

---

## Variables de Entorno

| Variable      | Descripción                      | Default       |
|---------------|----------------------------------|---------------|
| `PORT`        | Puerto del servidor HTTP         | `3000`        |
| `NODE_ENV`    | Entorno de ejecución             | `development` |
| `DB_HOST`     | Host de PostgreSQL               | `localhost`   |
| `DB_PORT`     | Puerto de PostgreSQL             | `5432`        |
| `DB_NAME`     | Nombre de la base de datos       | `cdas_db`     |
| `DB_USER`     | Usuario de PostgreSQL            | `postgres`    |
| `DB_PASSWORD` | Contraseña de PostgreSQL         | `postgres`    |

---

## Endpoints de la API

> **Base URL:** `http://localhost:3000/api`

### GET `/`
Retorna información general del sistema y lista de endpoints disponibles.

---

### Servidores Discord — `/api/servidores`

| Método | Endpoint               | Descripción                          |
|--------|------------------------|--------------------------------------|
| GET    | `/api/servidores`      | Obtener todos los servidores Discord |
| GET    | `/api/servidores/:id`  | Obtener un servidor por ID           |
| POST   | `/api/servidores`      | Registrar un nuevo servidor          |
| PUT    | `/api/servidores/:id`  | Actualizar datos de un servidor      |
| DELETE | `/api/servidores/:id`  | Eliminar un servidor                 |

**Body POST/PUT:**
```json
{
  "discord_guild_id": "987654321098765432",
  "nombre": "Mi Servidor",
  "descripcion": "Servidor principal",
  "activo": true
}
```

---

### Canales Discord — `/api/canales`

| Método | Endpoint                              | Descripción                              |
|--------|---------------------------------------|------------------------------------------|
| GET    | `/api/canales`                        | Obtener todos los canales                |
| GET    | `/api/canales/:id`                    | Obtener un canal por ID                  |
| GET    | `/api/canales/servidor/:id_servidor`  | Obtener canales de un servidor específico|
| POST   | `/api/canales`                        | Registrar un nuevo canal                 |
| PUT    | `/api/canales/:id`                    | Actualizar datos de un canal             |
| DELETE | `/api/canales/:id`                    | Eliminar un canal                        |

**Body POST/PUT:**
```json
{
  "id_servidor": 1,
  "discord_channel_id": "111122223333444455",
  "nombre_canal": "danbooru-feed",
  "tipo_canal": "texto",
  "activo": true
}
```

---

### Webhooks — `/api/webhooks`

| Método | Endpoint              | Descripción                     |
|--------|-----------------------|---------------------------------|
| GET    | `/api/webhooks`       | Obtener todos los webhooks      |
| GET    | `/api/webhooks/:id`   | Obtener un webhook por ID       |
| POST   | `/api/webhooks`       | Registrar un nuevo webhook      |
| PUT    | `/api/webhooks/:id`   | Actualizar un webhook           |
| DELETE | `/api/webhooks/:id`   | Eliminar un webhook             |

**Body POST/PUT:**
```json
{
  "id_canal": 1,
  "nombre": "WH Danbooru Principal",
  "url_webhook": "https://discord.com/api/webhooks/ID/TOKEN",
  "activo": true
}
```

---

### Fuentes de Contenido — `/api/fuentes`

| Método | Endpoint                    | Descripción                             |
|--------|-----------------------------|-----------------------------------------|
| GET    | `/api/fuentes`              | Obtener todas las fuentes               |
| GET    | `/api/fuentes/:id`          | Obtener una fuente por ID               |
| GET    | `/api/fuentes/tipo/:tipo`   | Filtrar fuentes por tipo                |
| POST   | `/api/fuentes`              | Registrar una nueva fuente              |
| PUT    | `/api/fuentes/:id`          | Actualizar una fuente                   |
| DELETE | `/api/fuentes/:id`          | Eliminar una fuente                     |

**Body POST/PUT:**
```json
{
  "nombre": "Danbooru",
  "tipo_fuente": "danbooru",
  "url_base": "https://danbooru.donmai.us",
  "descripcion": "Repositorio de arte digital",
  "activo": true
}
```
> `tipo_fuente` acepta: `danbooru` | `reddit` | `youtube` | `twitter`

---

### Suscripciones — `/api/suscripciones`

| Método | Endpoint                        | Descripción                                 |
|--------|---------------------------------|---------------------------------------------|
| GET    | `/api/suscripciones`            | Obtener todas las suscripciones             |
| GET    | `/api/suscripciones/:id`        | Obtener una suscripción por ID              |
| GET    | `/api/suscripciones/:id/reglas` | Obtener las reglas de filtro de la suscripción |
| POST   | `/api/suscripciones`            | Crear una nueva suscripción                 |
| PUT    | `/api/suscripciones/:id`        | Actualizar una suscripción                  |
| DELETE | `/api/suscripciones/:id`        | Eliminar una suscripción                    |

**Body POST/PUT:**
```json
{
  "id_fuente": 1,
  "id_webhook": 1,
  "parametro_busqueda": "azur_lane",
  "intervalo_verificacion": 15,
  "activo": true
}
```

---

### Etiquetas — `/api/etiquetas`

| Método | Endpoint                              | Descripción                              |
|--------|---------------------------------------|------------------------------------------|
| GET    | `/api/etiquetas`                      | Obtener todas las etiquetas              |
| GET    | `/api/etiquetas/:id`                  | Obtener una etiqueta por ID              |
| GET    | `/api/etiquetas/categoria/:categoria` | Filtrar etiquetas por categoría          |
| POST   | `/api/etiquetas`                      | Crear una etiqueta (upsert por nombre)   |
| PUT    | `/api/etiquetas/:id`                  | Actualizar una etiqueta                  |
| DELETE | `/api/etiquetas/:id`                  | Eliminar una etiqueta                    |

**Body POST/PUT:**
```json
{
  "nombre_etiqueta": "azur_lane",
  "categoria": "copyright"
}
```
> `categoria` acepta: `personaje` | `serie` | `artista` | `copyright` | `tipo_contenido` | `general` | `meta`

---

### Publicaciones — `/api/publicaciones`

| Método | Endpoint                                      | Descripción                                |
|--------|-----------------------------------------------|--------------------------------------------|
| GET    | `/api/publicaciones`                          | Listar publicaciones (paginado: `?limit=&offset=`) |
| GET    | `/api/publicaciones/:id`                      | Obtener una publicación por ID             |
| GET    | `/api/publicaciones/:id/etiquetas`            | Obtener etiquetas de una publicación       |
| POST   | `/api/publicaciones/:id/etiquetas/:id_etiqueta` | Agregar etiqueta a una publicación       |
| DELETE | `/api/publicaciones/:id/etiquetas/:id_etiqueta` | Remover etiqueta de una publicación      |
| POST   | `/api/publicaciones`                          | Registrar una nueva publicación            |
| PUT    | `/api/publicaciones/:id`                      | Actualizar una publicación                 |
| DELETE | `/api/publicaciones/:id`                      | Eliminar una publicación                   |

**Body POST:**
```json
{
  "id_fuente": 1,
  "id_externo": "7654321",
  "titulo": "Ayanami - Azur Lane",
  "url_contenido": "https://danbooru.donmai.us/posts/7654321",
  "url_miniatura": "https://cdn.donmai.us/sample/sample.jpg",
  "autor": "artista_a",
  "puntuacion": 312,
  "fecha_publicacion": "2025-03-01T14:32:00.000Z",
  "hash_contenido": "aabbcc..."
}
```

---

### Reglas de Filtro — `/api/reglas`

| Método | Endpoint          | Descripción                            |
|--------|-------------------|----------------------------------------|
| GET    | `/api/reglas`     | Obtener todas las reglas de filtro     |
| GET    | `/api/reglas/:id` | Obtener una regla por ID               |
| POST   | `/api/reglas`     | Crear una nueva regla de filtro        |
| PUT    | `/api/reglas/:id` | Actualizar una regla                   |
| DELETE | `/api/reglas/:id` | Eliminar una regla                     |

**Body POST/PUT:**
```json
{
  "id_suscripcion": 1,
  "tipo_regla": "incluir_etiqueta",
  "valor_regla": "safe",
  "activo": true
}
```
> `tipo_regla` acepta: `incluir_etiqueta` | `excluir_etiqueta` | `min_puntuacion` | `solo_imagenes`

---

### Entregas — `/api/entregas`

| Método | Endpoint               | Descripción                                         |
|--------|------------------------|-----------------------------------------------------|
| GET    | `/api/entregas`        | Listar entregas (paginado: `?limit=&offset=`)       |
| GET    | `/api/entregas/:id`    | Obtener una entrega por ID                          |
| GET    | `/api/entregas/fallidas` | Listar entregas con estado `fallido` o `reintento`|
| GET    | `/api/entregas/stats`  | Estadísticas de entregas agrupadas por estado       |
| POST   | `/api/entregas`        | Registrar un nuevo intento de entrega               |
| PUT    | `/api/entregas/:id`    | Actualizar el estado de una entrega                 |

**Body POST:**
```json
{
  "id_publicacion": 1,
  "id_webhook": 1,
  "estado": "pendiente"
}
```

**Body PUT:**
```json
{
  "estado": "exitoso",
  "codigo_respuesta": 204,
  "mensaje_error": null
}
```
> `estado` acepta: `pendiente` | `exitoso` | `fallido` | `reintento`

---

## Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | 18+ | Runtime de JavaScript |
| Express | 4.x | Framework HTTP |
| pg (node-postgres) | 8.x | Driver de PostgreSQL |
| dotenv | 16.x | Gestión de variables de entorno |
| PostgreSQL | 15+ | Base de datos relacional |
| Docker | — | Contenedores para BD y N8N |

---

## Base de Datos

El sistema usa el esquema `cdas` dentro de la base de datos `cdas_db`. Las 10 tablas del modelo son:

1. `servidores_discord` — Servidores de Discord de destino
2. `canales_discord` — Canales dentro de cada servidor
3. `webhooks` — URLs de webhooks por canal
4. `fuentes_contenido` — Plataformas externas monitoreadas
5. `suscripciones` — Vínculos fuente ↔ webhook
6. `etiquetas` — Catálogo normalizado de tags
7. `publicaciones` — Contenido recuperado de las fuentes
8. `publicacion_etiqueta` — Relación M:N publicaciones ↔ etiquetas
9. `reglas_filtro` — Condiciones de elegibilidad por suscripción
10. `entregas` — Historial de envíos a Discord
