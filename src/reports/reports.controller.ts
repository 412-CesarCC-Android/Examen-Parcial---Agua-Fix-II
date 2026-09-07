import { Body, Controller, Get, Post } from '@nestjs/common';
import { envs } from '../config/envs';
import { EmailService } from '../email/email.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './entities/report.entity';
import { ReportsService } from './reports.service';
import { generateReportTemplate } from './templates/report.template';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async create(@Body() createReportDto: CreateReportDto): Promise<Report> {
    const report = await this.reportsService.create(createReportDto);
    const template = generateReportTemplate(createReportDto);

    await this.emailService.sendEmail(
      envs.MAINTENANCE_EMAIL,
      'Nuevo reporte de fuga de agua',
      template,
    );

    return report;
  }

  @Get()
  findAll(): Promise<Report[]> {
    return this.reportsService.findAll();
  }
}
