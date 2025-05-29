import * as dotenv from "dotenv";
import { createConnection, Connection } from "mysql2/promise";

export async function createDBConnection(): Promise<Connection> {
  dotenv.config();
  const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

  const connection = await createConnection({
    host: DB_HOST as string,
    port: parseInt(DB_PORT as string),
    user: DB_USER as string,
    password: DB_PASS as string,
    database: DB_NAME as string,
  });
  return connection;
}
