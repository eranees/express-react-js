import pg from "pg";
import { loadEnv } from '../utils/common.util.js';

const { Pool } = pg;

loadEnv();

const pool = new Pool({
  host: process.env.PG_DB_HOST,
  port: parseInt(process.env.PG_DB_PORT || '5432', 10),
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME,
});


export default pool;
