import express from 'express';
import modelPublicaciones from '../models/model.publicaciones.js';

const getRouterPublicaciones = (controllerDB = null) => {
    const model  = modelPublicaciones(controllerDB);
    const router = express.Router();

    router.get('/', (req, res, next) => {
        try {
            res.json(model.getAll());
        } catch (error) {
            next(error);
        }
    });

    // GET /publicacion/:id/etiquetas — debe ir ANTES de /:id
    router.get('/:id/etiquetas', (req, res, next) => {
        try {
            res.json(model.getEtiquetas(req.params.id));
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', (req, res, next) => {
        try {
            const result = model.get(req.params.id);
            if (!result) return res.status(404).json({ error: 'Publicación no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    // POST /publicacion/:id/etiquetas/:id_etiqueta
    router.post('/:id/etiquetas/:id_etiqueta', (req, res, next) => {
        try {
            const result = model.addEtiqueta(req.params.id, req.params.id_etiqueta);
            res.status(201).json({ mensaje: 'Etiqueta agregada a la publicación', result });
        } catch (error) {
            next(error);
        }
    });

    // DELETE /publicacion/:id/etiquetas/:id_etiqueta
    router.delete('/:id/etiquetas/:id_etiqueta', (req, res, next) => {
        try {
            model.removeEtiqueta(req.params.id, req.params.id_etiqueta);
            res.json({ mensaje: 'Etiqueta removida de la publicación' });
        } catch (error) {
            next(error);
        }
    });

    router.post('/', (req, res, next) => {
        try {
            const { id_fuente, id_externo, titulo, url_contenido, url_miniatura,
                    autor, puntuacion, fecha_publicacion, hash_contenido } = req.body;
            const result = model.create({
                id_fuente, id_externo, titulo, url_contenido, url_miniatura,
                autor, puntuacion, fecha_publicacion, hash_contenido
            });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id', (req, res, next) => {
        try {
            const { titulo, url_miniatura, autor, puntuacion } = req.body;
            const result = model.update(req.params.id, { titulo, url_miniatura, autor, puntuacion });
            if (result.changes === 0) return res.status(404).json({ error: 'Publicación no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:id', (req, res, next) => {
        try {
            const result = model.remove(req.params.id);
            if (result.changes === 0) return res.status(404).json({ error: 'Publicación no encontrada' });
            res.json({ mensaje: 'Publicación eliminada', id: req.params.id });
        } catch (error) {
            next(error);
        }
    });

    return router;
};

export default getRouterPublicaciones;
