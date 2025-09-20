import { Archive } from "models/live";
import { RowDataPacket, Connection, ResultSetHeader } from "mysql2/promise";
import { SqlError } from "../../../utils/error";

export class ArchiveRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  /**
   * 一括INSERT（既存は更新）
   * ※ Unique制約（例: outer_link UNIQUE）がある前提。
   *    ない場合は ON DUPLICATE のブロックを削るか INSERT IGNORE に変更してください。
   */
  public async bulkInsert(validArchives: Archive[]): Promise<void | Error> {
    try {
      if (!validArchives || validArchives.length === 0) return;

      const placeholders = validArchives.map(() => "(?, ?, ?, ?, ?)").join(", ");
      const sql = `
        INSERT INTO archives (outer_link, talent_id, video_title, video_thumbnail, open_date)
        VALUES ${placeholders}
        ON DUPLICATE KEY UPDATE
          video_title     = VALUES(video_title),
          video_thumbnail = VALUES(video_thumbnail),
          open_date       = VALUES(open_date)
      `;

      const params = validArchives.flatMap((a) => [
        a.outer_link,
        // a.talent_id が無い型でも a.talents_id を拾えるように保険
        (a as any).talent_id ?? (a as any).talents_id,
        a.video_title,
        a.video_thumbnail,
        a.open_date,
      ]);

      await this.connection.execute<ResultSetHeader>(sql, params);
    } catch (error) {
      return new SqlError(`ArchiveRepository.bulkInsert Error: ${error}`);
    }
  }

  /**
   * 最新30件を open_date DESC, id DESC で取得（オフセット指定）
   * OFFSET はプレースホルダで安全に渡す
   */
  public async fetch(offset: number): Promise<Archive[] | Error> {
    try {
      const safeOffset = Math.max(0, Math.trunc(offset)); // 整数&非負に正規化
      const sql = `
      SELECT *
      FROM archives
      ORDER BY open_date DESC, id DESC
      LIMIT 30 OFFSET ${safeOffset}
    `;
      // ★ OFFSET を展開したので第二引数は渡さない
      const [rows] = await this.connection.execute<(Archive & RowDataPacket)[]>(sql);
      return rows as unknown as Archive[];
    } catch (error) {
      return new SqlError(`ArchiveRepository.fetch(offset: number) Error: ${error}`);
    }
  }

  /**
   * タイトル部分一致検索。最新30件、オフセット任意
   */
  public async searchByTitle(keyword: string, offset = 0): Promise<Archive[] | Error> {
    if (typeof keyword !== "string" || keyword.trim() === "") {
      return new Error(`keyword must be a non-empty string, but got: ${typeof keyword}`);
    }
    try {
      const trimmed = keyword.trim();
      const safeOffset = Math.max(0, Math.trunc(offset));

      const sql = `
        SELECT *
        FROM archives
        WHERE video_title LIKE ?
        ORDER BY open_date DESC, id DESC
        LIMIT 30 OFFSET ?
      `;
      const values = [`%${trimmed}%`, safeOffset];

      const [rows] = await this.connection.execute<(Archive & RowDataPacket)[]>(sql, values);
      return rows as unknown as Archive[];
    } catch (error) {
      return new SqlError(`ArchiveRepository.searchByTitle(keyword: string) Error: ${error}`);
    }
  }

  /**
   * タレントIDで最新30件
   */
  public async fetchByTalentId(talentId: number): Promise<Archive[] | Error> {
    try {
      const sql = `
        SELECT *
        FROM archives
        WHERE talent_id = ?
        ORDER BY open_date DESC, id DESC
        LIMIT 30
      `;
      const [rows] = await this.connection.execute<(Archive & RowDataPacket)[]>(sql, [talentId]);
      return rows as unknown as Archive[];
    } catch (error) {
      return new Error(`ArchiveRepository.fetchByTalentId(${talentId}) Error: ${error}`);
    }
  }

  /**
   * タレントIDで削除（SQLの演算子抜けを修正）
   */
  public async deleteByTalentId(talentId: number): Promise<void | Error> {
    try {
      const sql = `DELETE FROM archives WHERE talent_id = ?`;
      await this.connection.execute(sql, [talentId]);
    } catch (error) {
      return new SqlError(`ArchiveRepository.deleteByTalentId Error: ${error}`);
    }
  }

  /**
   * 既存の YouTube videoId（outer_link から逆算）を取得
   */
  public async findExistingVideoIds(videoIds: string[]): Promise<string[]> {
    if (!Array.isArray(videoIds) || videoIds.length === 0) return [];
    const placeholders = videoIds.map(() => "?").join(",");
    const links = videoIds.map((id) => `https://youtu.be/${id}`);

    const [rows] = await this.connection.execute<({ outer_link: string } & RowDataPacket)[]>(
      `SELECT outer_link FROM archives WHERE outer_link IN (${placeholders})`,
      links,
    );

    return rows.map((row) => row.outer_link.replace("https://youtu.be/", ""));
  }
}
