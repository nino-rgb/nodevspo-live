import { Nowstreaming } from "models/live";
import { RowDataPacket, Connection, ResultSetHeader } from "mysql2/promise";
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
      const sql = `SELECT * FROM nowstreamings WHERE video_title LIKE ? ORDER BY open_date DESC LIMIT 30 OFFSET ${offset}`;
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

  public async fetchByTalentId(talentId: number): Promise<Nowstreaming[] | Error> {
    try {
      const sql = `SELECT * FROM nowstreamings WHERE talent_id = ? ORDER BY open_date DESC LIMIT 30`;
      console.log("SQL:", sql);
      const [rows] = await this.connection.execute<Nowstreaming[] & RowDataPacket[]>(sql, [talentId]);
      console.log("rows:", rows);

      return rows;
    } catch (error) {
      return new Error(`NowstrRepository.fetchByTalentId(${talentId}) Error: ${error}`);
    }
  }

  public async findExistingVideoIds(videoIds: string[]): Promise<string[]> {
    if (!Array.isArray(videoIds) || videoIds.length === 0) return [];
    const placeholders = videoIds.map(() => "?").join(",");
    const links = videoIds.map((id) => `https://youtu.be/${id}`);

    const [rows] = await this.connection.execute<({ outer_link: string } & RowDataPacket)[]>(
      `SELECT outer_link FROM nowstreamings WHERE outer_link IN (${placeholders})`,
      links,
    );

    return rows.map((rows) => rows.outer_link.replace("https://youtu.be/", ""));
  }

  public async deleteByTalentId(talentId: number): Promise<void | Error> {
    try {
      const sql = `DELETE FROM nowstreamings WHERE talent_id =?`;
      await this.connection.execute(sql, [talentId]);
    } catch (error) {
      return new SqlError(`NowstrRepository.deleteByTalentId Error: ${error}`);
    }
  }

  public async bulkInsert(ValidNowstramings: Nowstreaming[]): Promise<void | Error> {
    try {
      if (!ValidNowstramings || ValidNowstramings.length === 0) return;

      const placeholders = ValidNowstramings.map(() => "(?,?,?,?,?)").join(",");
      const sql = `
        INSERT INTO nowstreamings (outer_link, talent_id, video_title, video_thumbnail, open_date)
        VALUES ${placeholders}
        ON DUPLICATE KEY UPDATE
          video_title     = VALUES(video_title),
          video_thumbnail = VALUES(video_thumbnail),
          open_date       = VALUES(open_date)
      `;

      const params = ValidNowstramings.flatMap((a) => [
        a.outer_link,
        (a as any).talent_id ?? (a as any).talent_id,
        a.video_title,
        a.video_thumbnail,
        a.open_date,
      ]);

      await this.connection.execute<ResultSetHeader>(sql, params);
    } catch (error) {
      return new SqlError(`NowstrRepository.bulkInsert Error: ${error}`);
    }
  }
}
