import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ReportSeverity } from '../entities/report.entity';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(ReportSeverity)
  severity!: ReportSeverity;

  @IsString()
  @IsNotEmpty()
  reporterPhone!: string;
}
