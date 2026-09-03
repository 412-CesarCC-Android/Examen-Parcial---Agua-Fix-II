import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './entities/report.entity';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto): Promise<Report> {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll(): Promise<Report[]> {
    return this.reportsService.findAll();
  }
}
