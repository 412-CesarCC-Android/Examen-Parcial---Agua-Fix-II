import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ReportsModule],
})
export class AppModule {}
