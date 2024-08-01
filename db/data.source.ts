import { dbConfig } from 'src/utils';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  ...dbConfig,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
