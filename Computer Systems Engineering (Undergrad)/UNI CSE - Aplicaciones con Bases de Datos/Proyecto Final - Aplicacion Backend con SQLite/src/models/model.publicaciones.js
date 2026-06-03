/**
 * Modelo para la tabla publicaciones (y su relación con etiquetas).
 * @param {object} dbController - controlador de base de datos
 */
function modelPublicaciones(dbController = null) {
    const { open, run, get: getOne, all, close } = dbController;

    function getAll() {
        try {
            open();
            const sql = `
                SELECT p.*, f.nombre AS nombre_fuente, f.tipo_fuente
                FROM publicaciones p
                JOIN fuentes_contenido f ON f.id_fuente = p.id_fuente
                ORDER BY p.fecha_registro DESC;
            `;
            return all(sql);
        } catch (error) {
            throw new Error(`Error al obtener publicaciones: ${error.message}`);
        } finally {
            close();
        }
    }

    function get(id) {
        try {
            open();
            return getOne(
                "SELECT * FROM publicaciones WHERE id_publicacion = ?;",
                [id]
            );
        } catch (error) {
            throw new Error(`Error al obtener publicación con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function getEtiquetas(id_publicacion) {
        try {
            open();
            const sql = `
                SELECT e.*
                FROM etiquetas e
                JOIN publicacion_etiqueta pe ON pe.id_etiqueta = e.id_etiqueta
                WHERE pe.id_publicacion = ?
                ORDER BY e.categoria, e.nombre_etiqueta;
            `;
            return all(sql, [id_publicacion]);
        } catch (error) {
            throw new Error(`Error al obtener etiquetas de publicación ${id_publicacion}: ${error.message}`);
        } finally {
            close();
        }
    }

    function addEtiqueta(id_publicacion, id_etiqueta) {
        try {
            open();
            return run(
                "INSERT OR IGNORE INTO publicacion_etiqueta (id_publicacion, id_etiqueta) VALUES (@id_publicacion, @id_etiqueta)",
                { id_publicacion, id_etiqueta }
            );
        } catch (error) {
            throw new Error(`Error al agregar etiqueta a publicación: ${error.message}`);
        } finally {
            close();
        }
    }

    function removeEtiqueta(id_publicacion, id_etiqueta) {
        try {
            open();
            return run(
                "DELETE FROM publicacion_etiqueta WHERE id_publicacion = @id_publicacion AND id_etiqueta = @id_etiqueta",
                { id_publicacion, id_etiqueta }
            );
        } catch (error) {
            throw new Error(`Error al remover etiqueta de publicación: ${error.message}`);
        } finally {
            close();
        }
    }

    function create(datos) {
        const sql = `
            INSERT INTO publicaciones
                (id_fuente, id_externo, titulo, url_contenido, url_miniatura,
                 autor, puntuacion, fecha_publicacion, hash_contenido)
            VALUES
                (@id_fuente, @id_externo, @titulo, @url_contenido, @url_miniatura,
                 @autor, @puntuacion, @fecha_publicacion, @hash_contenido)
        `;
        try {
            open();
            return run(sql, { puntuacion: 0, ...datos });
        } catch (error) {
            throw new Error(`Error al crear publicación: ${error.message}`);
        } finally {
            close();
        }
    }

    function update(id, datos) {
        const sql = `
            UPDATE publicaciones
            SET titulo        = @titulo,
                url_miniatura = @url_miniatura,
                autor         = @autor,
                puntuacion    = @puntuacion
            WHERE id_publicacion = @id
        `;
        try {
            open();
            return run(sql, { ...datos, id });
        } catch (error) {
            throw new Error(`Error al actualizar publicación con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    function remove(id) {
        try {
            open();
            return run("DELETE FROM publicaciones WHERE id_publicacion = @id", { id });
        } catch (error) {
            throw new Error(`Error al eliminar publicación con id ${id}: ${error.message}`);
        } finally {
            close();
        }
    }

    return { getAll, get, getEtiquetas, addEtiqueta, removeEtiqueta, create, update, remove };
}

export default modelPublicaciones;
