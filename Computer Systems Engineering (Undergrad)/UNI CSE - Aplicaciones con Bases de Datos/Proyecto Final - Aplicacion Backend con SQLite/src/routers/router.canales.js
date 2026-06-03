import express from 'express';
import modelCanales from '../models/model.canales.js';

const getRouterCanales = (controllerDB = null) => {
    const model  = modelCanales(controllerDB);
    const router = express.Router();

    // GET /canal
    router.get('/', (req, res, next) => {
        try {
            res.json(model.getAll());
        } catch (error) {
            next(error);
        }
    });

    // GET /canal/servidor/:id_servidor
    router.get('/servidor/:id_servidor', (req, res, next) => {
        try {
            res.json(model.getByServidor(req.params.id_servidor));
        } catch (error) {
            next(error);
        }
    });

    // GET /canal/:id
    router.get('/:id', (req, res, next) => {
        try {
            const result = model.get(req.params.id);
            if (!result) return res.status(404).json({ error: 'Canal no encontrado' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    // POST /canal
    router.post('/', (req, res, next) => {
        try {
            const { id_servidor, discord_channel_id, nombre_canal, tipo_canal, activo } = req.body;
            const result = model.create({ id_servidor, discord_channel_id, nombre_canal, tipo_canal, activo });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    });

    // PUT /canal/:id
    router.put('/:id', (req, res, next) => {
        try {
            const { nombre_canal, tipo_canal, activo } = req.body;
            const result = model.update(req.params.id, { nombre_canal, tipo_canal, activo });
            if (result.changes === 0) return res.status(404).json({ error: 'Canal no encontrado' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    // DELETE /canal/:id
    router.delete('/:id', (req, res, next) => {
        try {
            const result = model.remove(req.params.id);
            if (result.changes === 0) return res.status(404).json({ error: 'Canal no encontrado' });
            res.json({ mensaje: 'Canal eliminado', id: req.params.id });
        } catch (error) {
            next(error);
        }
    });

    return router;
};

export default getRouterCanales;
