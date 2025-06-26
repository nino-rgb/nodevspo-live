import { RowDataPacket, Connection, ResultSetHeader } from "mysql2/promise";
import { Talent } from "models/live";
import { NotFoundDataError, SqlError } from "../../../utils/error";

export class TalentRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async findAll(): Promise<Talent[] | Error> {
    try {
      const sql = "SELECT * FROM talents";
      const [rows] = await this.connection.execute<Talent[] & RowDataPacket[]>(sql);
      return rows;
    } catch (error) {
      return new SqlError(`TalentRepository.findAll() Error: ${error}`);
    }
  }

  public async getById(id: number): Promise<Talent | Error> {
    try {
      const sql = "SELECT * FROM talents WHERE id = ?";
      const [rows] = await this.connection.execute<Talent[] & RowDataPacket[]>(sql, [id]);

      if (rows.length === 0) {
        return new NotFoundDataError(`talent not found`);
      }
      return rows[0];
    } catch (error) {
      return new SqlError(`TalentRepository.getById(): ${error}`);
    }
  }

  public async searchByName(keyword: string): Promise<Talent[] | Error> {
    if (typeof keyword !== "string" || keyword.trim() === "") {
      return new Error(`keyword must be a string, but got: ${keyword}`);
    }

    try {
      const sql = `SELECT * FROM talents WHERE name LIKE ? `;
      const values = [`%${keyword}%`];
      console.log("keyword:", keyword);
      console.log("SQL:", sql);
      console.log("values:", values);
      const [rows] = await this.connection.execute<Talent[] & RowDataPacket[]>(sql, values);
      console.log("結果件数:", rows.length);
      return rows;
    } catch (error) {
      return new SqlError(`TalentRepository.searchByName(keyword: string) Error: ${error}`);
    }
  }
}
