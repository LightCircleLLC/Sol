/**
 * db/setup.js
 * Script para crear y poblar la base de datos CDAS.
 * Uso: npm run db:setup
 */

import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

const client = new Client({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'cdas_db',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

// ── Utilidades ──────────────────────────────────────────────

const run = async (sql, desc) => {
  try {
    await client.query(sql);
    console.log(`  ✅ ${desc}`);
  } catch (err) {
    console.error(`  ❌ ${desc}\n     ${err.message}`);
    throw err;
  }
};

// ── Schema ───────────────────────────────────────────────────

const createSchema = `
  CREATE SCHEMA IF NOT EXISTS cdas AUTHORIZATION CURRENT_USER;
  SET search_path TO cdas, public;
`;

// ── Tablas ───────────────────────────────────────────────────

const createTables = `
SET search_path TO cdas, public;

-- 1. servidores_discord
CREATE TABLE IF NOT EXISTS cdas.servidores_discord (
  id_servidor      SERIAL       PRIMARY KEY,
  discord_guild_id VARCHAR(50)  NOT NULL UNIQUE,
  nombre           VARCHAR(100) NOT NULL,
  descripcion      TEXT,
  activo           BOOLEAN      NOT NULL DEFAULT TRUE,
  fecha_registro   TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- 2. canales_discord
CREATE TABLE IF NOT EXISTS cdas.canales_discord (
  id_canal           SERIAL       PRIMARY KEY,
  id_servidor        INTEGER      NOT NULL,
  discord_channel_id VARCHAR(50)  NOT NULL UNIQUE,
  nombre_canal       VARCHAR(100) NOT NULL,
  tipo_canal         VARCHAR(30)  NOT NULL DEFAULT 'texto'
                       CHECK (tipo_canal IN ('texto','anuncio','foro','hilo')),
  activo             BOOLEAN      NOT NULL DEFAULT TRUE,
  CONSTRAINT fk_canal_servidor
    FOREIGN KEY (id_servidor) REFERENCES cdas.servidores_discord (id_servidor)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. webhooks
CREATE TABLE IF NOT EXISTS cdas.webhooks (
  id_webhook           SERIAL       PRIMARY KEY,
  id_canal             INTEGER      NOT NULL,
  nombre               VARCHAR(100) NOT NULL,
  url_webhook          TEXT         NOT NULL UNIQUE,
  activo               BOOLEAN      NOT NULL DEFAULT TRUE,
  fecha_creacion       TIMESTAMP    NOT NULL DEFAULT NOW(),
  fecha_ultima_entrega TIMESTAMP,
  CONSTRAINT fk_webhook_canal
    FOREIGN KEY (id_canal) REFERENCES cdas.canales_discord (id_canal)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. fuentes_contenido
CREATE TABLE IF NOT EXISTS cdas.fuentes_contenido (
  id_fuente      SERIAL       PRIMARY KEY,
  nombre         VARCHAR(100) NOT NULL,
  tipo_fuente    VARCHAR(30)  NOT NULL
                   CHECK (tipo_fuente IN ('danbooru','reddit','youtube','twitter')),
  url_base       TEXT         NOT NULL,
  descripcion    TEXT,
  activo         BOOLEAN      NOT NULL DEFAULT TRUE,
  fecha_registro TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- 5. suscripciones
CREATE TABLE IF NOT EXISTS cdas.suscripciones (
  id_suscripcion         SERIAL        PRIMARY KEY,
  id_fuente              INTEGER       NOT NULL,
  id_webhook             INTEGER       NOT NULL,
  parametro_busqueda     VARCHAR(255)  NOT NULL,
  intervalo_verificacion INTEGER       NOT NULL DEFAULT 30
                           CHECK (intervalo_verificacion >= 5),
  activo                 BOOLEAN       NOT NULL DEFAULT TRUE,
  fecha_creacion         TIMESTAMP     NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_sus_fuente
    FOREIGN KEY (id_fuente)  REFERENCES cdas.fuentes_contenido (id_fuente)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_sus_webhook
    FOREIGN KEY (id_webhook) REFERENCES cdas.webhooks (id_webhook)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT uq_sus_fuente_webhook_param
    UNIQUE (id_fuente, id_webhook, parametro_busqueda)
);

-- 6. etiquetas
CREATE TABLE IF NOT EXISTS cdas.etiquetas (
  id_etiqueta     SERIAL       PRIMARY KEY,
  nombre_etiqueta VARCHAR(150) NOT NULL UNIQUE,
  categoria       VARCHAR(50)  NOT NULL DEFAULT 'general'
                    CHECK (categoria IN
                      ('personaje','serie','artista','copyright',
                       'tipo_contenido','general','meta'))
);

-- 7. publicaciones
CREATE TABLE IF NOT EXISTS cdas.publicaciones (
  id_publicacion   SERIAL        PRIMARY KEY,
  id_fuente        INTEGER       NOT NULL,
  id_externo       VARCHAR(255)  NOT NULL,
  titulo           TEXT,
  url_contenido    TEXT          NOT NULL,
  url_miniatura    TEXT,
  autor            VARCHAR(255),
  puntuacion       INTEGER       DEFAULT 0,
  fecha_publicacion TIMESTAMP,
  fecha_registro   TIMESTAMP     NOT NULL DEFAULT NOW(),
  hash_contenido   VARCHAR(64)   UNIQUE,
  CONSTRAINT fk_pub_fuente
    FOREIGN KEY (id_fuente) REFERENCES cdas.fuentes_contenido (id_fuente)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT uq_pub_fuente_externa
    UNIQUE (id_fuente, id_externo)
);

-- 8. publicacion_etiqueta
CREATE TABLE IF NOT EXISTS cdas.publicacion_etiqueta (
  id_publicacion INTEGER NOT NULL,
  id_etiqueta    INTEGER NOT NULL,
  PRIMARY KEY (id_publicacion, id_etiqueta),
  CONSTRAINT fk_pe_pub
    FOREIGN KEY (id_publicacion) REFERENCES cdas.publicaciones (id_publicacion)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_pe_etq
    FOREIGN KEY (id_etiqueta)    REFERENCES cdas.etiquetas (id_etiqueta)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 9. reglas_filtro
CREATE TABLE IF NOT EXISTS cdas.reglas_filtro (
  id_regla       SERIAL        PRIMARY KEY,
  id_suscripcion INTEGER       NOT NULL,
  tipo_regla     VARCHAR(50)   NOT NULL
                   CHECK (tipo_regla IN
                     ('incluir_etiqueta','excluir_etiqueta',
                      'min_puntuacion','solo_imagenes')),
  valor_regla    VARCHAR(255)  NOT NULL,
  activo         BOOLEAN       NOT NULL DEFAULT TRUE,
  CONSTRAINT fk_regla_sus
    FOREIGN KEY (id_suscripcion) REFERENCES cdas.suscripciones (id_suscripcion)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- 10. entregas
CREATE TABLE IF NOT EXISTS cdas.entregas (
  id_entrega       SERIAL       PRIMARY KEY,
  id_publicacion   INTEGER      NOT NULL,
  id_webhook       INTEGER      NOT NULL,
  estado           VARCHAR(20)  NOT NULL DEFAULT 'pendiente'
                     CHECK (estado IN ('pendiente','exitoso','fallido','reintento')),
  codigo_respuesta INTEGER,
  mensaje_error    TEXT,
  intentos         INTEGER      NOT NULL DEFAULT 0,
  fecha_intento    TIMESTAMP    NOT NULL DEFAULT NOW(),
  fecha_exitoso    TIMESTAMP,
  CONSTRAINT fk_ent_pub
    FOREIGN KEY (id_publicacion) REFERENCES cdas.publicaciones (id_publicacion)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_ent_wh
    FOREIGN KEY (id_webhook)     REFERENCES cdas.webhooks (id_webhook)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_pub_fuente_externo   ON cdas.publicaciones (id_fuente, id_externo);
CREATE INDEX IF NOT EXISTS idx_pub_hash             ON cdas.publicaciones (hash_contenido) WHERE hash_contenido IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_ent_pub              ON cdas.entregas (id_publicacion);
CREATE INDEX IF NOT EXISTS idx_ent_webhook_estado   ON cdas.entregas (id_webhook, estado);
CREATE INDEX IF NOT EXISTS idx_ent_reintento        ON cdas.entregas (estado, intentos) WHERE estado IN ('fallido','reintento');
CREATE INDEX IF NOT EXISTS idx_sus_fuente_activo    ON cdas.suscripciones (id_fuente, activo);
CREATE INDEX IF NOT EXISTS idx_pe_etiqueta          ON cdas.publicacion_etiqueta (id_etiqueta);
CREATE INDEX IF NOT EXISTS idx_reglas_sus_activo    ON cdas.reglas_filtro (id_suscripcion, activo);
CREATE INDEX IF NOT EXISTS idx_ent_fecha            ON cdas.entregas (fecha_intento DESC);
`;

// ── Seed ─────────────────────────────────────────────────────

const seedData = `
SET search_path TO cdas, public;

-- Servidores
INSERT INTO cdas.servidores_discord (discord_guild_id, nombre, descripcion) VALUES
  ('987654321098765432', 'Servidor Principal',   'Servidor de producción para feeds de contenido'),
  ('876543210987654321', 'Servidor de Pruebas',  'Entorno de pruebas previo a producción'),
  ('765432109876543210', 'Servidor Comunidad',   'Servidor de comunidad con múltiples canales temáticos')
ON CONFLICT (discord_guild_id) DO NOTHING;

-- Canales
INSERT INTO cdas.canales_discord (id_servidor, discord_channel_id, nombre_canal, tipo_canal) VALUES
  (1, '111122223333444455', 'danbooru-azur-lane',   'texto'),
  (1, '222233334444555566', 'danbooru-hololive',    'texto'),
  (1, '333344445555666677', 'reddit-noticias',      'texto'),
  (1, '444455556666777788', 'youtube-tecnologia',   'texto'),
  (1, '555566667777888899', 'anuncios-generales',   'anuncio'),
  (2, '666677778888999900', 'pruebas-general',      'texto'),
  (3, '777788889999000011', 'twitter-feed',         'texto')
ON CONFLICT (discord_channel_id) DO NOTHING;

-- Webhooks
INSERT INTO cdas.webhooks (id_canal, nombre, url_webhook) VALUES
  (1, 'WH Danbooru AL',       'https://discord.com/api/webhooks/11112222/TOKEN_AL'),
  (2, 'WH Danbooru Holo',     'https://discord.com/api/webhooks/22223333/TOKEN_HOLO'),
  (3, 'WH Reddit News',       'https://discord.com/api/webhooks/33334444/TOKEN_NEWS'),
  (4, 'WH YouTube Tech',      'https://discord.com/api/webhooks/44445555/TOKEN_YT'),
  (6, 'WH Pruebas',           'https://discord.com/api/webhooks/55556666/TOKEN_TEST'),
  (7, 'WH Twitter Principal', 'https://discord.com/api/webhooks/66667777/TOKEN_TW')
ON CONFLICT (url_webhook) DO NOTHING;

-- Fuentes
INSERT INTO cdas.fuentes_contenido (nombre, tipo_fuente, url_base, descripcion) VALUES
  ('Danbooru',   'danbooru', 'https://danbooru.donmai.us',  'Repositorio de arte digital etiquetado (API REST)'),
  ('Reddit',     'reddit',   'https://www.reddit.com',      'Agregador de noticias y comunidades (RSS)'),
  ('YouTube',    'youtube',  'https://www.youtube.com',     'Plataforma de video (RSS por channel_id)'),
  ('Twitter/X',  'twitter',  'https://nitter.net',          'Red social via instancia Nitter (RSS)')
ON CONFLICT DO NOTHING;

-- Suscripciones
INSERT INTO cdas.suscripciones (id_fuente, id_webhook, parametro_busqueda, intervalo_verificacion) VALUES
  (1, 1, 'azur_lane',               15),
  (1, 2, 'hololive',                20),
  (2, 3, 'worldnews',               10),
  (2, 3, 'technology',              15),
  (3, 4, 'UCBcRF18a7Qf58cMAttxzz7c', 30),
  (4, 6, 'elonmusk',                 20)
ON CONFLICT (id_fuente, id_webhook, parametro_busqueda) DO NOTHING;

-- Etiquetas
INSERT INTO cdas.etiquetas (nombre_etiqueta, categoria) VALUES
  ('azur_lane',            'copyright'),
  ('hololive',             'copyright'),
  ('kantai_collection',    'copyright'),
  ('1girl',                'tipo_contenido'),
  ('2girls',               'tipo_contenido'),
  ('safe',                 'tipo_contenido'),
  ('explicit',             'tipo_contenido'),
  ('ayanami_(azur_lane)',  'personaje'),
  ('laffey_(azur_lane)',   'personaje'),
  ('gawr_gura',            'personaje'),
  ('highres',              'meta'),
  ('absurdres',            'meta'),
  ('fanart',               'general'),
  ('technology',           'general'),
  ('worldnews',            'general'),
  ('gaming',               'general'),
  ('science',              'general')
ON CONFLICT (nombre_etiqueta) DO NOTHING;

-- Publicaciones
INSERT INTO cdas.publicaciones
  (id_fuente, id_externo, titulo, url_contenido, url_miniatura, autor, puntuacion,
   fecha_publicacion, hash_contenido) VALUES
  (1, '7654321',
   'Ayanami - Azur Lane Commission',
   'https://danbooru.donmai.us/posts/7654321',
   'https://cdn.donmai.us/sample/ab/cd/sample-abcd1234.jpg',
   'artista_a', 312, '2025-03-01 14:32:00',
   'aabbcc1122334455aabbcc1122334455aabbcc1122334455aabbcc1122334455'),

  (1, '7654322',
   'Laffey - Azur Lane Fanart',
   'https://danbooru.donmai.us/posts/7654322',
   'https://cdn.donmai.us/sample/ef/gh/sample-efgh5678.jpg',
   'artista_b', 201, '2025-03-02 09:15:00',
   'bbccdd2233445566bbccdd2233445566bbccdd2233445566bbccdd2233445566'),

  (1, '7654323',
   'Gawr Gura - Hololive Art',
   'https://danbooru.donmai.us/posts/7654323',
   'https://cdn.donmai.us/sample/ij/kl/sample-ijkl9012.jpg',
   'artista_c', 178, '2025-03-03 11:00:00',
   'ccddeeff3344556677ccddeeff3344556677ccddeeff3344556677ccddee3344'),

  (2, 't3_abc123',
   'Major AI breakthrough announced by research team',
   'https://www.reddit.com/r/technology/comments/abc123',
   NULL, 'u/tech_poster', 8920, '2025-03-04 18:00:00',
   'ddeeff44556677889900ddeeff44556677889900ddeeff44556677889900ddee'),

  (2, 't3_def456',
   'Global climate summit reaches new agreement',
   'https://www.reddit.com/r/worldnews/comments/def456',
   NULL, 'u/news_poster', 5430, '2025-03-05 10:30:00',
   'eeff005566778899aabbeeff005566778899aabbeeff005566778899aabb0055'),

  (3, 'dQw4w9WgXcQ',
   'Understanding Neural Networks in 10 Minutes',
   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
   'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
   'TechChannel', 3201, '2025-03-06 16:00:00',
   'ff00116677889900aabbccddeeff00116677889900aabbccddeeff001166778899')
ON CONFLICT (id_fuente, id_externo) DO NOTHING;

-- Relaciones publicacion_etiqueta
INSERT INTO cdas.publicacion_etiqueta (id_publicacion, id_etiqueta) VALUES
  -- Post 1: azur_lane, 1girl, safe, ayanami, highres
  (1,1),(1,4),(1,6),(1,8),(1,11),
  -- Post 2: azur_lane, 1girl, safe, laffey, fanart
  (2,1),(2,4),(2,6),(2,9),(2,13),
  -- Post 3: hololive, 1girl, safe, gawr_gura, absurdres
  (3,2),(3,4),(3,6),(3,10),(3,12),
  -- Post 4: technology
  (4,14),
  -- Post 5: worldnews
  (5,15),
  -- Post 6: technology, science
  (6,14),(6,17)
ON CONFLICT DO NOTHING;

-- Reglas de filtro
INSERT INTO cdas.reglas_filtro (id_suscripcion, tipo_regla, valor_regla) VALUES
  -- Sus 1 (Danbooru azur_lane): safe, no explicit, puntuacion>=100, solo imagenes
  (1, 'incluir_etiqueta', 'safe'),
  (1, 'excluir_etiqueta', 'explicit'),
  (1, 'min_puntuacion',   '100'),
  (1, 'solo_imagenes',    'true'),
  -- Sus 2 (Danbooru hololive): safe, no explicit, solo imagenes
  (2, 'incluir_etiqueta', 'safe'),
  (2, 'excluir_etiqueta', 'explicit'),
  (2, 'solo_imagenes',    'true'),
  -- Sus 3 (Reddit worldnews): puntuacion minima moderada
  (3, 'min_puntuacion', '100'),
  -- Sus 4 (Reddit technology): puntuacion alta
  (4, 'min_puntuacion', '500'),
  -- Sus 5 (YouTube): solo imagenes (thumbnail)
  (5, 'solo_imagenes', 'true')
ON CONFLICT DO NOTHING;

-- Entregas
INSERT INTO cdas.entregas
  (id_publicacion, id_webhook, estado, codigo_respuesta, mensaje_error, intentos,
   fecha_intento, fecha_exitoso) VALUES
  (1, 1, 'exitoso', 204, NULL,                                                    1, '2025-03-01 14:35:00', '2025-03-01 14:35:02'),
  (2, 1, 'exitoso', 204, NULL,                                                    1, '2025-03-02 09:18:00', '2025-03-02 09:18:01'),
  (3, 2, 'exitoso', 204, NULL,                                                    1, '2025-03-03 11:05:00', '2025-03-03 11:05:01'),
  (4, 3, 'fallido', 429, 'Too Many Requests: {"retry_after":2.5,"global":false}', 1, '2025-03-04 18:05:00', NULL),
  (4, 3, 'exitoso', 204, NULL,                                                    2, '2025-03-04 18:05:05', '2025-03-04 18:05:06'),
  (5, 3, 'exitoso', 204, NULL,                                                    1, '2025-03-05 10:35:00', '2025-03-05 10:35:01'),
  (6, 4, 'reintento', 500, 'Internal Server Error - Discord side',                2, '2025-03-06 16:05:00', NULL);
`;

// ── Main ──────────────────────────────────────────────────────

async function main() {
  console.log('\n🗄️  CDAS — Script de inicialización de base de datos');
  console.log('─'.repeat(52));

  await client.connect();
  console.log('✅ Conectado a PostgreSQL\n');

  console.log('📐 Creando esquema...');
  await run(createSchema, 'Esquema cdas creado');

  console.log('\n📋 Creando tablas...');
  await run(createTables, '10 tablas + índices creados');

  console.log('\n🌱 Insertando datos de prueba...');
  await run(seedData, 'Datos de prueba insertados');

  console.log('\n🎉 Base de datos lista. Resumen:\n');

  const tables = [
    'servidores_discord', 'canales_discord', 'webhooks',
    'fuentes_contenido',  'suscripciones',   'etiquetas',
    'publicaciones', 'publicacion_etiqueta', 'reglas_filtro', 'entregas'
  ];

  for (const t of tables) {
    const { rows } = await client.query(
      `SELECT COUNT(*) FROM cdas.${t}`
    );
    console.log(`   cdas.${t.padEnd(24)} → ${rows[0].count} fila(s)`);
  }

  console.log('\n');
  await client.end();
}

main().catch((err) => {
  console.error('\n💥 Error durante la inicialización:', err.message);
  client.end();
  process.exit(1);
});
