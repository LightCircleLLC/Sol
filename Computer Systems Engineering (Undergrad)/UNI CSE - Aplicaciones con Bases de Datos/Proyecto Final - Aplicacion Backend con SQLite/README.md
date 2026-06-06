# CDAS Backend — Content Distribution Automation System

API REST desarrollada con **Node.js + Express + Better-SQLite3** como capa de persistencia para un sistema de automatización de distribución de contenido multimedia.

---

## Índice

1. [Datos del Equipo](#datos-del-equipo)
2. [Descripción del Proyecto](#descripción-del-proyecto)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación y Ejecución](#instalación-y-ejecución)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Variables de Entorno](#variables-de-entorno)
7. [Endpoints de la API](#endpoints-de-la-api)
8. [Base de Datos](#base-de-datos)
   - [Sentencias SQL de creación](#sentencias-sql-de-creación)
   - [Datos de ejemplo](#datos-de-ejemplo)

---

## Datos del Equipo

| Campo       | Detalle                                        |
|-------------|------------------------------------------------|
| Materia     | Aplicaciones con Bases de Datos                |
| Profesor    | Jesus Alejandro Flores Hernandez               |
| Integrante  | Jorge Fernández Reyna                          |
| Rol         | Jorge Fernández Reyna - Desarrollador Principal|
| Matrícula   | 144481                                         |
| Carrera     | Ingeniería en Sistemas Computacionales         |
| Repositorio | [GitHub](#)                                    |

---

## Descripción del Proyecto

El sistema **CDAS** (*Content Distribution Automation System*) monitorea fuentes de contenido externas como **Danbooru**, **Reddit**, **YouTube** y **Twitter/X**, y distribuye las publicaciones obtenidas a servidores de **Discord** mediante webhooks, orquestado por **N8N** en modalidad *self-hosted*.

Esta API REST gestiona la capa de persistencia del sistema: servidores Discord, canales, webhooks, fuentes de contenido, suscripciones, etiquetas, publicaciones, reglas de filtrado e historial de entregas. La base de datos es un archivo **SQLite** manejado con la librería **Better-SQLite3**.

---

## Requisitos Previos

- **Node.js** v24.16.0 LTS (requerido para `--env-file` & instalacion de dependencias)
- **npm** 11.13.0
- Sistema operativo: Windows 11

> **Importante:** Este proyecto ha sido desarrollado y probado utilizando Node.js v24.16.0 LTS y npm v11.13.0. El uso de versiones diferentes puede provocar errores durante la instalación de dependencias o al ejecutar el servidor. Para evitar problemas de compatibilidad, se recomienda utilizar exactamente las versiones indicadas.

---

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd cdas-backend-sqlite
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear y poblar la base de datos

Este comando crea el archivo `cdas.db` en la raíz del proyecto con todas las tablas y los datos de ejemplo:

```bash
npm run crear-db
```

### 4. Iniciar el servidor

Modo desarrollo con recarga automática (`node --watch`):

```bash
npm run dev
```

El servidor quedará disponible en: `http://localhost:3000`

### Scripts disponibles

| Comando          | Descripción                                              |
|------------------|----------------------------------------------------------|
| `npm run dev`    | Inicia el servidor con `node --watch --env-file=.env`   |
| `npm run crear-db` | Crea y puebla la base de datos SQLite                 |

> **Nota:** El archivo `.env` se carga automáticamente con la bandera `--env-file=.env`. No se usa el paquete `dotenv`.

---

## Estructura del Proyecto

```
cdas-backend-sqlite/
├── server.js                          ← Punto de entrada del servidor
├── crearDB.js                         ← Script raíz para crear la BD
├── package.json
├── .env                               ← Variables de entorno
├── .gitignore
├── README.md
└── src/
    ├── helpers/
    │   ├── crearDB.js                 ← Lógica de creación y población de BD
    │   └── getVariablesEntorno.js     ← Lectura de variables de entorno
    ├── models/
    │   ├── controller.db.sqlite.js    ← Controlador SQLite (open/run/get/all/close)
    │   ├── factory.controller.db.js   ← Fábrica del controlador de BD
    │   ├── model.servidores.js
    │   ├── model.canales.js
    │   ├── model.webhooks.js
    │   ├── model.fuentes.js
    │   ├── model.suscripciones.js
    │   ├── model.etiquetas.js
    │   ├── model.publicaciones.js
    │   ├── model.reglas.js
    │   └── model.entregas.js
    └── routers/
        ├── router.servidores.js
        ├── router.canales.js
        ├── router.webhooks.js
        ├── router.fuentes.js
        ├── router.suscripciones.js
        ├── router.etiquetas.js
        ├── router.publicaciones.js
        ├── router.reglas.js
        └── router.entregas.js
```

---

## Variables de Entorno

El archivo `.env` en la raíz del proyecto contiene:

```
PORT=3000
DB_PLATFORM="sqlite"
HOST="localhost"
DB_NAME="cdas.db"
USER=""
PASSWORD=""
```

| Variable      | Descripción                        | Valor por defecto |
|---------------|------------------------------------|-------------------|
| `PORT`        | Puerto del servidor HTTP           | `3000`            |
| `HOST`        | Host del servidor                  | `localhost`       |
| `DB_PLATFORM` | Plataforma de BD (`sqlite`)        | `sqlite`          |
| `DB_NAME`     | Nombre del archivo SQLite          | `cdas.db`         |

---

## Endpoints de la API

> **Base URL:** `http://localhost:3000`

### GET `/`
Retorna información del sistema y lista de rutas disponibles.

---

### Servidores Discord — `/servidor`

| Método | Endpoint          | Descripción                     |
|--------|-------------------|---------------------------------|
| GET    | `/servidor`       | Obtener todos los servidores    |
| GET    | `/servidor/:id`   | Obtener servidor por ID         |
| POST   | `/servidor`       | Crear nuevo servidor            |
| PUT    | `/servidor/:id`   | Actualizar servidor             |
| DELETE | `/servidor/:id`   | Eliminar servidor               |

---

### Canales Discord — `/canal`

| Método | Endpoint                         | Descripción                         |
|--------|----------------------------------|-------------------------------------|
| GET    | `/canal`                         | Obtener todos los canales           |
| GET    | `/canal/servidor/:id_servidor`   | Canales de un servidor específico   |
| GET    | `/canal/:id`                     | Obtener canal por ID                |
| POST   | `/canal`                         | Crear nuevo canal                   |
| PUT    | `/canal/:id`                     | Actualizar canal                    |
| DELETE | `/canal/:id`                     | Eliminar canal                      |

---

### Webhooks — `/webhook`

| Método | Endpoint         | Descripción                  |
|--------|------------------|------------------------------|
| GET    | `/webhook`       | Obtener todos los webhooks   |
| GET    | `/webhook/:id`   | Obtener webhook por ID       |
| POST   | `/webhook`       | Crear nuevo webhook          |
| PUT    | `/webhook/:id`   | Actualizar webhook           |
| DELETE | `/webhook/:id`   | Eliminar webhook             |

---

### Fuentes de Contenido — `/fuente`

| Método | Endpoint               | Descripción                        |
|--------|------------------------|------------------------------------|
| GET    | `/fuente`              | Obtener todas las fuentes          |
| GET    | `/fuente/tipo/:tipo`   | Filtrar fuentes por tipo           |
| GET    | `/fuente/:id`          | Obtener fuente por ID              |
| POST   | `/fuente`              | Crear nueva fuente                 |
| PUT    | `/fuente/:id`          | Actualizar fuente                  |
| DELETE | `/fuente/:id`          | Eliminar fuente                    |

> `tipo` acepta: `danbooru` | `reddit` | `youtube` | `twitter`

---

### Suscripciones — `/suscripcion`

| Método | Endpoint                    | Descripción                              |
|--------|-----------------------------|------------------------------------------|
| GET    | `/suscripcion`              | Obtener todas las suscripciones          |
| GET    | `/suscripcion/:id/reglas`   | Reglas de filtro de la suscripción       |
| GET    | `/suscripcion/:id`          | Obtener suscripción por ID               |
| POST   | `/suscripcion`              | Crear nueva suscripción                  |
| PUT    | `/suscripcion/:id`          | Actualizar suscripción                   |
| DELETE | `/suscripcion/:id`          | Eliminar suscripción                     |

---

### Etiquetas — `/etiqueta`

| Método | Endpoint                          | Descripción                       |
|--------|-----------------------------------|-----------------------------------|
| GET    | `/etiqueta`                       | Obtener todas las etiquetas       |
| GET    | `/etiqueta/categoria/:categoria`  | Filtrar etiquetas por categoría   |
| GET    | `/etiqueta/:id`                   | Obtener etiqueta por ID           |
| POST   | `/etiqueta`                       | Crear etiqueta (upsert por nombre)|
| PUT    | `/etiqueta/:id`                   | Actualizar etiqueta               |
| DELETE | `/etiqueta/:id`                   | Eliminar etiqueta                 |

> `categoria` acepta: `personaje` | `serie` | `artista` | `copyright` | `tipo_contenido` | `general` | `meta`

---

### Publicaciones — `/publicacion`

| Método | Endpoint                                     | Descripción                              |
|--------|----------------------------------------------|------------------------------------------|
| GET    | `/publicacion`                               | Obtener todas las publicaciones          |
| GET    | `/publicacion/:id/etiquetas`                 | Etiquetas de una publicación             |
| GET    | `/publicacion/:id`                           | Obtener publicación por ID               |
| POST   | `/publicacion/:id/etiquetas/:id_etiqueta`    | Agregar etiqueta a publicación           |
| DELETE | `/publicacion/:id/etiquetas/:id_etiqueta`    | Remover etiqueta de publicación          |
| POST   | `/publicacion`                               | Crear nueva publicación                  |
| PUT    | `/publicacion/:id`                           | Actualizar publicación                   |
| DELETE | `/publicacion/:id`                           | Eliminar publicación                     |

---

### Reglas de Filtro — `/regla`

| Método | Endpoint       | Descripción                      |
|--------|----------------|----------------------------------|
| GET    | `/regla`       | Obtener todas las reglas         |
| GET    | `/regla/:id`   | Obtener regla por ID             |
| POST   | `/regla`       | Crear nueva regla                |
| PUT    | `/regla/:id`   | Actualizar regla                 |
| DELETE | `/regla/:id`   | Eliminar regla                   |

> `tipo_regla` acepta: `incluir_etiqueta` | `excluir_etiqueta` | `min_puntuacion` | `solo_imagenes`

---

### Entregas — `/entrega`

| Método | Endpoint              | Descripción                                  |
|--------|-----------------------|----------------------------------------------|
| GET    | `/entrega`            | Obtener todas las entregas                   |
| GET    | `/entrega/fallidas`   | Entregas con estado `fallido` o `reintento`  |
| GET    | `/entrega/:id`        | Obtener entrega por ID                       |
| POST   | `/entrega`            | Registrar nuevo intento de entrega           |
| PUT    | `/entrega/:id`        | Actualizar estado de entrega                 |

---

## Base de Datos

El sistema usa un archivo SQLite (`cdas.db`) con 10 tablas organizadas en el esquema CDAS. Los valores `BOOLEAN` se almacenan como `INTEGER` (1 = activo, 0 = inactivo). Las fechas se almacenan como `TEXT` en formato ISO 8601.

### Sentencias SQL de creación

```sql
-- Habilitar llaves foráneas en SQLite
PRAGMA foreign_keys = ON;

-- 1. servidores_discord
CREATE TABLE servidores_discord (
    id_servidor       INTEGER PRIMARY KEY,
    discord_guild_id  TEXT    NOT NULL UNIQUE,
    nombre            TEXT    NOT NULL,
    descripcion       TEXT,
    activo            INTEGER NOT NULL DEFAULT 1,
    fecha_registro    TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- 2. canales_discord
CREATE TABLE canales_discord (
    id_canal           INTEGER PRIMARY KEY,
    id_servidor        INTEGER NOT NULL,
    discord_channel_id TEXT    NOT NULL UNIQUE,
    nombre_canal       TEXT    NOT NULL,
    tipo_canal         TEXT    NOT NULL DEFAULT 'texto'
                           CHECK(tipo_canal IN ('texto','anuncio','foro','hilo')),
    activo             INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (id_servidor) REFERENCES servidores_discord(id_servidor)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. webhooks
CREATE TABLE webhooks (
    id_webhook           INTEGER PRIMARY KEY,
    id_canal             INTEGER NOT NULL,
    nombre               TEXT    NOT NULL,
    url_webhook          TEXT    NOT NULL UNIQUE,
    activo               INTEGER NOT NULL DEFAULT 1,
    fecha_creacion       TEXT    NOT NULL DEFAULT (datetime('now')),
    fecha_ultima_entrega TEXT,
    FOREIGN KEY (id_canal) REFERENCES canales_discord(id_canal)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. fuentes_contenido
CREATE TABLE fuentes_contenido (
    id_fuente      INTEGER PRIMARY KEY,
    nombre         TEXT    NOT NULL,
    tipo_fuente    TEXT    NOT NULL
                       CHECK(tipo_fuente IN ('danbooru','reddit','youtube','twitter')),
    url_base       TEXT    NOT NULL,
    descripcion    TEXT,
    activo         INTEGER NOT NULL DEFAULT 1,
    fecha_registro TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- 5. suscripciones
CREATE TABLE suscripciones (
    id_suscripcion         INTEGER PRIMARY KEY,
    id_fuente              INTEGER NOT NULL,
    id_webhook             INTEGER NOT NULL,
    parametro_busqueda     TEXT    NOT NULL,
    intervalo_verificacion INTEGER NOT NULL DEFAULT 30
                               CHECK(intervalo_verificacion >= 5),
    activo                 INTEGER NOT NULL DEFAULT 1,
    fecha_creacion         TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (id_fuente)  REFERENCES fuentes_contenido(id_fuente),
    FOREIGN KEY (id_webhook) REFERENCES webhooks(id_webhook),
    UNIQUE(id_fuente, id_webhook, parametro_busqueda)
);

-- 6. etiquetas
CREATE TABLE etiquetas (
    id_etiqueta     INTEGER PRIMARY KEY,
    nombre_etiqueta TEXT    NOT NULL UNIQUE,
    categoria       TEXT    NOT NULL DEFAULT 'general'
                        CHECK(categoria IN (
                            'personaje','serie','artista','copyright',
                            'tipo_contenido','general','meta'
                        ))
);

-- 7. publicaciones
CREATE TABLE publicaciones (
    id_publicacion    INTEGER PRIMARY KEY,
    id_fuente         INTEGER NOT NULL,
    id_externo        TEXT    NOT NULL,
    titulo            TEXT,
    url_contenido     TEXT    NOT NULL,
    url_miniatura     TEXT,
    autor             TEXT,
    puntuacion        INTEGER DEFAULT 0,
    fecha_publicacion TEXT,
    fecha_registro    TEXT    NOT NULL DEFAULT (datetime('now')),
    hash_contenido    TEXT    UNIQUE,
    FOREIGN KEY (id_fuente) REFERENCES fuentes_contenido(id_fuente),
    UNIQUE(id_fuente, id_externo)
);

-- 8. publicacion_etiqueta
CREATE TABLE publicacion_etiqueta (
    id_publicacion INTEGER NOT NULL,
    id_etiqueta    INTEGER NOT NULL,
    PRIMARY KEY (id_publicacion, id_etiqueta),
    FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id_publicacion)
        ON DELETE CASCADE,
    FOREIGN KEY (id_etiqueta) REFERENCES etiquetas(id_etiqueta)
);

-- 9. reglas_filtro
CREATE TABLE reglas_filtro (
    id_regla       INTEGER PRIMARY KEY,
    id_suscripcion INTEGER NOT NULL,
    tipo_regla     TEXT    NOT NULL
                       CHECK(tipo_regla IN (
                           'incluir_etiqueta','excluir_etiqueta',
                           'min_puntuacion','solo_imagenes'
                       )),
    valor_regla    TEXT    NOT NULL,
    activo         INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (id_suscripcion) REFERENCES suscripciones(id_suscripcion)
        ON DELETE CASCADE
);

-- 10. entregas
CREATE TABLE entregas (
    id_entrega       INTEGER PRIMARY KEY,
    id_publicacion   INTEGER NOT NULL,
    id_webhook       INTEGER NOT NULL,
    estado           TEXT    NOT NULL DEFAULT 'pendiente'
                         CHECK(estado IN ('pendiente','exitoso','fallido','reintento')),
    codigo_respuesta INTEGER,
    mensaje_error    TEXT,
    intentos         INTEGER NOT NULL DEFAULT 0,
    fecha_intento    TEXT    NOT NULL DEFAULT (datetime('now')),
    fecha_exitoso    TEXT,
    FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id_publicacion),
    FOREIGN KEY (id_webhook)     REFERENCES webhooks(id_webhook)
);

-- Índices de optimización
CREATE INDEX idx_pub_fuente_externo ON publicaciones(id_fuente, id_externo);
CREATE INDEX idx_ent_publicacion    ON entregas(id_publicacion);
CREATE INDEX idx_ent_estado        ON entregas(estado);
CREATE INDEX idx_sus_fuente_activo ON suscripciones(id_fuente, activo);
CREATE INDEX idx_pe_etiqueta       ON publicacion_etiqueta(id_etiqueta);
```

### Datos de ejemplo

Los siguientes registros se insertan automáticamente al ejecutar `npm run crear-db`:

```sql
-- Servidores de Discord (3 registros)
INSERT INTO servidores_discord (discord_guild_id, nombre, descripcion) VALUES
    ('987654321098765432', 'Servidor Principal', 'Servidor de producción para feeds'),
    ('876543210987654321', 'Servidor de Pruebas', 'Entorno de pruebas'),
    ('765432109876543210', 'Servidor Comunidad',  'Servidor con canales temáticos');

-- Canales de Discord (6 registros)
INSERT INTO canales_discord (id_servidor, discord_channel_id, nombre_canal, tipo_canal) VALUES
    (1, '111122223333444455', 'danbooru-azur-lane',  'texto'),
    (1, '222233334444555566', 'danbooru-hololive',   'texto'),
    (1, '333344445555666677', 'reddit-noticias',     'texto'),
    (1, '444455556666777788', 'youtube-tecnologia',  'texto'),
    (2, '555566667777888899', 'pruebas-general',     'texto'),
    (3, '666677778888999900', 'twitter-feed',        'texto');

-- Webhooks (5 registros)
INSERT INTO webhooks (id_canal, nombre, url_webhook) VALUES
    (1, 'WH Danbooru AL',   'https://discord.com/api/webhooks/11112222/TOKEN_AL'),
    (2, 'WH Danbooru Holo', 'https://discord.com/api/webhooks/22223333/TOKEN_HOLO'),
    (3, 'WH Reddit News',   'https://discord.com/api/webhooks/33334444/TOKEN_NEWS'),
    (4, 'WH YouTube Tech',  'https://discord.com/api/webhooks/44445555/TOKEN_YT'),
    (5, 'WH Pruebas',       'https://discord.com/api/webhooks/55556666/TOKEN_TEST');

-- Fuentes de contenido (4 registros)
INSERT INTO fuentes_contenido (nombre, tipo_fuente, url_base, descripcion) VALUES
    ('Danbooru',  'danbooru', 'https://danbooru.donmai.us', 'Repositorio de arte digital etiquetado'),
    ('Reddit',    'reddit',   'https://www.reddit.com',     'Agregador de noticias y comunidades'),
    ('YouTube',   'youtube',  'https://www.youtube.com',    'Plataforma de video'),
    ('Twitter/X', 'twitter',  'https://nitter.net',         'Red social vía Nitter RSS');

-- Suscripciones (5 registros)
INSERT INTO suscripciones (id_fuente, id_webhook, parametro_busqueda, intervalo_verificacion) VALUES
    (1, 1, 'azur_lane',  15),
    (1, 2, 'hololive',   20),
    (2, 3, 'worldnews',  10),
    (2, 3, 'technology', 15),
    (3, 4, 'UCBcRF18a7Qf58cMAttxzz7c', 30);

-- Etiquetas (12 registros)
INSERT INTO etiquetas (nombre_etiqueta, categoria) VALUES
    ('azur_lane',           'copyright'),
    ('hololive',            'copyright'),
    ('1girl',               'tipo_contenido'),
    ('safe',                'tipo_contenido'),
    ('explicit',            'tipo_contenido'),
    ('ayanami_(azur_lane)', 'personaje'),
    ('laffey_(azur_lane)',  'personaje'),
    ('gawr_gura',           'personaje'),
    ('highres',             'meta'),
    ('fanart',              'general'),
    ('technology',          'general'),
    ('worldnews',           'general');

-- Publicaciones (6 registros)
INSERT INTO publicaciones
    (id_fuente, id_externo, titulo, url_contenido, url_miniatura, autor, puntuacion, fecha_publicacion, hash_contenido)
VALUES
    (1, '7654321', 'Ayanami - Azur Lane Commission',
     'https://danbooru.donmai.us/posts/7654321',
     'https://cdn.donmai.us/sample/ab/cd/sample-abcd1234.jpg',
     'artista_a', 312, '2025-03-01 14:32:00', 'hash_aabbcc1111'),

    (1, '7654322', 'Laffey - Azur Lane Fanart',
     'https://danbooru.donmai.us/posts/7654322',
     'https://cdn.donmai.us/sample/ef/gh/sample-efgh5678.jpg',
     'artista_b', 201, '2025-03-02 09:15:00', 'hash_bbccdd2222'),

    (1, '7654323', 'Gawr Gura - Hololive Art',
     'https://danbooru.donmai.us/posts/7654323',
     'https://cdn.donmai.us/sample/ij/kl/sample-ijkl9012.jpg',
     'artista_c', 178, '2025-03-03 11:00:00', 'hash_ccddeeff33'),

    (2, 't3_abc123', 'Major AI breakthrough announced',
     'https://www.reddit.com/r/technology/comments/abc123',
     NULL, 'u/tech_poster', 8920, '2025-03-04 18:00:00', 'hash_ddeeff4444'),

    (2, 't3_def456', 'Global climate summit reaches agreement',
     'https://www.reddit.com/r/worldnews/comments/def456',
     NULL, 'u/news_poster', 5430, '2025-03-05 10:30:00', 'hash_eeff005555'),

    (3, 'dQw4w9WgXcQ', 'Understanding Neural Networks in 10 Minutes',
     'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
     'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
     'TechChannel', 3201, '2025-03-06 16:00:00', 'hash_ff00116666');

-- Relaciones publicacion_etiqueta (16 registros)
INSERT INTO publicacion_etiqueta (id_publicacion, id_etiqueta) VALUES
    (1,1),(1,3),(1,4),(1,6),(1,9),   -- Ayanami: azur_lane,1girl,safe,ayanami,highres
    (2,1),(2,3),(2,4),(2,7),(2,10),  -- Laffey:  azur_lane,1girl,safe,laffey,fanart
    (3,2),(3,3),(3,4),(3,8),(3,9),   -- Gura:    hololive,1girl,safe,gawr_gura,highres
    (4,11),(5,12),(6,11);            -- Reddit tech, Reddit news, YouTube tech

-- Reglas de filtro (10 registros)
INSERT INTO reglas_filtro (id_suscripcion, tipo_regla, valor_regla) VALUES
    (1, 'incluir_etiqueta', 'safe'),
    (1, 'excluir_etiqueta', 'explicit'),
    (1, 'min_puntuacion',   '100'),
    (1, 'solo_imagenes',    'true'),
    (2, 'incluir_etiqueta', 'safe'),
    (2, 'excluir_etiqueta', 'explicit'),
    (2, 'solo_imagenes',    'true'),
    (3, 'min_puntuacion',   '100'),
    (4, 'min_puntuacion',   '500'),
    (5, 'solo_imagenes',    'true');

-- Entregas (7 registros)
INSERT INTO entregas
    (id_publicacion, id_webhook, estado, codigo_respuesta, mensaje_error, intentos, fecha_exitoso)
VALUES
    (1, 1, 'exitoso',   204, NULL, 1, '2025-03-01 14:35:02'),
    (2, 1, 'exitoso',   204, NULL, 1, '2025-03-02 09:18:01'),
    (3, 2, 'exitoso',   204, NULL, 1, '2025-03-03 11:05:01'),
    (4, 3, 'fallido',   429, 'Too Many Requests: retry_after 2.5s', 1, NULL),
    (4, 3, 'exitoso',   204, NULL, 2, '2025-03-04 18:05:06'),
    (5, 3, 'exitoso',   204, NULL, 1, '2025-03-05 10:35:01'),
    (6, 4, 'reintento', 500, 'Internal Server Error - Discord side', 2, NULL);
```
