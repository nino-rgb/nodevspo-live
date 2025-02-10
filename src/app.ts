import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mysql from "mysql2";
import { AddressInfo } from "net";

async function main() {
  dotenv.config();
  const { PORT, DB_HOST, ROOT_PASS, DB_USER, DB_PORT, DB_PASS, DB_ROOT } = process.env;

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
}
