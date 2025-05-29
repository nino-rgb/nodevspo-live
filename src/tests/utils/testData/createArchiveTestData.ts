import { Connection, ResultSetHeader } from "mysql2/promise";
import { Archive } from "../../../models/live";

export async function createArchiveTestData(connection: Connection, num: number): Promise<Archive[]> {
  const archiveList: Archive[] = [];

  for (let index = 0; index < num; index++) {
    const archive: Archive = {
      outer_link: `outer_link_${index}`,
      talents_id: `talents_id_${index}`,
      video_title: `video_title_${index}`,
      video_thumbnail: `video_thumbnail_${index}`,
      open_date: new Date(),
    };
    const query = `insert into arvhices(outer_link,talents_id,video_title,video_thumbnail,open_date) values("${archive.open_date}","${archive.talents_id}","${archive.video_title}","${archive.video_thumbnail}","${archive.open_date}")`;
    const [result] = await connection.query<ResultSetHeader>(query);

    archive.id = result.insertId;
    archiveList.push(archive);
  }
  return archiveList;
}
