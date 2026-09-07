import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  PORT: env.get('PORT').default('3000').asPortNumber(),
  DB_HOST: env.get('DB_HOST').default('localhost').asString(),
  DB_PORT: env.get('DB_PORT').default('5432').asPortNumber(),
  DB_USER: env.get('DB_USER').required().asString(),
  DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),
  DB_NAME: env.get('DB_NAME').required().asString(),
  DB_TYPE: env.get('DB_TYPE').default('postgres').asEnum(['postgres']),
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  MAILER_USER: env.get('MAILER_USER').required().asString(),
  MAILER_PASSWORD: env.get('MAILER_PASSWORD').required().asString(),
  MAINTENANCE_EMAIL: env.get('MAINTENANCE_EMAIL').required().asString(),
};
