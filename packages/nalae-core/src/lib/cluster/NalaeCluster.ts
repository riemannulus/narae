import { IStorage } from '../storage'
import ClusterInterface from './ClusterInterface'

export default class NalaeCluster implements ClusterInterface {
  write(filepath: string): boolean {
    throw new Error("Method not implemented.");
  }
  read(filepath: string): boolean {
    throw new Error("Method not implemented.");
  }
  getAvaliableStorageList(): string[] {
    return IStorage.GetImplementations().map(x=>x.name);
  }
  addStorage(storageName: string, key: object): boolean {
    throw new Error("Method not implemented.");
  }

}