import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1749675003288 implements MigrationInterface {
  name = 'Migrations1749675003288';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users"
                             (
                               "id"       uuid              NOT NULL DEFAULT uuid_generate_v4(),
                               "name"     character varying NOT NULL,
                               "password" text              NOT NULL,
                               CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(
      `CREATE TYPE "public"."orders_state_enum" AS ENUM('new', 'active', 'done')`,
    );
    await queryRunner.query(`CREATE TABLE "orders"
                             (
                               "id"         uuid                         NOT NULL DEFAULT uuid_generate_v4(),
                               "created_at" TIMESTAMP WITH TIME ZONE     NOT NULL DEFAULT NOW(),
                               "state"      "public"."orders_state_enum" NOT NULL DEFAULT 'new',
                               "user_id"    uuid,
                               CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "orders"
      ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders"
      DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_state_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
