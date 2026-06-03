import express from 'express';
import modelServidores from '../models/model.servidores.js';

const getRouterServidores = (controllerDB = null) => {
    const model  = modelServidores(controllerDB);
    const router = express.Router();

    // GET /servidor
    router.get('/', (req, res, next) => {
        try {
            const result = model.getAll();
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    // GET /servidor/:id
    router.get('/:id', (req, res, next) => {
        try {
            const result = model.get(req.params.id);
            if (!result) return res.status(404).json({ error: 'Servidor no encontrado' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    // POST /servidor
    router.post('/', (req, res, next) => {
        try {
            const { discord_guild_id, nombre, descripcion, activo } = req.body;
            const result = model.create({ discord_guild_id, nombre, descripcion, activo });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    });

    // PUT /servidor/:id
    router.put('/:id', (req, res, next) => {
        try {
            const { nombre, descripcion, activo } = req.body;
            const result = model.update(req.params.id, { nombre, descripcion, activo });
            if (result.changes === 0) return res.status(404).json({ error: 'Servidor no encontrado' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    // DELETE /servidor/:id
    router.delete('/:id', (req, res, next) => {
        try {
            const result = model.remove(req.params.id);
            if (result.changes === 0) return res.status(404).json({ error: 'Servidor no encontrado' });
            res.json({ mensaje: 'Servidor eliminado', id: req.params.id });
        } catch (error) {
            next(error);
        }
    });

    return router;
};

export default getRouterServidores;
