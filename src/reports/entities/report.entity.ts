import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ReportSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity('WATER_REPORT')
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  address!: string;

  @Column()
  description!: string;

  @Column({ type: 'enum', enum: ReportSeverity })
  severity!: ReportSeverity;

  @Column()
  reporterPhone!: string;

  @Column({ default: false })
  isResolved!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
