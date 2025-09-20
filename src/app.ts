import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mysql from "mysql2/promise";
import { AddressInfo } from "net";
import { TalentRepository } from "./repositories/database/talent/talentRepository";
import { TalentService } from "./services/talent/talentsService";
import { TalentsController } from "./controllers/talentController";
import { ArchiveRepository } from "../src/repositories/database/archive/archiveRepository";
import { ArchiveService } from "../src/services/archive/archivesService";
import { ArchivesController } from "./controllers/archiveControllers";
import { NowstrController } from "../src/controllers/nowstrControllers";
import { NowstrService } from "../src/services/nowstreaming/nowstrService";
import { NowstrRepository } from "../src/repositories/database/nowstreaming/nowstrRepository";
import { TwitchController } from "./controllers/twitchControllers";
import "./services/outerdateselect//youtubeScheduler";
dotenv.config();
async function main() {
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

  const talentrepository = new TalentRepository(connection);
  const talentservice = new TalentService(talentrepository);
  const talentcontroller = new TalentsController(talentservice);
  app.use("/api/", talentcontroller.router);

  const archiverepository = new ArchiveRepository(connection);
  const archiveservice = new ArchiveService(archiverepository);
  const archivecontroller = new ArchivesController(archiveservice);
  app.use("/api/", archivecontroller.router);

  const nowstrepository = new NowstrRepository(connection);
  const nowstrservice = new NowstrService(nowstrepository);
  const nowstrcontroller = new NowstrController(nowstrservice);
  app.use("/api/", nowstrcontroller.router);
  app.use("/api", (req, _res, next) => {
    console.log(`[API] ${req.method} ${req.path}  query=`, req.query);
    next();
  });

  const twitchControllers = new TwitchController();
  app.use("/", twitchControllers.router);
}
main();
