/**
 * Modelo para la tabla reglas_filtro.
 * @param {object} dbController - controlador de base de datos
 */
function modelReglas(dbController = null) {
    const { open, run, get: getOne, all, close } = dbController;

    function getAll() {
        try {
            open();
            const sql = `
                SELECT r.*, s.parametro_busqueda
                FROM reglas_filtro r
                JOIN suscripciones s ON s.id_suscripcion = r.id_suscripcion;
            `;
            return all(sql);
        } catch (error) {
            throw new Error(`Error al obtener reglas: ${error.message}`);
        } finally {
            close();
        }
    }

    function get(id) {
        try {
            open();
            return getOne("SELECT * FROM reglas_filtro WHERE id_regla = ?;", [id]);
        } catch (error) {
            throw new Error(`Error al obtener regla con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function create(datos) {
        const sql = `
            INSERT INTO reglas_filtro (id_suscripcion, tipo_regla, valor_regla, activo)
            VALUES (@id_suscripcion, @tipo_regla, @valor_regla, @activo)
        `;
        try {
            open();
            return run(sql, { activo: 1, ...datos });
        } catch (error) {
            throw new Error(`Error al crear regla: ${error.message}`);
        } finally {
            close();
        }
    }

    function update(id, datos) {
        const sql = `
            UPDATE reglas_filtro
            SET tipo_regla  = @tipo_regla,
                valor_regla = @valor_regla,
                activo      = @activo
            WHERE id_regla = @id
        `;
        try {
            open();
            return run(sql, { ...datos, id });
        } catch (error) {
            throw new Error(`Error al actualizar regla con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function remove(id) {
        try {
            open();
            return run("DELETE FROM reglas_filtro WHERE id_regla = @id", { id });
        } catch (error) {
            throw new Error(`Error al eliminar regla con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    return { getAll, get, create, update, remove };
}

export default modelReglas;
