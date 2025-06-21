// 最上部に追加
import * as dotenv from "dotenv";
dotenv.config();
import { Connection } from "mysql2/promise";
import { createDBConnection } from "../../utils/DataBase/database";
import { createArchiveTestData } from "../../utils/testData/createArchiveTestData";
import { ArchiveRepoisitory } from "../../../repositories/database/archive/archiveRepository";
import { SqlError } from "utils/error";
import { NowstrRepository } from "repositories/database/nowstreaming/nowstrRepository";

let connection: Connection;

beforeEach(async () => {
  connection = await createDBConnection();
  connection.query(`TRUNCATE TABLE archives`);
});

afterEach(async () => {
  await connection.end();
});

describe("ArichiveRepository", () => {
  describe("fetch(offset: number)", () => {
    it("should return 5 archive", async () => {
      const repository = new ArchiveRepoisitory(connection);
      const createArchiveList = await createArchiveTestData(connection, 5);

      const result = await repository.fetch(0);
      if (result instanceof Error) {
        throw new Error(`Test Failed an error gas occurred: ${result.message}`);
      }

      const expectedList = [...createArchiveList].sort((a, b) => b.open_date.getTime() - a.open_date.getTime());

      expect(result.length).toBe(5);
      for (let index = 0; index < 5; index++) {
        const gotArchive = result[index];
        const expectArchive = expectedList[index];
        expect(gotArchive.id).toBe(expectArchive.id);
        expect(gotArchive.open_date).toBeDefined();
        expect(expectArchive.open_date).toBeDefined();
        expect(new Date(gotArchive.open_date).toISOString()).toBe(new Date(expectArchive.open_date).toISOString());

        expect(gotArchive.outer_link).toBe(expectArchive.outer_link);
        expect(gotArchive.talents_id).toBe(expectArchive.talents_id);
        expect(gotArchive.video_thumbnail).toBe(expectArchive.video_thumbnail);
        expect(gotArchive.video_title).toBe(expectArchive.video_title);
      }
    });

    it("should return empty", async () => {
      const repository = new ArchiveRepoisitory(connection);

      const result = await repository.fetch(0);
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }

      expect(result.length).toBe(0);
    });

    it("should return error if offset is not number", async () => {
      const repository = new ArchiveRepoisitory(connection);

      const result = await repository.fetch("notnumber" as any);

      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toMatch(/Offset must be a number/);
    });

    it("should return sqlError", async () => {
      const mockConnection = {
        excute: jest.fn().mockRejectedValue(new Error("Mocked SQL Error")),
      } as unknown as Connection;

      const repository = new ArchiveRepoisitory(mockConnection);

      const result = await repository.fetch(0);

      expect(result instanceof SqlError).toBeTruthy(); //toBeTruthyはtoBeよりざっくりtrueかを確認
    });
  });

  describe("searchByTitle(keyword: string", () => {
    it("should retrun macth archives", async () => {
      const repository = new ArchiveRepoisitory(connection);
      await connection.query(`
        INSERT INTO archives (outer_link, talents_id, video_title, video_thumbnail, open_date)
        VALUES 
        ("link_1", 1, "kuzuha is got", "thumb_1", "2025-06-01 00:00:00"),
        ("link_2", 1, "not related", "thumb_2", "2025-06-02 00:00:00")
      `); //タイトルを指定するためにここでテストデータを代入

      const result = await repository.searchByTitle("kuzuha"); //1件目にkuzuhaがあるのでKuzuhaで検索

      if (result instanceof Error) {
        throw new Error(`Test failed: ${result.message}`);
      }

      expect(result.length).toBe(1);
      expect(result[0].video_title).toContain("kuzuha");
    });

    it("should retrun empty if archives no match", async () => {
      //検索したが対象のデータがない
      const repository = new ArchiveRepoisitory(connection);
      await createArchiveTestData(connection, 5);
      const result = await repository.searchByTitle("not data character"); //タイトルにないキーワード(not data character)で検索にかからないようにする

      if (result instanceof Error) {
        throw new Error(`Test failed: ${result.message}`);
      }

      expect(result.length).toBe(0);
    });

    it("should return archives in desc open_date order", async () => {
      //検索したデータが降順で返って来ているかの確認
      const repository = new ArchiveRepoisitory(connection);
      await connection.query(`
        INSERT INTO archives (outer_link, talents_id, video_title, video_thumbnail, open_date)
        VALUES 
        ("link_1", 1, "kuzuha", "thumb_1", "2025-06-01 00:00:00"),
        ("link_2", 1, "kuzuha", "thumb_2", "2025-05-01 00:00:00")
      `);

      const result = await repository.searchByTitle("kuzuha");

      if (result instanceof Error) {
        throw new Error(`Test Failed: ${result.message}`);
      }

      const date1 = new Date(result[0].open_date);
      const date2 = new Date(result[1].open_date);

      expect(date1.getTime()).toBeGreaterThan(date2.getTime());
    });

    it("should return Sql Error", async () => {
      const mockConnection = {
        excute: jest.fn().mockRejectedValue(new Error("Mocked SQL Error")),
      } as unknown as Connection;

      const repository = new ArchiveRepoisitory(mockConnection);

      const result = await repository.searchByTitle("any");

      expect(result instanceof SqlError).toBeTruthy();
    });
  });
});
