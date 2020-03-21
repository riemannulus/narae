import {File} from "../model/file"


export default abstract class ClusterAbstract {
  abstract write(file: File): void
  abstract read(filepath: string): File
  abstract delete(filepath: string): boolean
  abstract addStorage(storageName: string, key: object): boolean

}

