interface IStorage {
  // add some methods or something to distinguish from {}
  validate(): void;
  download(filename: string): void;
  upload(filepath: string): void;
}

// add a registry of the type you expect
export namespace IStorage {
  type Constructor<T> = {
    new(...args: any[]): T;
    readonly prototype: T;
  }
  const implementations: Constructor<IStorage>[] = [];
  export function GetImplementations(): Constructor<IStorage>[] {
    return implementations;
  }
  export function register<T extends Constructor<IStorage>>(ctor: T) {
    implementations.push(ctor);
    return ctor;
  }
}
