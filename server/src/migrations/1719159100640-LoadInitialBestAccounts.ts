import * as path from 'path';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LoadInitialBestAccounts1719159100640
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const filePath = path.join(
      __dirname,
      '../assets/Best-practice accounts.xlsx',
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Read from Excel
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Load to the table
    for (const data of jsonData) {
      await queryRunner.query(
        `INSERT INTO best_practice_account ("name") VALUES ($1)`,
        [data['Master categories']],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM best_practice_account`);
    await queryRunner.dropTable('best_practice_account');
  }
}
