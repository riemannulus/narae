import { AuthenticationError } from '../error';
import { IStorage } from './StorageInterface';


@IStorage.register
export default class MegaStorage{
  private readonly userId: string;
  private readonly passwd: string;
  constructor(key: any){
    if(!('userId' in key) || !('passwd' in key)){
      throw new AuthenticationError("Need Mega ID and Password.");
    }
    this.userId = key.userId;
    this.passwd = key.passwd;
  }
  public validate(): void {
    console.log("hello world!")
  }
  public download(filename: string): void {
    console.log(filename.concat(this.userId))
  }
  public upload(filename: string): void {
    console.log(filename.concat(this.passwd))
  }
}
