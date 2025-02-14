import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mysql from "mysql2";
import { AddressInfo } from "net";
import { liveController } from "./controllers/controller";

async function main() {
  dotenv.config();
  const { PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

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
  });

  const connection = await mysql.createConnection({
    host: MYSQL_HOST as string,
    port: parseInt(MYSQL_PORT as string),
    user: MYSQL_USER as string,
    password: MYSQL_PASS as string,
    database: MYSQL_DB as string,
  });

  app.use("/api", controller.router);
}
main();
