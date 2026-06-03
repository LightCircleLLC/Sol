import express from 'express';
import modelSuscripciones from '../models/model.suscripciones.js';

const getRouterSuscripciones = (controllerDB = null) => {
    const model  = modelSuscripciones(controllerDB);
    const router = express.Router();

    router.get('/', (req, res, next) => {
        try {
            res.json(model.getAll());
        } catch (error) {
            next(error);
        }
    });

    // GET /suscripcion/:id/reglas
    router.get('/:id/reglas', (req, res, next) => {
        try {
            res.json(model.getReglas(req.params.id));
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', (req, res, next) => {
        try {
            const result = model.get(req.params.id);
            if (!result) return res.status(404).json({ error: 'Suscripción no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.post('/', (req, res, next) => {
        try {
            const { id_fuente, id_webhook, parametro_busqueda, intervalo_verificacion, activo } = req.body;
            res.status(201).json(model.create({ id_fuente, id_webhook, parametro_busqueda, intervalo_verificacion, activo }));
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id', (req, res, next) => {
        try {
            const { parametro_busqueda, intervalo_verificacion, activo } = req.body;
            const result = model.update(req.params.id, { parametro_busqueda, intervalo_verificacion, activo });
            if (result.changes === 0) return res.status(404).json({ error: 'Suscripción no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:id', (req, res, next) => {
        try {
            const result = model.remove(req.params.id);
            if (result.changes === 0) return res.status(404).json({ error: 'Suscripción no encontrada' });
            res.json({ mensaje: 'Suscripción eliminada', id: req.params.id });
        } catch (error) {
            next(error);
        }
    });

    return router;
};

export default getRouterSuscripciones;
