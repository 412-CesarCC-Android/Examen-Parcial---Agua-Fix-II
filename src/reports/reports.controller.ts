import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { envs } from '../config/envs';
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './entities/report.entity';
import { ReportsService } from './reports.service';
import { generateReportTemplate } from './templates/report.template';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() photo?: Express.Multer.File,
  ): Promise<Report> {
    if (!photo) {
      throw new BadRequestException('La foto de la fuga es obligatoria');
    }

    const photoUrl = await this.storageService.uploadFile(photo, 'reports/');
    const report = await this.reportsService.create(createReportDto, photoUrl);
    const template = generateReportTemplate(createReportDto, photoUrl);

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
