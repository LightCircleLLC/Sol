/**
 * Modelo para la tabla etiquetas.
 * @param {object} dbController - controlador de base de datos
 */
function modelEtiquetas(dbController = null) {
    const { open, run, get: getOne, all, close } = dbController;

    function getAll() {
        try {
            open();
            return all("SELECT * FROM etiquetas ORDER BY categoria, nombre_etiqueta;");
        } catch (error) {
            throw new Error(`Error al obtener etiquetas: ${error.message}`);
        } finally {
            close();
        }
    }

    function getByCategoria(categoria) {
        try {
            open();
            return all(
                "SELECT * FROM etiquetas WHERE categoria = ? ORDER BY nombre_etiqueta;",
                [categoria]
            );
        } catch (error) {
            throw new Error(`Error al obtener etiquetas de categoría ${categoria}: ${error.message}`);
        } finally {
            close();
        }
    }

    function get(id) {
        try {
            open();
            return getOne("SELECT * FROM etiquetas WHERE id_etiqueta = ?;", [id]);
        } catch (error) {
            throw new Error(`Error al obtener etiqueta con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function create(datos) {
        const sql = `
            INSERT INTO etiquetas (nombre_etiqueta, categoria)
            VALUES (@nombre_etiqueta, @categoria)
            ON CONFLICT(nombre_etiqueta) DO UPDATE SET categoria = excluded.categoria
        `;
        try {
            open();
            return run(sql, { categoria: 'general', ...datos });
        } catch (error) {
            throw new Error(`Error al crear etiqueta: ${error.message}`);
        } finally {
            close();
        }
    }

    function update(id, datos) {
        const sql = `
            UPDATE etiquetas
            SET nombre_etiqueta = @nombre_etiqueta,
                categoria       = @categoria
            WHERE id_etiqueta = @id
        `;
        try {
            open();
            return run(sql, { ...datos, id });
        } catch (error) {
            throw new Error(`Error al actualizar etiqueta con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function remove(id) {
        try {
            open();
            return run("DELETE FROM etiquetas WHERE id_etiqueta = @id", { id });
        } catch (error) {
            throw new Error(`Error al eliminar etiqueta con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    return { getAll, getByCategoria, get, create, update, remove };
}

export default modelEtiquetas;
