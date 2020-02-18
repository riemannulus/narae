interface StorageInterface {
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
  const implementations: Constructor<StorageInterface>[] = [];
  export function GetImplementations(): Constructor<StorageInterface>[] {
    return implementations;
  }
  export function register<T extends Constructor<StorageInterface>>(ctor: T) {
    implementations.push(ctor);
    return ctor;
  }
}
