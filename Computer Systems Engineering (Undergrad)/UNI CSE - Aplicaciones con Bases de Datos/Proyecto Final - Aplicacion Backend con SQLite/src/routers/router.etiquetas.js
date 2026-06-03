import express from 'express';
import modelEtiquetas from '../models/model.etiquetas.js';

const getRouterEtiquetas = (controllerDB = null) => {
    const model  = modelEtiquetas(controllerDB);
    const router = express.Router();

    router.get('/', (req, res, next) => {
        try {
            res.json(model.getAll());
        } catch (error) {
            next(error);
        }
    });

    // GET /etiqueta/categoria/:categoria — debe ir ANTES de /:id
    router.get('/categoria/:categoria', (req, res, next) => {
        try {
            res.json(model.getByCategoria(req.params.categoria));
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', (req, res, next) => {
        try {
            const result = model.get(req.params.id);
            if (!result) return res.status(404).json({ error: 'Etiqueta no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.post('/', (req, res, next) => {
        try {
            const { nombre_etiqueta, categoria } = req.body;
            res.status(201).json(model.create({ nombre_etiqueta, categoria }));
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id', (req, res, next) => {
        try {
            const { nombre_etiqueta, categoria } = req.body;
            const result = model.update(req.params.id, { nombre_etiqueta, categoria });
            if (result.changes === 0) return res.status(404).json({ error: 'Etiqueta no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:id', (req, res, next) => {
        try {
            const result = model.remove(req.params.id);
            if (result.changes === 0) return res.status(404).json({ error: 'Etiqueta no encontrada' });
            res.json({ mensaje: 'Etiqueta eliminada', id: req.params.id });
        } catch (error) {
            next(error);
        }
    });

    return router;
};

export default getRouterEtiquetas;
