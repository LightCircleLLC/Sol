/**
 * Modelo para la tabla webhooks.
 * @param {object} dbController - controlador de base de datos
 */
function modelWebhooks(dbController = null) {
    const { open, run, get: getOne, all, close } = dbController;

    function getAll() {
        try {
            open();
            const sql = `
                SELECT w.*, c.nombre_canal, s.nombre AS nombre_servidor
                FROM webhooks w
                JOIN canales_discord c    ON c.id_canal    = w.id_canal
                JOIN servidores_discord s ON s.id_servidor = c.id_servidor;
            `;
            return all(sql);
        } catch (error) {
            throw new Error(`Error al obtener webhooks: ${error.message}`);
        } finally {
            close();
        }
    }

    function get(id) {
        try {
            open();
            return getOne("SELECT * FROM webhooks WHERE id_webhook = ?;", [id]);
        } catch (error) {
            throw new Error(`Error al obtener webhook con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function create(datos) {
        const sql = `
            INSERT INTO webhooks (id_canal, nombre, url_webhook, activo)
            VALUES (@id_canal, @nombre, @url_webhook, @activo)
        `;
        try {
            open();
            return run(sql, { activo: 1, ...datos });
        } catch (error) {
            throw new Error(`Error al crear webhook: ${error.message}`);
        } finally {
            close();
        }
    }

    function update(id, datos) {
        const sql = `
            UPDATE webhooks
            SET nombre      = @nombre,
                url_webhook = @url_webhook,
                activo      = @activo
            WHERE id_webhook = @id
        `;
        try {
            open();
            return run(sql, { ...datos, id });
        } catch (error) {
            throw new Error(`Error al actualizar webhook con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function remove(id) {
        try {
            open();
            return run("DELETE FROM webhooks WHERE id_webhook = @id", { id });
        } catch (error) {
            throw new Error(`Error al eliminar webhook con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    return { getAll, get, create, update, remove };
}

export default modelWebhooks;
