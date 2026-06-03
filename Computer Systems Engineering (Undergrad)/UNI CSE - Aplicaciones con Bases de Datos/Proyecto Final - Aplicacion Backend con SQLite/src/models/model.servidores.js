/**
 * Modelo para la tabla servidores_discord.
 * @param {object} dbController - controlador de base de datos
 */
function modelServidores(dbController = null) {
    const { open, run, get: getOne, all, close } = dbController;

    function getAll() {
        try {
            open();
            const result = all("SELECT * FROM servidores_discord;");
            return result;
        } catch (error) {
            throw new Error(`Error al obtener servidores: ${error.message}`);
        } finally {
            close();
        }
    }

    function get(id) {
        try {
            open();
            const result = getOne("SELECT * FROM servidores_discord WHERE id_servidor = ?;", [id]);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener servidor con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function create(datos) {
        const sql = `
            INSERT INTO servidores_discord (discord_guild_id, nombre, descripcion, activo)
            VALUES (@discord_guild_id, @nombre, @descripcion, @activo)
        `;
        try {
            open();
            const result = run(sql, { activo: 1, ...datos });
            return result;
        } catch (error) {
            throw new Error(`Error al crear servidor: ${error.message}`);
        } finally {
            close();
        }
    }

    function update(id, datos) {
        const sql = `
            UPDATE servidores_discord
            SET nombre      = @nombre,
                descripcion = @descripcion,
                activo      = @activo
            WHERE id_servidor = @id
        `;
        try {
            open();
            const result = run(sql, { ...datos, id });
            return result;
        } catch (error) {
            throw new Error(`Error al actualizar servidor con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function remove(id) {
        try {
            open();
            const result = run("DELETE FROM servidores_discord WHERE id_servidor = @id", { id });
            return result;
        } catch (error) {
            throw new Error(`Error al eliminar servidor con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    return { getAll, get, create, update, remove };
}

export default modelServidores;
