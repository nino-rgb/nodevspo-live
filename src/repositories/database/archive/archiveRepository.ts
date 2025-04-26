import { Archives } from "models/live";
import { RowDataPacket, Connection, ResultSetHeader } from "mysql2/promise";
import { NotFoundDataError, SqlError } from "../../../utils/error";
export class ArchivesReoisitory {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async fetch(offset: string): Promise<Archives[] | Error> {
    try {
      // const sql = "SELECT * FROM archives ORDER BY open_date DESC LIMIT 30 OFFSET ?";
      const sql = `SELECT * FROM archives ORDER BY open_date DESC LIMIT 30 OFFSET ${offset}`;
      const [rows] = await this.connection.execute<Archives[] & RowDataPacket[]>(sql);
      return rows;
    } catch (error) {
      return new SqlError(`ArchiveRepository.findAll() Error: ${error}`);
    }
  }
}
