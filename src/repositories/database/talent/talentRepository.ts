import { RowDataPacket, Connection, ResultSetHeader } from "mysql2/promise";
import { Talents } from "models/live";
import { NotFoundDataError, SqlError } from "../../../utils/error";

export class TalentsRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async findAll(): Promise<Talents[] | Error> {
    try {
      const sql = "SELECT * FROM talents";
      const [rows] = await this.connection.execute<Talents[] & RowDataPacket[]>(sql);
      return rows;
    } catch (error) {
      return new SqlError(`TalentRepository.findAll() Error: ${error}`);
    }
  }

  public async getById(id: number): Promise<Talents | Error> {
    try {
      const sql = "SELECT * FROM talents WHERE id = ?";
      const [rows] = await this.connection.execute<Talents[] & RowDataPacket[]>(sql, [id]);

      if (rows.length === 0) {
        return new NotFoundDataError(`talent not found`);
      }
      return rows[0];
    } catch (error) {
      return new SqlError(`TalentRepository.getById(): ${error}`);
    }
  }
}
