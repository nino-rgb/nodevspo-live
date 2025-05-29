import { Connection } from "mysql2/promise";
import { createDBConnection } from "../../utils/DataBase/database";
import { createArchiveTestData } from "../../utils/testData/createArchiveTestData";
import { afterEach, beforeEach, describe } from "node:test";
import { ArchiveRepoisitory } from "../../../repositories/database/archive/archiveRepository";

let connection: Connection;

beforeEach(async () => {
  connection = await createDBConnection();
  connection.query(`delete from archives`);
});

afterEach(async () => {
  await connection.end();
});

describe("ArichiveRepository", () => {
  describe("fetch(offset: string)", () => {
    it("should return 5 archive", async () => {
      const repository = new ArchiveRepoisitory(connection);
      const createArchiveList = await createArchiveTestData(connection, 5);

      const result = await repository.fetch("1");
      if (result instanceof Error) {
        throw new Error(`Test Failed an error gas occurred: ${result.message}`);
      }

      for (const archive of result) {
        const expectArchive = createArchiveList.filter((t) => t.id === archive.id)[0];
        expect(archive.id).toBe(expectArchive.id);
        expect(archive.createdAt).toBe(expectArchive.createdAt);
        expect(archive.open_date).toBe(expectArchive.open_date);
        expect(archive.outer_link).toBe(expectArchive.outer_link);
        expect(archive.talents_id).toBe(expectArchive.talents_id);
        expect(archive.updetaedAt).toBe(expectArchive.updetaedAt);
        expect(archive.video_thumbnail).toBe(expectArchive.video_thumbnail);
        expect(archive.video_title).toBe(expectArchive.video_title);
      }
    });

    it("should return empty", async () => {
      const repository = new ArchiveRepoisitory(connection);

      const result = await repository.fetch("1");
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }

      expect(result.length).toBe(0);
    });
  });
});
