import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  // 👇 PRODUCCIÓN
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migration/*.js'],

  synchronize: false,     // 🔒 jamás true en prod
  migrationsRun: true,    // ✅ se ejecutan una sola vez
  logging: false,
});
