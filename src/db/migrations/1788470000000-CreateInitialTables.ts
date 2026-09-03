import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1788470000000 implements MigrationInterface {
  name = 'CreateInitialTables1788470000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."WATER_REPORT_severity_enum" AS ENUM('low', 'medium', 'high')`,
    );
    await queryRunner.query(
      `CREATE TABLE "WATER_REPORT" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "description" character varying NOT NULL, "severity" "public"."WATER_REPORT_severity_enum" NOT NULL, "reporterPhone" character varying NOT NULL, "isResolved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_WATER_REPORT_ID" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "SYSTEM_USER" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isNotificationEnabled" boolean NOT NULL, CONSTRAINT "PK_SYSTEM_USER_ID" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "SYSTEM_USER"`);
    await queryRunner.query(`DROP TABLE "WATER_REPORT"`);
    await queryRunner.query(`DROP TYPE "public"."WATER_REPORT_severity_enum"`);
  }
}
