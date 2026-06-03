import Database from "better-sqlite3";

export function crearDB() {
    const raiz = process.cwd();
    const mydb = `${raiz}/cdas.db`;
    const db   = new Database(mydb);

    // Habilitar llaves foráneas en SQLite
    db.pragma("foreign_keys = ON");

    // ── Eliminar tablas en orden inverso (por dependencias) ─────────
    db.exec(`
        DROP TABLE IF EXISTS entregas;
        DROP TABLE IF EXISTS reglas_filtro;
        DROP TABLE IF EXISTS publicacion_etiqueta;
        DROP TABLE IF EXISTS publicaciones;
        DROP TABLE IF EXISTS suscripciones;
        DROP TABLE IF EXISTS etiquetas;
        DROP TABLE IF EXISTS webhooks;
        DROP TABLE IF EXISTS fuentes_contenido;
        DROP TABLE IF EXISTS canales_discord;
        DROP TABLE IF EXISTS servidores_discord;
    `);

    // ── Crear tablas ─────────────────────────────────────────────────

    db.exec(`
        CREATE TABLE servidores_discord (
            id_servidor       INTEGER PRIMARY KEY,
            discord_guild_id  TEXT    NOT NULL UNIQUE,
            nombre            TEXT    NOT NULL,
            descripcion       TEXT,
            activo            INTEGER NOT NULL DEFAULT 1,
            fecha_registro    TEXT    NOT NULL DEFAULT (datetime('now'))
        );
    `);
    console.log("  ✔ servidores_discord");

    db.exec(`
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
    `);
    console.log("  ✔ canales_discord");

    db.exec(`
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
    `);
    console.log("  ✔ webhooks");

    db.exec(`
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
    `);
    console.log("  ✔ fuentes_contenido");

    db.exec(`
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
    `);
    console.log("  ✔ suscripciones");

    db.exec(`
        CREATE TABLE etiquetas (
            id_etiqueta     INTEGER PRIMARY KEY,
            nombre_etiqueta TEXT    NOT NULL UNIQUE,
            categoria       TEXT    NOT NULL DEFAULT 'general'
                                CHECK(categoria IN (
                                    'personaje','serie','artista','copyright',
                                    'tipo_contenido','general','meta'
                                ))
        );
    `);
    console.log("  ✔ etiquetas");

    db.exec(`
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
    `);
    console.log("  ✔ publicaciones");

    db.exec(`
        CREATE TABLE publicacion_etiqueta (
            id_publicacion INTEGER NOT NULL,
            id_etiqueta    INTEGER NOT NULL,
            PRIMARY KEY (id_publicacion, id_etiqueta),
            FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id_publicacion)
                ON DELETE CASCADE,
            FOREIGN KEY (id_etiqueta)    REFERENCES etiquetas(id_etiqueta)
        );
    `);
    console.log("  ✔ publicacion_etiqueta");

    db.exec(`
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
    `);
    console.log("  ✔ reglas_filtro");

    db.exec(`
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
    `);
    console.log("  ✔ entregas");

    // ── Índices ──────────────────────────────────────────────────────
    db.exec(`
        CREATE INDEX idx_pub_fuente_externo ON publicaciones(id_fuente, id_externo);
        CREATE INDEX idx_ent_publicacion    ON entregas(id_publicacion);
        CREATE INDEX idx_ent_estado        ON entregas(estado);
        CREATE INDEX idx_sus_fuente_activo ON suscripciones(id_fuente, activo);
        CREATE INDEX idx_pe_etiqueta       ON publicacion_etiqueta(id_etiqueta);
    `);
    console.log("  ✔ índices");

    // ── Datos de ejemplo ─────────────────────────────────────────────
    db.exec(`
        INSERT INTO servidores_discord (discord_guild_id, nombre, descripcion) VALUES
            ('987654321098765432', 'Servidor Principal', 'Servidor de producción para feeds'),
            ('876543210987654321', 'Servidor de Pruebas', 'Entorno de pruebas'),
            ('765432109876543210', 'Servidor Comunidad',  'Servidor con canales temáticos');
    `);

    db.exec(`
        INSERT INTO canales_discord (id_servidor, discord_channel_id, nombre_canal, tipo_canal) VALUES
            (1, '111122223333444455', 'danbooru-azur-lane',  'texto'),
            (1, '222233334444555566', 'danbooru-hololive',   'texto'),
            (1, '333344445555666677', 'reddit-noticias',     'texto'),
            (1, '444455556666777788', 'youtube-tecnologia',  'texto'),
            (2, '555566667777888899', 'pruebas-general',     'texto'),
            (3, '666677778888999900', 'twitter-feed',        'texto');
    `);

    db.exec(`
        INSERT INTO webhooks (id_canal, nombre, url_webhook) VALUES
            (1, 'WH Danbooru AL',   'https://discord.com/api/webhooks/11112222/TOKEN_AL'),
            (2, 'WH Danbooru Holo', 'https://discord.com/api/webhooks/22223333/TOKEN_HOLO'),
            (3, 'WH Reddit News',   'https://discord.com/api/webhooks/33334444/TOKEN_NEWS'),
            (4, 'WH YouTube Tech',  'https://discord.com/api/webhooks/44445555/TOKEN_YT'),
            (5, 'WH Pruebas',       'https://discord.com/api/webhooks/55556666/TOKEN_TEST');
    `);

    db.exec(`
        INSERT INTO fuentes_contenido (nombre, tipo_fuente, url_base, descripcion) VALUES
            ('Danbooru',  'danbooru', 'https://danbooru.donmai.us', 'Repositorio de arte digital etiquetado'),
            ('Reddit',    'reddit',   'https://www.reddit.com',     'Agregador de noticias y comunidades'),
            ('YouTube',   'youtube',  'https://www.youtube.com',    'Plataforma de video'),
            ('Twitter/X', 'twitter',  'https://nitter.net',         'Red social vía Nitter RSS');
    `);

    db.exec(`
        INSERT INTO suscripciones (id_fuente, id_webhook, parametro_busqueda, intervalo_verificacion) VALUES
            (1, 1, 'azur_lane',  15),
            (1, 2, 'hololive',   20),
            (2, 3, 'worldnews',  10),
            (2, 3, 'technology', 15),
            (3, 4, 'UCBcRF18a7Qf58cMAttxzz7c', 30);
    `);

    db.exec(`
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
    `);

    db.exec(`
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
    `);

    db.exec(`
        INSERT INTO publicacion_etiqueta (id_publicacion, id_etiqueta) VALUES
            (1,1),(1,3),(1,4),(1,6),(1,9),
            (2,1),(2,3),(2,4),(2,7),(2,10),
            (3,2),(3,3),(3,4),(3,8),(3,9),
            (4,11),
            (5,12),
            (6,11);
    `);

    db.exec(`
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
    `);

    db.exec(`
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
    `);

    db.close();
}
