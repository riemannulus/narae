import {GetHash} from "./utils";
import {appendFile} from "fs";

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
  public getChunkMetaData(): Array<ChunkMetadata>{
    return this.chunkMetadataArray;
  }
}

export class File{
  public readonly size: number;
  public fileMetadata: FileMetadata;
  constructor(
    private readonly buffer: ArrayBuffer,
    name: string,
  ) {
    this.size = buffer.byteLength;
    this.fileMetadata = new FileMetadata(name);
  }

  public chop(chunkSize: number): Array<Chunk> {
    const chunks: Array<Chunk> = [];
    const numberOfSlice = Math.floor(this.size / chunkSize);
    const modSize = this.size % chunkSize;

    for (let i = 0; i < numberOfSlice; i++) {
      let startByte = i * chunkSize;
      let endByte = startByte + chunkSize;

      let chunk = this.buffer.slice(startByte, endByte);
      let metadata = new ChunkMetadata(i,GetHash.fromArrayBuffer(chunk), null);
      chunks.push(new Chunk(metadata, chunk));
      this.fileMetadata.addChunkMetaData(metadata);
    }
    let mod = this.size - modSize;

    let lastChunk = this.buffer.slice(mod, this.size);
    let metadata = new ChunkMetadata(numberOfSlice, GetHash.fromArrayBuffer(lastChunk), null);

    chunks.push(new Chunk(metadata, lastChunk));
    this.fileMetadata.addChunkMetaData(metadata);

    return chunks
  }

  public hash(): string {
    return GetHash.fromArrayBuffer(this.buffer);
  }

  public save(filepath: string): void {
    let uint8: Uint8Array = new Uint8Array(this.buffer);
    appendFile(filepath, uint8, function (err) {
      if (err){
        //TODO: change to logger
        console.log('somthing happend');
      }
    });
  }


}

export class ChunkMetadata {

  constructor (
    private readonly seq: number,
    private readonly hash: string,
    private storageId: string,
  ) {}

  public getSeq(): number {
    return this.seq;
  }
  public getStorageId(): string {
    return this.storageId;
  }
  public setStorageId(storageId: string): string {
    this.storageId = storageId;
    return this.storageId;
  }
}

export class Chunk {

  constructor(
    private readonly metaData: ChunkMetadata,
    private readonly buffer: ArrayBuffer,
  ) {
  }

  public getSeq(): number {
    return this.metaData.getSeq();
  }
  public getStorageId(): string {
    return this.metaData.getStorageId();
  }
  public getSize(): number {
    return this.buffer.byteLength;
  }
  public getUint8(): Uint8Array {
    return new Uint8Array(this.buffer);
  }
  public setStorageId(storageId: string): string {
    this.metaData.setStorageId(storageId);
    return this.metaData.getStorageId();
  }

  public static sort(chunks: Array<Chunk>): Array<Chunk> {
    chunks.sort((left, right) => {
      if (left.getSeq() > right.getSeq()) return 1;
      if (left.getSeq() < right.getSeq()) return -1;
      return 0;
    });
    return chunks;
  }


  public static combine(chunks: Array<Chunk>, name: string): File {
    let bufferSize = 0;
    let sortedChunk = Chunk.sort(chunks);
    sortedChunk.forEach(function (chunk) {
      bufferSize = bufferSize + chunk.getSize();
    });
    let tmp = new Uint8Array(bufferSize);
    let nextBytes = 0;
    sortedChunk.forEach(function (chunk) {
      tmp.set(chunk.getUint8(), nextBytes);
      nextBytes += chunk.getSize();
    });

    return new File(tmp.buffer, name);
  }
}