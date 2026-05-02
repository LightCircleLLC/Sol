import 'dotenv/config';
import express from 'express';

import servidoresRouter     from './src/routes/servidores.routes.js';
import canalesRouter        from './src/routes/canales.routes.js';
import webhooksRouter       from './src/routes/webhooks.routes.js';
import fuentesRouter        from './src/routes/fuentes.routes.js';
import suscripcionesRouter  from './src/routes/suscripciones.routes.js';
import etiquetasRouter      from './src/routes/etiquetas.routes.js';
import publicacionesRouter  from './src/routes/publicaciones.routes.js';
import reglasRouter         from './src/routes/reglas.routes.js';
import entregasRouter       from './src/routes/entregas.routes.js';

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Rutas ───────────────────────────────────────────────────
app.use('/api/servidores',    servidoresRouter);
app.use('/api/canales',       canalesRouter);
app.use('/api/webhooks',      webhooksRouter);
app.use('/api/fuentes',       fuentesRouter);
app.use('/api/suscripciones', suscripcionesRouter);
app.use('/api/etiquetas',     etiquetasRouter);
app.use('/api/publicaciones', publicacionesRouter);
app.use('/api/reglas',        reglasRouter);
app.use('/api/entregas',      entregasRouter);

// ── Ruta raíz ───────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    sistema: 'CDAS - Content Distribution Automation System',
    version: '1.0.0',
    estado:  'activo',
    endpoints: [
      '/api/servidores',
      '/api/canales',
      '/api/webhooks',
      '/api/fuentes',
      '/api/suscripciones',
      '/api/etiquetas',
      '/api/publicaciones',
      '/api/reglas',
      '/api/entregas',
    ],
  });
});

// ── Manejo de rutas no encontradas ──────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ── Manejo global de errores ────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor', detalle: err.message });
});

// ── Inicio del servidor ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor CDAS corriendo en http://localhost:${PORT}`);
  console.log(`   Entorno: ${process.env.NODE_ENV ?? 'development'}`);
  console.log(`   Presiona Ctrl+C para detener\n`);
});
