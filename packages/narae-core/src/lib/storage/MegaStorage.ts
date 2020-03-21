import {AuthenticationError} from '../error';
import {Chunk, ChunkMetadata} from "../model/chunk";
import {IStorage} from './StorageInterface';
import {Storage} from 'megajs'
import {NotMachedIdStorageError} from "../error/storage";
import {GetHash} from "../common/utils";


@IStorage.register
export default class MegaStorage{
  private readonly userId: string;
  private readonly passwd: string;
  private readonly session: Storage;
  private readonly storageId: string;
  constructor(key: any){
    if(!('userId' in key) || !('passwd' in key)){
      throw new AuthenticationError("Need Mega ID and Password.");
    }

    this.userId = key.userId;
    this.passwd = key.passwd;
    this.session = new Storage({
      email: this.userId,
      password: this.passwd,
    });
    this.storageId = GetHash.fromArrayString([this.userId, this.passwd]);
  }
  public usedSpace(): number {
    let spaceUsed: number = 0;
    this.session.getAccountInfo(account => {
      spaceUsed = account.spaceUsed;
    });
    return spaceUsed
  }
  public fetch(chunkMetadata: ChunkMetadata): Chunk {
    if (chunkMetadata.getStorageId() === this.storageId){
      throw new NotMachedIdStorageError(this.storageId, chunkMetadata.getStorageId());
    }
    return new Chunk(chunkMetadata, Buffer.from('*'.repeat(100)));
  }
  public push(chunk: Chunk): string {
    return 'filename'
  }
  public getStorageId(): string {
    return this.storageId;
  }
}
