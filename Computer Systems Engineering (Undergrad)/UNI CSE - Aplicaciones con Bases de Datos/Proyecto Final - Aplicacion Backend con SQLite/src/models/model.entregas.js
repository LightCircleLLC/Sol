/**
 * Modelo para la tabla entregas.
 * @param {object} dbController - controlador de base de datos
 */
function modelEntregas(dbController = null) {
    const { open, run, get: getOne, all, close } = dbController;

    function getAll() {
        try {
            open();
            const sql = `
                SELECT e.*, p.titulo, p.url_contenido, w.nombre AS nombre_webhook
                FROM entregas e
                JOIN publicaciones p ON p.id_publicacion = e.id_publicacion
                JOIN webhooks      w ON w.id_webhook     = e.id_webhook
                ORDER BY e.fecha_intento DESC;
            `;
            return all(sql);
        } catch (error) {
            throw new Error(`Error al obtener entregas: ${error.message}`);
        } finally {
            close();
        }
    }

    function get(id) {
        try {
            open();
            return getOne("SELECT * FROM entregas WHERE id_entrega = ?;", [id]);
        } catch (error) {
            throw new Error(`Error al obtener entrega con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function getFallidas() {
        try {
            open();
            const sql = `
                SELECT e.*, p.titulo, w.nombre AS nombre_webhook
                FROM entregas e
                JOIN publicaciones p ON p.id_publicacion = e.id_publicacion
                JOIN webhooks      w ON w.id_webhook     = e.id_webhook
                WHERE e.estado IN ('fallido', 'reintento')
                ORDER BY e.intentos DESC, e.fecha_intento DESC;
            `;
            return all(sql);
        } catch (error) {
            throw new Error(`Error al obtener entregas fallidas: ${error.message}`);
        } finally {
            close();
        }
    }

    function create(datos) {
        const sql = `
            INSERT INTO entregas (id_publicacion, id_webhook, estado, intentos)
            VALUES (@id_publicacion, @id_webhook, @estado, 1)
        `;
        try {
            open();
            return run(sql, { estado: 'pendiente', ...datos });
        } catch (error) {
            throw new Error(`Error al crear entrega: ${error.message}`);
        } finally {
            close();
        }
    }

    function update(id, datos) {
        const sql = `
            UPDATE entregas
            SET estado           = @estado,
                codigo_respuesta = @codigo_respuesta,
                mensaje_error    = @mensaje_error,
                intentos         = intentos + 1,
                fecha_exitoso    = CASE WHEN @estado = 'exitoso' THEN datetime('now') ELSE fecha_exitoso END
            WHERE id_entrega = @id
        `;
        try {
            open();
            return run(sql, { ...datos, id });
        } catch (error) {
            throw new Error(`Error al actualizar entrega con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    return { getAll, get, getFallidas, create, update };
}

export default modelEntregas;
