import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnableRLSOnUsersTable1749759487441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE orders
        ENABLE ROW LEVEL SECURITY;
      CREATE POLICY order_isolation_policy
        ON orders
        FOR SELECT USING (user_id = CURRENT_SETTING('app.current_user_id')::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP POLICY IF EXISTS order_isolation_policy ON orders;
      ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
    `);
  }
}
