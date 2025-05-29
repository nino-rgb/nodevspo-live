import axios from "axios";
import * as dotenv from "dotenv";
import { Archive } from "models/live";
import { createDBConnection } from "tests/utils/DataBase";
import { Connection, RowDataPacket } from "mysql2/promise";
import { createArchiveTestData } from "tests/utils/testData/createArchiveTestData";

dotenv.config();
const { PORT } = process.env;

axios.defaults.baseURL = `http://localhost${PORT}`;
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

let connection: Connection;

beforeEach(async () => {
  connection = await createDBConnection();
  connection.query("delete from archives");
});

afterEach(async () => {
  await connection.end();
});

describe("ArchiveApi", () => {
  describe("GET /api/archives", () => {
    it("should retrun 5 archives and 200 status", async () => {
      const createdArchiveList: Archive[] = await createArchiveTestData(connection, 5);
      const response = await axios.get<Archive[]>("/api/archives");

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(5);

      for (const archive of response.data) {
        const expectArchie = createdArchiveList.filter((t) => t.id === archive.id)[0];
        expect(archive.id).toBe(expectArchie.id);
        expect(archive.outer_link).toBe(expectArchie.outer_link);
        expect(archive.talents_id).toBe(expectArchie.talents_id);
        expect(archive.video_title).toBe(expectArchie.video_title);
        expect(archive.video_thumbnail).toBe(expectArchie.video_thumbnail);
        expect(archive.open_date).toBe(expectArchie.open_date);
      }
    });
    it("should return empty archives and 200 status", async () => {
      const response = await axios.get<Archive[]>("/api/archives");
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(0);
    });
  });
});
