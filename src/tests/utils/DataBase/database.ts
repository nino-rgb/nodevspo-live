import * as dotenv from "dotenv";
dotenv.config();
import { createConnection } from "mysql2/promise";

export async function createDBConnection() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

  console.log("DB ENV CHECK", {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DB_NAME,
  });

  if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASS || !DB_NAME) {
    throw new Error("環境変数が不足しています");
  }

  try {
    const connection = await createConnection({
      host: DB_HOST,
      port: parseInt(DB_PORT),
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
    });

    return connection;
  } catch (err) {
    console.error("DB接続失敗:", err);
    throw err;
  }
}
