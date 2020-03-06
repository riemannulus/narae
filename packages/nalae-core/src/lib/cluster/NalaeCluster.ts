import { IStorage, StorageInterface } from '../storage'
import ClusterAbstract from './ClusterAbstract'
import {Chunk, File} from "../common";

export default class NalaeCluster extends ClusterAbstract {

  constructor(
    private storageList: Array<StorageInterface>,
    private readonly chunkSize: number
  ){
    super();
  }

  public static getAvailableStorageList(): string[] {
    return IStorage.GetImplementations().map(x=>x.name);
  }
  public write(file: File): void {
    let choppedData: Array<Chunk> = file.chop(this.chunkSize);
    choppedData.forEach((chunk, index)=>{
      let currentStorage: StorageInterface = this.storageList[index % this.storageList.length];
      currentStorage.pull(chunk);
      chunk.setStorageId(currentStorage.getStorageId());
    });

  }
  public read(filepath: string): File {
    throw new Error("Method not implemented.");
  }
  public delete(filepath: string): boolean {
    throw new Error("Method not implemented.");
  }
  public addStorage(storageName: string, key: object): boolean {
    
    throw new Error("Method not implemented.");
  }

}