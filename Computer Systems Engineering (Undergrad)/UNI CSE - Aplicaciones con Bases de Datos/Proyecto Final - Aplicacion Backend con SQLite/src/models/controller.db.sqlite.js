import Database from "better-sqlite3";

/**
 * Controlador de base de datos para SQLite usando better-sqlite3.
 * Expone los métodos: open, run, get, all, close.
 * @param {string} dbFilePath - Ruta al archivo .db de SQLite
 * @returns {object} controlador con métodos de acceso a la BD
 */
function controllerDbSqlite(dbFilePath) {
    let db     = null;
    let dbOpen = false;

    return {
        /**
         * Abre la conexión a la base de datos y activa las llaves foráneas.
         */
        open() {
            db = new Database(dbFilePath);
            db.pragma("foreign_keys = ON");
            dbOpen = true;
        },

        /**
         * Ejecuta una sentencia de escritura (INSERT, UPDATE, DELETE).
         * @param {string} sql    - Sentencia SQL con parámetros nombrados (@campo)
         * @param {object} params - Objeto con los valores, ej: { nombre: "Danbooru" }
         * @returns {object} resultado con { changes, lastInsertRowid }
         */
        run(sql, params = {}) {
            const stmt = db.prepare(sql);
            const r    = stmt.run(params);
            return r;
        },

        /**
         * Recupera una sola fila.
         * @param {string} sql    - Sentencia SELECT con ? para parámetros posicionales
         * @param {Array}  params - Arreglo de valores, ej: [3]
         * @returns {object|undefined} fila encontrada o undefined
         */
        get(sql, params = []) {
            const res = db.prepare(sql).get(params);
            return res;
        },

        /**
         * Recupera todas las filas que coincidan.
         * @param {string} sql    - Sentencia SELECT
         * @param {Array}  params - Arreglo de valores para ? posicionales
         * @returns {Array} arreglo de filas
         */
        all(sql, params = []) {
            const res = db.prepare(sql).all(params);
            return res;
        },

        /**
         * Cierra la conexión a la base de datos si está abierta.
         */
        close() {
            if (dbOpen) {
                db.close();
                dbOpen = false;
            }
        },
    };
}

export default controllerDbSqlite;
