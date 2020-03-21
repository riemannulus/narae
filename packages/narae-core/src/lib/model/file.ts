import {GetHash} from "../common/utils";
import {appendFile} from "fs";
import {Chunk, ChunkMetadata} from "./chunk";
import Model from "./common";

export class FileMetadata {
  private chunkMetadataArray: Array<ChunkMetadata>;

  constructor(
    public readonly name: string
  ) {
    this.chunkMetadataArray = new Array<ChunkMetadata>();
  }

  public addChunkMetaData(data: ChunkMetadata): void {
    this.chunkMetadataArray.push(data);
  }

  public getChunkMetaData(): Array<ChunkMetadata> {
    return this.chunkMetadataArray;
  }
}

export class File implements Model{

  public readonly size: number;
  public metadata: FileMetadata;

  constructor(
    private readonly buffer: ArrayBuffer,
    name: string,
  ) {
    this.size = buffer.byteLength;
    this.metadata = new FileMetadata(name);
  }

  public toJson(): string {
    throw new Error("Method not implemented.");
  }

  public chop(chunkSize: number): Array<Chunk> {
    const chunks: Array<Chunk> = [];
    const numberOfSlice = Math.floor(this.size / chunkSize);
    const modSize = this.size % chunkSize;

    for (let i = 0; i < numberOfSlice; i++) {
      let startByte = i * chunkSize;
      let endByte = startByte + chunkSize;

      let chunk = this.buffer.slice(startByte, endByte);
      let metadata = new ChunkMetadata(i, GetHash.fromArrayBuffer(chunk), null);
      chunks.push(new Chunk(metadata, chunk));
      this.metadata.addChunkMetaData(metadata);
    }
    let mod = this.size - modSize;

    let lastChunk = this.buffer.slice(mod, this.size);
    let metadata = new ChunkMetadata(numberOfSlice, GetHash.fromArrayBuffer(lastChunk), null);

    chunks.push(new Chunk(metadata, lastChunk));
    this.metadata.addChunkMetaData(metadata);

    return chunks
  }

  public hash(): string {
    return GetHash.fromArrayBuffer(this.buffer);
  }

  public save(filepath: string): void {
    let uint8: Uint8Array = new Uint8Array(this.buffer);
    appendFile(filepath, uint8, function (err) {
      if (err) {
        //TODO: change to logger
        console.log('somthing happend');
      }
    });
  }
}