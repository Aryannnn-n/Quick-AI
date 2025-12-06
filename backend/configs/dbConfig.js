// Docs -> https://neon.com/docs/guides/express
import { neon } from '@neondatabase/serverless';

import dotenv from 'dotenv';
dotenv.config({});

// Db connection
const sql = neon(`${process.env.DATABASE_URL}`);

export { sql };     