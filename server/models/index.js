import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = { connectionString: process.env.DATABASE_URL };

const pool = new Pool(dbConfig);

const query = (text, params, callback) => pool.query(text, params, callback);

export { pool , query };