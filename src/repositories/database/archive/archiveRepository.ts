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

  public async searchByTitle(keyword: string): Promise<Archive[] | Error> {
    if (typeof keyword !== "string" || keyword.trim() === "") {
      return new Error(`keyword must be a string, but got: ${typeof keyword}`);
    }

    try {
      const offset = 0;
      const sql = `SELECT * FROM archives WHERE video_title LIKE ? ORDER BY open_date DESC LIMIT 30 OFFSET ${offset}`;
      const values = [`%${keyword}%`];
      console.log("keyword:", keyword);
      console.log("SQL:", sql);
      console.log("values:", values);
      const [rows] = await this.connection.execute<Archive[] & RowDataPacket[]>(sql, values);
      console.log("結果行数:", rows.length);
      return rows;
    } catch (error) {
      return new SqlError(`ArchiveRepository.searchByTitle(keyword: string) Error: ${error}`);
    }
  }

  public async fetchByTalentId(talentId: number): Promise<Archive[] | Error> {
    try {
      const sql = `SELECT * FROM archives WHERE talent_id = ? ORDER BY open_date DESC LIMIT 30`;
      const [rows] = await this.connection.execute<Archive[] & RowDataPacket[]>(sql, [talentId]);
      return rows;
    } catch (error) {
      return new Error(`ArchiveRepository.fetchByTalentId(${talentId}) Error: ${error}`);
    }
  }
}
