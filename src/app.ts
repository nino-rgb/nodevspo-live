import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mysql, { RowDataPacket } from "mysql2";
import { AddressInfo } from "net";
// import { liveController } from "./controllers/controller";

async function main() {
  dotenv.config();
  const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.disable("x-powerd-by");

  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  const sever = app.listen(parseInt(PORT as string), () => {
    const address = sever.address() as AddressInfo;
    console.log("Node.js is listening to PORT:" + address.port);
  });

  const connection = await mysql.createConnection({
    host: DB_HOST as string,
    port: parseInt(DB_PORT as string),
    user: DB_USER as string,
    password: DB_PASS as string,
    database: DB_NAME as string,
  });

  const talentID = 1;
  const sql = `SELECT * FROM talents WHERE id = ${talentID}`;

  connection.query<RowDataPacket[]>(sql, (_err, rows) => {
    console.log(rows);
  });

  app.get("/", async (req, res) => {
    res.json("テスト");
  });
}
main();
