import * as dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
};