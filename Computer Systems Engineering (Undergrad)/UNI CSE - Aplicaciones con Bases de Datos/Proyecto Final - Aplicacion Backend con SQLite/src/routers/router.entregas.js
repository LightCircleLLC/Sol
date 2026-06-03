import express from 'express';
import modelEntregas from '../models/model.entregas.js';

const getRouterEntregas = (controllerDB = null) => {
    const model  = modelEntregas(controllerDB);
    const router = express.Router();

    router.get('/', (req, res, next) => {
        try {
            res.json(model.getAll());
        } catch (error) {
            next(error);
        }
    });

    // GET /entrega/fallidas — debe ir ANTES de /:id
    router.get('/fallidas', (req, res, next) => {
        try {
            res.json(model.getFallidas());
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', (req, res, next) => {
        try {
            const result = model.get(req.params.id);
            if (!result) return res.status(404).json({ error: 'Entrega no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.post('/', (req, res, next) => {
        try {
            const { id_publicacion, id_webhook, estado } = req.body;
            res.status(201).json(model.create({ id_publicacion, id_webhook, estado }));
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id', (req, res, next) => {
        try {
            const { estado, codigo_respuesta, mensaje_error } = req.body;
            const result = model.update(req.params.id, { estado, codigo_respuesta, mensaje_error });
            if (result.changes === 0) return res.status(404).json({ error: 'Entrega no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    return router;
};

export default getRouterEntregas;
