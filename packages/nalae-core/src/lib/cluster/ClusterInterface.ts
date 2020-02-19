export default interface ClusterInterface {
  write(buf: Buffer): string
  read(filepath: string): Buffer
  delete(filepath: string): boolean
  getAvaliableStorageList(): Array<string>
  addStorage(storageName: string, key: object): boolean
}

