import { Pool } from "pg";

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

//function to query the database
const queryreq = async (text, params = []) => {
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
    } catch (error) {
        console.error('Database query error', error);
        throw error;
    } finally {
        client.release();
    }
}

export default queryreq;