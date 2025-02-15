import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mysql from "mysql2";
import { AddressInfo } from "net";
// import { liveController } from "./controllers/controller";

async function main() {
  dotenv.config();
  const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

  console.log(DB_USER);
  console.log(DB_PASS);
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

  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1" as string,
      port: parseInt(DB_PORT as string),
      user: DB_USER as string,
      password: DB_PASS as string,
      database: DB_NAME as string,
    });
  } catch (e) {
    console.log(e);
  }

  // const connection = await mysql.createConnection({
  //   host: DB_HOST as string,
  //   port: parseInt(DB_PORT as string),
  //   user: DB_USER as string,
  //   password: DB_PASS as string,
  //   database: DB_NAME as string,
  // });

  app.get("/", async (req, res) => {
    res.json("テスト");
  });
}
main();
