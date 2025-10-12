import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserNameUnique1760272213397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" ADD CONSTRAINT "users_name_unique" UNIQUE(name);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" DROP CONSTRAINT "users_name_unique";
    `);
  }
}
