import { RowDataPacket, Connection, ResultSetHeader } from "mysql2/promise";
import { Talent, TalentTwitchRow } from "models/live";
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
  //twitch_loginを保有しているタレントを取得
  public async findAllWithTwitchLogin(): Promise<TalentTwitchRow[] | Error> {
    try {
      const [rows] = await this.connection.execute<RowDataPacket[]>(
        `SELECT id, name, twitch_login, twitch_user_id
           FROM talents
          WHERE twitch_login IS NOT NULL AND twitch_login <> ''`,
      );
      return rows as TalentTwitchRow[];
    } catch (e) {
      return new Error(`TalentRepository.findAllWithTwitchLogin Error: ${e}`);
    }
  }
  //ログイン名までは人間が埋めたけど、まだ API で user_id を取って保存していないタレント(実用にはあまり関係ない)
  public async findMissingTwitchUserId(): Promise<TalentTwitchRow[] | Error> {
    try {
      const [rows] = await this.connection.execute<RowDataPacket[]>(
        `SELECT id, name, twitch_login, twitch_user_id
           FROM talents
          WHERE twitch_login IS NOT NULL AND twitch_login <> ''
            AND (twitch_user_id IS NULL OR twitch_user_id = '')`,
      );
      return rows as TalentTwitchRow[];
    } catch (e) {
      return new Error(`TalentRepository.findMissingTwitchUserId Error: ${e}`);
    }
  }
  //twitch_user_idをまとめて更新
  public async updateTwitchUserIdByLogin(login: string, userId: string): Promise<void | Error> {
    try {
      await this.connection.execute<ResultSetHeader>(`UPDATE talents SET twitch_user_id = ? WHERE twitch_login = ?`, [
        userId,
        login,
      ]);
    } catch (e) {
      return new Error(`TalentRepository.updateTwitchUserIdByLogin Error: ${e}`);
    }
  }
}
