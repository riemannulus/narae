import {MegaStorage, StorageInterface, createStorage} from './lib/storage';

function main() {
  let storage = createStorage(
    MegaStorage, {
      userId: "suho",
      passwd: "asdf1234"
    }
  );
  storage.validate();
}

main()
