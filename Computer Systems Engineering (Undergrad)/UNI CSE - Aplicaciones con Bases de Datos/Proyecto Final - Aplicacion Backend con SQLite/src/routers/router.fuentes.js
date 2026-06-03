import express from 'express';
import modelFuentes from '../models/model.fuentes.js';

const getRouterFuentes = (controllerDB = null) => {
    const model  = modelFuentes(controllerDB);
    const router = express.Router();

    router.get('/', (req, res, next) => {
        try {
            res.json(model.getAll());
        } catch (error) {
            next(error);
        }
    });

    // GET /fuente/tipo/:tipo  — debe ir ANTES de /:id para no ser capturado como id
    router.get('/tipo/:tipo', (req, res, next) => {
        try {
            res.json(model.getByTipo(req.params.tipo));
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', (req, res, next) => {
        try {
            const result = model.get(req.params.id);
            if (!result) return res.status(404).json({ error: 'Fuente no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.post('/', (req, res, next) => {
        try {
            const { nombre, tipo_fuente, url_base, descripcion, activo } = req.body;
            res.status(201).json(model.create({ nombre, tipo_fuente, url_base, descripcion, activo }));
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id', (req, res, next) => {
        try {
            const { nombre, url_base, descripcion, activo } = req.body;
            const result = model.update(req.params.id, { nombre, url_base, descripcion, activo });
            if (result.changes === 0) return res.status(404).json({ error: 'Fuente no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:id', (req, res, next) => {
        try {
            const result = model.remove(req.params.id);
            if (result.changes === 0) return res.status(404).json({ error: 'Fuente no encontrada' });
            res.json({ mensaje: 'Fuente eliminada', id: req.params.id });
        } catch (error) {
            next(error);
        }
    });

    return router;
};

export default getRouterFuentes;
