import { Connection, ResultSetHeader } from "mysql2/promise";
import { Archive } from "../../../models/live";
import * as dotenv from "dotenv";
dotenv.config();

export async function createArchiveTestData(connection: Connection, num: number): Promise<Archive[]> {
  const archiveList: Archive[] = [];
  const openDate = new Date(Date.UTC(2025, 4, 29, 21, 0, 0));

  for (let index = 0; index < num; index++) {
    const archive: Archive = {
      outer_link: `outer_link_${Date.now()}_${index}`,
      talents_id: index + 1,
      video_title: `video_title_${index}`,
      video_thumbnail: `video_thumbnail_${index}`,
      open_date: openDate,
    };

    const formattedDate = archive.open_date.toISOString().slice(0, 23).replace("T", " ");

    const query = `insert into archives(outer_link,talents_id,video_title,video_thumbnail,open_date) values("${archive.outer_link}","${archive.talents_id}","${archive.video_title}","${archive.video_thumbnail}","${formattedDate}")`;
    console.log("Insert Query:", query);
    try {
      const [result] = await connection.query<ResultSetHeader>(query);
      archive.id = result.insertId;
      archiveList.push(archive);
    } catch (err) {
      console.error("Insert failed:", err, archive);
      throw err;
    }
    console.log("Created archives count:", archiveList.length);
    console.log("open_date:", archive.open_date.toISOString());
  }
  return archiveList;
}
