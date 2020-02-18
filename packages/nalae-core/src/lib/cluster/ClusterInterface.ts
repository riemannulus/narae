export default interface ClusterInterface {
  write(filepath: string): boolean
  read(filepath: string): boolean
  getAvaliableStorageList(): Array<string>
  addStorage(storageName: string, key: object): boolean
}

