import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();
import { Archive } from "models/live";
import { createDBConnection } from "tests/utils/DataBase";
import { Connection } from "mysql2/promise";
import { createArchiveTestData } from "../utils/testData/createArchiveTestData";

axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

let connection: Connection;

beforeEach(async () => {
  connection = await createDBConnection();
  await connection.query(`TRUNCATE TABLE archives`);
});

afterEach(async () => {
  await connection.end();
});

describe("ArchiveApi", () => {
  describe("GET /api/archives", () => {
    it("should retrun 5 archives and 200 status", async () => {
      const createdArchiveList: Archive[] = await createArchiveTestData(connection, 5);

      const client = axios.create({
        baseURL: "http://localhost:4000",
      });

      try {
        const response = await client.get<Archive[]>("/api/archives", { params: { offset: 0 } });

        expect(response.status).toBe(200);
        expect(response.data.length).toBe(5);

        for (const archive of response.data) {
          const expectArchie = createdArchiveList.find((t) => t.id === archive.id);
          expect(expectArchie).toBeDefined(); // 防御的チェック
          if (expectArchie) {
            expect(archive.id).toBe(expectArchie.id);
            expect(archive.outer_link).toBe(expectArchie.outer_link);
            expect(archive.talent_id).toBe(expectArchie.talent_id);
            expect(archive.video_title).toBe(expectArchie.video_title);
            expect(archive.video_thumbnail).toBe(expectArchie.video_thumbnail);
            expect(new Date(archive.open_date).toISOString()).toBe(new Date(expectArchie.open_date).toISOString());
          }
        }
      } catch (error: any) {
        console.error("Axios error in 5 archives test:", error.message);
        throw error;
      }
    });
    it("should return empty archives and 200 status", async () => {
      const client = axios.create({
        baseURL: "http://localhost:4000",
      });
      try {
        const response = await client.get<Archive[]>("/api/archives", { params: { offset: 0 } });

        expect(response.status).toBe(200);
        expect(response.data.length).toBe(0);
      } catch (error: any) {
        console.error("ECONNRESET or Axios error:", error.message);
        throw error; // そのまま失敗させる
      }
    });
  });
});
