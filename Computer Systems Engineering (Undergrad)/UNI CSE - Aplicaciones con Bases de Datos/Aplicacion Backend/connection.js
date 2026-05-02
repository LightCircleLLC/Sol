import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'cdas_db',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

pool.on('connect', () => {
  console.log('✅ Conexión a PostgreSQL establecida');
});

pool.on('error', (err) => {
  console.error('❌ Error en el pool de PostgreSQL:', err.message);
});

/**
 * Ejecuta una consulta SQL usando el pool de conexiones.
 * @param {string} text   - Sentencia SQL parametrizada
 * @param {Array}  params - Valores de los parámetros
 * @returns {Promise<pg.QueryResult>}
 */
export const query = (text, params) => pool.query(text, params);

export default pool;
