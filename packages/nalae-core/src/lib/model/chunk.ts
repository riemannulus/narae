import {File} from "./file";
import Model from "./common";

export class ChunkMetadata {

  constructor(
    private readonly seq: number,
    private readonly hash: string,
    private storageId: string,
  ) {
  }

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

export class Chunk implements Model{

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