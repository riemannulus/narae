import {readFileSync, writeFile} from "fs";
import {File, FileMetadata} from "../model/file";
import {Dictionary} from "../common/interface";

class FileRepository {
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

  public insert(data: FileMetadata): void {
    this.db[data.name] = data;
    this.saveFile();
  }

  public findBy(name: string): FileMetadata {
    return this.db[name];
  }
}

export const fileRepository = new FileRepository();
