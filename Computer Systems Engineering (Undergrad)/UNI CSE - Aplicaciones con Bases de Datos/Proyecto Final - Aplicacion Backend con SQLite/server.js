import express from 'express';
import { getVariablesDB, getVariablesEntorno } from './src/helpers/getVariablesEntorno.js';
import controllerDbFactory   from './src/models/factory.controller.db.js';
import getRouterServidores   from './src/routers/router.servidores.js';
import getRouterCanales      from './src/routers/router.canales.js';
import getRouterWebhooks     from './src/routers/router.webhooks.js';
import getRouterFuentes      from './src/routers/router.fuentes.js';
import getRouterSuscripciones from './src/routers/router.suscripciones.js';
import getRouterEtiquetas    from './src/routers/router.etiquetas.js';
import getRouterPublicaciones from './src/routers/router.publicaciones.js';
import getRouterReglas       from './src/routers/router.reglas.js';
import getRouterEntregas     from './src/routers/router.entregas.js';

const { PORT, HOST } = getVariablesEntorno();

// Crear el controlador de BD usando la fábrica
const controllerDB = controllerDbFactory(getVariablesDB());

// Crear los routers inyectando el controlador
const routerServidores    = getRouterServidores(controllerDB);
const routerCanales       = getRouterCanales(controllerDB);
const routerWebhooks      = getRouterWebhooks(controllerDB);
const routerFuentes       = getRouterFuentes(controllerDB);
const routerSuscripciones = getRouterSuscripciones(controllerDB);
const routerEtiquetas     = getRouterEtiquetas(controllerDB);
const routerPublicaciones = getRouterPublicaciones(controllerDB);
const routerReglas        = getRouterReglas(controllerDB);
const routerEntregas      = getRouterEntregas(controllerDB);

const app = express();

// ── Middlewares ──────────────────────────────────────────────
app.use(express.json());

// ── Ruta raíz ────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({
        sistema: 'CDAS - Content Distribution Automation System',
        version: '1.0.0',
        rutas: [
            '/servidor', '/canal', '/webhook', '/fuente',
            '/suscripcion', '/etiqueta', '/publicacion',
            '/regla', '/entrega'
        ]
    });
});

// ── Rutas de la API ──────────────────────────────────────────
app.use('/servidor',    routerServidores);
app.use('/canal',       routerCanales);
app.use('/webhook',     routerWebhooks);
app.use('/fuente',      routerFuentes);
app.use('/suscripcion', routerSuscripciones);
app.use('/etiqueta',    routerEtiquetas);
app.use('/publicacion', routerPublicaciones);
app.use('/regla',       routerReglas);
app.use('/entrega',     routerEntregas);

// ── Manejo de rutas no encontradas ───────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: '404 - Ruta no encontrada' });
});

// ── Manejo global de errores (catch de excepciones) ──────────
app.use((error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
});

// ── Iniciar servidor ─────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor CDAS corriendo en http://${HOST}:${PORT}`);
});
