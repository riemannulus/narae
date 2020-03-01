import { IStorage, StorageInterface } from '../storage'
import ClusterInterface from './ClusterInterface'

export default class NalaeCluster implements ClusterInterface {
  private storageList: Array<StorageInterface>;

  constructor(){
    //TODO: 
  }

  write(buf: Buffer): string {
    throw new Error("Method not implemented.");
  }
  read(filepath: string): Buffer {
    throw new Error("Method not implemented.");
  }
  delete(filepath: string): boolean {
    throw new Error("Method not implemented.");
  }
  getAvailableStorageList(): string[] {
    return IStorage.GetImplementations().map(x=>x.name);
  }
  addStorage(storageName: string, key: object): boolean {
    
    throw new Error("Method not implemented.");
  }

}