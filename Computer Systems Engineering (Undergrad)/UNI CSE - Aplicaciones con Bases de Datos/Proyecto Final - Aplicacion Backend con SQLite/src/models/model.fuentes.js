/**
 * Modelo para la tabla fuentes_contenido.
 * @param {object} dbController - controlador de base de datos
 */
function modelFuentes(dbController = null) {
    const { open, run, get: getOne, all, close } = dbController;

    function getAll() {
        try {
            open();
            return all("SELECT * FROM fuentes_contenido;");
        } catch (error) {
            throw new Error(`Error al obtener fuentes: ${error.message}`);
        } finally {
            close();
        }
    }

    function getByTipo(tipo) {
        try {
            open();
            return all("SELECT * FROM fuentes_contenido WHERE tipo_fuente = ?;", [tipo]);
        } catch (error) {
            throw new Error(`Error al obtener fuentes de tipo ${tipo}: ${error.message}`);
        } finally {
            close();
        }
    }

    function get(id) {
        try {
            open();
            return getOne("SELECT * FROM fuentes_contenido WHERE id_fuente = ?;", [id]);
        } catch (error) {
            throw new Error(`Error al obtener fuente con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function create(datos) {
        const sql = `
            INSERT INTO fuentes_contenido (nombre, tipo_fuente, url_base, descripcion, activo)
            VALUES (@nombre, @tipo_fuente, @url_base, @descripcion, @activo)
        `;
        try {
            open();
            return run(sql, { activo: 1, ...datos });
        } catch (error) {
            throw new Error(`Error al crear fuente: ${error.message}`);
        } finally {
            close();
        }
    }

    function update(id, datos) {
        const sql = `
            UPDATE fuentes_contenido
            SET nombre      = @nombre,
                url_base    = @url_base,
                descripcion = @descripcion,
                activo      = @activo
            WHERE id_fuente = @id
        `;
        try {
            open();
            return run(sql, { ...datos, id });
        } catch (error) {
            throw new Error(`Error al actualizar fuente con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function remove(id) {
        try {
            open();
            return run("DELETE FROM fuentes_contenido WHERE id_fuente = @id", { id });
        } catch (error) {
            throw new Error(`Error al eliminar fuente con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    return { getAll, getByTipo, get, create, update, remove };
}

export default modelFuentes;
