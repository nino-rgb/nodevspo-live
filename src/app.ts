import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mysql, { RowDataPacket } from "mysql2/promise";
import { AddressInfo } from "net";
import { TalentsRepository } from "./repositories/database/talent/talentRepository";
import { TalentsService } from "./services/talent/talentsService";
import { TalentsController } from "./controllers/talentController";

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
  const repository = new TalentsRepository(connection);
  const service = new TalentsService(repository);
  const controller = new TalentsController(service);
  app.use("/api/", controller.router);
}
main();
