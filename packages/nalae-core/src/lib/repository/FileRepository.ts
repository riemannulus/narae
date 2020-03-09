import {readFileSync, writeFile} from "fs";
import {File, FileMetadata} from "../model/file";
import {Dictionary} from "../common/interface";

export default class FileRepository {
  private readonly db: Dictionary<FileMetadata>;
  private readonly dbPath: string = 'file.json';
  constructor() {
    try{
      const jsonString: string = readFileSync(this.dbPath).toString();
      const dbJson = JSON.parse(jsonString);
      this.db = <{[Key: string]: FileMetadata }> dbJson;
    } catch (e) {
      this.db = {};
    }
  }

  private saveFile(): void {
    writeFile(this.dbPath, JSON.stringify(this.db), function (err) {
      if (err) console.log();
    });
  }

  public insert(data: File): void {
    this.db[data.fileMetadata.name] = data.fileMetadata;
    this.saveFile();
  }
}
