import { Nowstreamings } from "models/live";
import { RowDataPacket, Connection } from "mysql2/promise";
import { SqlError } from "../../../utils/error";
export class NowstrRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async fetch(offset: string): Promise<Nowstreamings[] | Error> {
    try {
      const sql = `SELECT * FROM nowstreamings ORDER BY open_date DESC LIMIT 30 OFFSET ${offset}`;
      const [rows] = await this.connection.execute<Nowstreamings[] & RowDataPacket[]>(sql);
      return rows;
    } catch (error) {
      return new SqlError(`NowstrRepository.fetch(offset: string) Error: ${error}`);
    }
  }
}
