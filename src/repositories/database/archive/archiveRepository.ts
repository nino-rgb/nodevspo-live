import { Archive } from "models/live";
import { RowDataPacket, Connection } from "mysql2/promise";
import { SqlError } from "../../../utils/error";
import { emitWarning } from "process";
export class ArchiveRepository {
  bulkInsert(validArchives: Archive[]) {
    throw new Error("Method not implemented.");
  }
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

  public async deleteByTalentId(talentId: number): Promise<void | Error> {
    try {
      const sql = `DELETE FROM archives WHERE talent_id ?`;
      await this.connection.execute(sql, [talentId]);
    } catch (error) {
      return new SqlError(`ArchiveRepository.deleteByTalentId Error: ${error}`);
    }
  }

  public async findExistingVideoIds(videoIds: string[]): Promise<string[]> {
    if (videoIds.length === 0) return [];

    const placeholders = videoIds.map(() => "?").join(",");
    const links = videoIds.map((id) => `https://youtu.be/${id}`);

    const [rows] = await this.connection.execute<{ outer_link: string }[] & RowDataPacket[]>(
      `SELECT outer_link FROM archives WHERE outer_link IN (${placeholders})`,
      links,
    );

    // "https://youtu.be/xxx" の形式から videoId だけ取り出して返す
    return rows.map((row) => row.outer_link.replace("https://youtu.be/", ""));
  }
}
