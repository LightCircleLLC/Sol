import express from 'express';
import modelReglas from '../models/model.reglas.js';

const getRouterReglas = (controllerDB = null) => {
    const model  = modelReglas(controllerDB);
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
            if (!result) return res.status(404).json({ error: 'Regla no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.post('/', (req, res, next) => {
        try {
            const { id_suscripcion, tipo_regla, valor_regla, activo } = req.body;
            res.status(201).json(model.create({ id_suscripcion, tipo_regla, valor_regla, activo }));
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id', (req, res, next) => {
        try {
            const { tipo_regla, valor_regla, activo } = req.body;
            const result = model.update(req.params.id, { tipo_regla, valor_regla, activo });
            if (result.changes === 0) return res.status(404).json({ error: 'Regla no encontrada' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:id', (req, res, next) => {
        try {
            const result = model.remove(req.params.id);
            if (result.changes === 0) return res.status(404).json({ error: 'Regla no encontrada' });
            res.json({ mensaje: 'Regla eliminada', id: req.params.id });
        } catch (error) {
            next(error);
        }
    });

    return router;
};

export default getRouterReglas;
