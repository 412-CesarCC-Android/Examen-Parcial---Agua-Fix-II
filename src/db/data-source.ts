import { DataSource, DataSourceOptions } from 'typeorm';
import { envs } from '../config/envs';

export const dataSourceOptions: DataSourceOptions = {
  type: envs.DB_TYPE,
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  entities: [],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
