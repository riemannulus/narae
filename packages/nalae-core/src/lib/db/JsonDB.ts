import {readFile, readFileSync, writeFile} from "fs";
import {FileMetadata} from "../common/model";

export class JsonDBModel{
  files: FileMetadata[];
}

export class JsonDBController {
  private db: JsonDBModel;
  private dbpath: string;
  constructor(dbpath: string) {
    this.dbpath = dbpath;
    const jsonString: string = readFileSync(dbpath).toString();
    const dbJson = JSON.parse(jsonString);
    this.db = <JsonDBModel> dbJson;
  }

  private saveFile(): void {
    writeFile(this.dbpath, JSON.stringify(this.db), function (err) {
      if (err) console.log();
    });
  }

  public insert(data: FileMetadata): void {
    this.db.files.push(data);
    this.saveFile();
  }
}

