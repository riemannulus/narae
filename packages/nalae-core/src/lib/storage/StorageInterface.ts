export interface StorageInterface {
  validate(): void;
  download(filename: string): void;
  upload(filepath: string): void;
}

export type StorageConstructor = new (t: any) => StorageInterface;

export function createStorage(
  ctor: StorageConstructor,
  key: any
): StorageInterface {
  return new ctor(key);
}
