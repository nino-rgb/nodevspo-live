import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mysql, { RowDataPacket } from "mysql2/promise";
import { AddressInfo } from "net";
import { TalentsRepository } from "./repositories/database/talent/talentRepository";
import { TalentsService } from "./services/talent/talentsService";
import { TalentsController } from "./controllers/talentController";
import { ArchivesReoisitory } from "../src/repositories/database/archive/archiveRepository";
import { ArchivesService } from "../src/services/archive/archivesService";
import { ArchivesController } from "../src/controllers/archivesControllers";

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

  const server = app.listen(parseInt(PORT as string), () => {
    const address = server.address() as AddressInfo;
    console.log("Node.js is listening to PORT:" + address.port);
  });

  const connection = await mysql.createConnection({
    host: DB_HOST as string,
    port: parseInt(DB_PORT as string),
    user: DB_USER as string,
    password: DB_PASS as string,
    database: DB_NAME as string,
  });
  const talentrepository = new TalentsRepository(connection);
  const talentservice = new TalentsService(talentrepository);
  const talentcontroller = new TalentsController(talentservice);
  app.use("/api/", talentcontroller.router);

  const archiverepository = new ArchivesReoisitory(connection);
  const archiveservice = new ArchivesService(archiverepository);
  const archivecontroller = new ArchivesController(archiveservice);
  app.use("/api/", archivecontroller.router);
}
main();
