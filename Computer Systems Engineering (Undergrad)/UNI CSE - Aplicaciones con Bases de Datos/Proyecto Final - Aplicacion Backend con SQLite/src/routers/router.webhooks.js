import express from 'express';
import modelWebhooks from '../models/model.webhooks.js';

const getRouterWebhooks = (controllerDB = null) => {
    const model  = modelWebhooks(controllerDB);
    const router = express.Router();

    router.get('/', (req, res, next) => {
        try {
            res.json(model.getAll());
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', (req, res, next) => {
        try {
            const result = model.get(req.params.id);
            if (!result) return res.status(404).json({ error: 'Webhook no encontrado' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.post('/', (req, res, next) => {
        try {
            const { id_canal, nombre, url_webhook, activo } = req.body;
            res.status(201).json(model.create({ id_canal, nombre, url_webhook, activo }));
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id', (req, res, next) => {
        try {
            const { nombre, url_webhook, activo } = req.body;
            const result = model.update(req.params.id, { nombre, url_webhook, activo });
            if (result.changes === 0) return res.status(404).json({ error: 'Webhook no encontrado' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:id', (req, res, next) => {
        try {
            const result = model.remove(req.params.id);
            if (result.changes === 0) return res.status(404).json({ error: 'Webhook no encontrado' });
            res.json({ mensaje: 'Webhook eliminado', id: req.params.id });
        } catch (error) {
            next(error);
        }
    });

    return router;
};

export default getRouterWebhooks;
