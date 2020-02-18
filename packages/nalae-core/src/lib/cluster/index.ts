import { StorageInterface, createStorage } from 'lib/storage'


export interface ClusterInterface {
  write(filepath: string): boolean
  read(filepath: string): boolean
  getAvaliableStorageList(): Array<object>
  addStorage(storageName: string, key: object): boolean
}

export class NalaeCluster implements ClusterInterface {
  write(filepath: string): boolean {
    throw new Error("Method not implemented.");
  }
  read(filepath: string): boolean {
    throw new Error("Method not implemented.");
  }
  getAvaliableStorageList(): object[] {
    throw new Error("Method not implemented.");
  }
  addStorage(storageName: string, key: object): boolean {
    throw new Error("Method not implemented.");
  }

}