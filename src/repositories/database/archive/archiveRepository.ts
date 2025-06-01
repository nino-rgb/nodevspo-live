import { Archive } from "models/live";
import { RowDataPacket, Connection } from "mysql2/promise";
import { SqlError } from "../../../utils/error";
export class ArchiveRepoisitory {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async fetch(offset: number): Promise<Archive[] | Error> {
    if (typeof offset !== "number") {
      return new Error(`Offset must be a number, but got: ${typeof offset}`);
    }

    try {
      const sql = `SELECT * FROM archives ORDER BY open_date DESC, id LIMIT 30 OFFSET ${offset}`;
      const [rows] = await this.connection.execute<Archive[] & RowDataPacket[]>(sql);
      return rows;
    } catch (error) {
      return new SqlError(`ArchiveRepository.fetch(offset: string) Error: ${error}`);
    }
  }
}
