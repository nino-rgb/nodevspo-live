import { Nowstreaming } from "models/live";
import { RowDataPacket, Connection } from "mysql2/promise";
import { SqlError } from "../../../utils/error";
export class NowstrRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async fetch(offset: number): Promise<Nowstreaming[] | Error> {
    try {
      const sql = `SELECT * FROM nowstreamings ORDER BY open_date DESC LIMIT 30 OFFSET ${offset}`;
      const [rows] = await this.connection.execute<Nowstreaming[] & RowDataPacket[]>(sql);
      return rows;
    } catch (error) {
      return new SqlError(`NowstrRepository.fetch(offset: string) Error: ${error}`);
    }
  }

  public async searchByTitle(keyword: string): Promise<Nowstreaming[] | Error> {
    if (typeof keyword !== "string" || keyword.trim() === "") {
      return new Error(`keyword must be a string, but got: ${typeof keyword}`);
    }

    try {
      const offset = 0;
      const sql = `SELECT * FROM nowstreamigs WHERE video_title LIKE ? ORDER BY open_date DESC LIMIT 30 OFFSET ${offset}`;
      const values = [`%${keyword}%`];
      console.log("keyword:", keyword);
      console.log("SQL:", sql);
      console.log("values:", values);
      const [rows] = await this.connection.execute<Nowstreaming[] & RowDataPacket[]>(sql, values);
      console.log("結果行数:", rows.length);
      return rows;
    } catch (error) {
      return new SqlError(`NowstrRepository.searchByTitle(keyword: string) Error: ${error}`);
    }
  }
}
