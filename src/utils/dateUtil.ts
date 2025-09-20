// export function convertUtcToJst(date: Date): string {
//   // UTC形式の日時を文字列に変換
//   const utcDateString: string = date.toISOString();

//   // UTC形式の日時文字列からUTCのDateオブジェクトを生成
//   const utcDate: Date = new Date(utcDateString);

//   // JST（日本標準時）のオフセットを計算（9時間 * 60分）
//   const jstOffset = 9 * 60;

//   // UTCのDateオブジェクトにオフセットを加算してJSTのDateオブジェクトを生成
//   const jstDate: Date = new Date(utcDate.getTime() + jstOffset * 60000);

//   // JSTのDateオブジェクトをISO 8601形式の文字列に変換
//   const jstDateString: string = jstDate.toISOString();

//   // JST形式の日時文字列を返す
//   return jstDateString;
// }
