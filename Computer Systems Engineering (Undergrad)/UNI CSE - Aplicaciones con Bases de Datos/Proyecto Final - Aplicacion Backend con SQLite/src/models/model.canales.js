/**
 * Modelo para la tabla canales_discord.
 * @param {object} dbController - controlador de base de datos
 */
function modelCanales(dbController = null) {
    const { open, run, get: getOne, all, close } = dbController;

    function getAll() {
        try {
            open();
            const sql = `
                SELECT c.*, s.nombre AS nombre_servidor
                FROM canales_discord c
                JOIN servidores_discord s ON s.id_servidor = c.id_servidor;
            `;
            return all(sql);
        } catch (error) {
            throw new Error(`Error al obtener canales: ${error.message}`);
        } finally {
            close();
        }
    }

    function getByServidor(id_servidor) {
        try {
            open();
            return all(
                "SELECT * FROM canales_discord WHERE id_servidor = ?;",
                [id_servidor]
            );
        } catch (error) {
            throw new Error(`Error al obtener canales del servidor ${id_servidor}: ${error.message}`);
        } finally {
            close();
        }
    }

    function get(id) {
        try {
            open();
            return getOne("SELECT * FROM canales_discord WHERE id_canal = ?;", [id]);
        } catch (error) {
            throw new Error(`Error al obtener canal con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function create(datos) {
        const sql = `
            INSERT INTO canales_discord (id_servidor, discord_channel_id, nombre_canal, tipo_canal, activo)
            VALUES (@id_servidor, @discord_channel_id, @nombre_canal, @tipo_canal, @activo)
        `;
        try {
            open();
            return run(sql, { tipo_canal: 'texto', activo: 1, ...datos });
        } catch (error) {
            throw new Error(`Error al crear canal: ${error.message}`);
        } finally {
            close();
        }
    }

    function update(id, datos) {
        const sql = `
            UPDATE canales_discord
            SET nombre_canal = @nombre_canal,
                tipo_canal   = @tipo_canal,
                activo       = @activo
            WHERE id_canal = @id
        `;
        try {
            open();
            return run(sql, { ...datos, id });
        } catch (error) {
            throw new Error(`Error al actualizar canal con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function remove(id) {
        try {
            open();
            return run("DELETE FROM canales_discord WHERE id_canal = @id", { id });
        } catch (error) {
            throw new Error(`Error al eliminar canal con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    return { getAll, getByServidor, get, create, update, remove };
}

export default modelCanales;
