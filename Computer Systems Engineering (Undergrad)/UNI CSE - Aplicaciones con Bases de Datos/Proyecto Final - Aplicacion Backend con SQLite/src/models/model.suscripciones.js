/**
 * Modelo para la tabla suscripciones.
 * @param {object} dbController - controlador de base de datos
 */
function modelSuscripciones(dbController = null) {
    const { open, run, get: getOne, all, close } = dbController;

    function getAll() {
        try {
            open();
            const sql = `
                SELECT s.*, f.nombre AS nombre_fuente, f.tipo_fuente, w.nombre AS nombre_webhook
                FROM suscripciones s
                JOIN fuentes_contenido f ON f.id_fuente  = s.id_fuente
                JOIN webhooks          w ON w.id_webhook = s.id_webhook;
            `;
            return all(sql);
        } catch (error) {
            throw new Error(`Error al obtener suscripciones: ${error.message}`);
        } finally {
            close();
        }
    }

    function get(id) {
        try {
            open();
            return getOne("SELECT * FROM suscripciones WHERE id_suscripcion = ?;", [id]);
        } catch (error) {
            throw new Error(`Error al obtener suscripción con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function getReglas(id_suscripcion) {
        try {
            open();
            return all(
                "SELECT * FROM reglas_filtro WHERE id_suscripcion = ?;",
                [id_suscripcion]
            );
        } catch (error) {
            throw new Error(`Error al obtener reglas de la suscripción ${id_suscripcion}: ${error.message}`);
        } finally {
            close();
        }
    }

    function create(datos) {
        const sql = `
            INSERT INTO suscripciones (id_fuente, id_webhook, parametro_busqueda, intervalo_verificacion, activo)
            VALUES (@id_fuente, @id_webhook, @parametro_busqueda, @intervalo_verificacion, @activo)
        `;
        try {
            open();
            return run(sql, { intervalo_verificacion: 30, activo: 1, ...datos });
        } catch (error) {
            throw new Error(`Error al crear suscripción: ${error.message}`);
        } finally {
            close();
        }
    }

    function update(id, datos) {
        const sql = `
            UPDATE suscripciones
            SET parametro_busqueda     = @parametro_busqueda,
                intervalo_verificacion = @intervalo_verificacion,
                activo                 = @activo
            WHERE id_suscripcion = @id
        `;
        try {
            open();
            return run(sql, { ...datos, id });
        } catch (error) {
            throw new Error(`Error al actualizar suscripción con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function remove(id) {
        try {
            open();
            return run("DELETE FROM suscripciones WHERE id_suscripcion = @id", { id });
        } catch (error) {
            throw new Error(`Error al eliminar suscripción con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    return { getAll, get, getReglas, create, update, remove };
}

export default modelSuscripciones;
