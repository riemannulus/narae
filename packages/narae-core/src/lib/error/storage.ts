export class StorageError extends Error {
  constructor(storage: string) {
    let message = "Storage [" + storage + "] has error. ";
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, StorageError.prototype);
  }
}

export class NotMachedIdStorageError extends StorageError {
  constructor(expected: string, got: string) {
    let message = "Storage [" + expected + "] has error. ";
    let detailedMessage ="ID not matched. expected: " + expected + " but got: " + got;
    super(message + detailedMessage);
  }
}
