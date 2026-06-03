import controllerDbSqlite from './controller.db.sqlite.js';

/**
 * Fábrica que devuelve el controlador de BD correcto según la plataforma.
 * @param {object} dbdefinition - { DB_PLATFORM, DB_NAME, USER, PASSWORD }
 * @returns {object} controlador de base de datos
 * @throws {Error} si la plataforma no es soportada
 */
function controllerDbFactory(dbdefinition) {
    const { DB_PLATFORM } = dbdefinition;

    switch (DB_PLATFORM) {
        case "sqlite": {
            const { DB_NAME } = dbdefinition;
            const raiz  = process.cwd();
            const mydb  = `${raiz}/${DB_NAME}`;
            return controllerDbSqlite(mydb);
        }
        default:
            throw new Error(`Plataforma de base de datos no soportada: ${DB_PLATFORM}`);
    }
}

export default controllerDbFactory;
