import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInitialTables1719159035355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'best_practice_account',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'pl_account',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'best_practice_id',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['best_practice_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'best_practice_account',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'transaction',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'pl_account_id',
            type: 'int',
          },
          {
            name: 'source',
            type: 'varchar',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['pl_account_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pl_account',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `ALTER TABLE "transaction" DROP CONSTRAINT "FK_3ee33e6bd905bac78bc463297f5"`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "pl_account" DROP CONSTRAINT "FK_d21488101f10a285139541f7bfd"`,
    // );
    // await queryRunner.dropTable('transactions');
    // await queryRunner.dropTable('pl_accounts');
    // await queryRunner.dropTable('best_practice_accounts');
  }
}
