import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class File {

  constructor (
    @JsonProperty()
    private readonly name: string,
    @JsonProperty()
    private sectors: Array<Sector>
   ) {}
  
  public getName(): string {
    return this.name;
  }
}

@Serializable()
export class Sector {

  constructor (
    @JsonProperty()
    private readonly storageId: string,
    @JsonProperty()
    private readonly hash: string,
  ) {}
} 

