import { IStorage } from './lib/storage';

function main() {
  let storageList = IStorage.GetImplementations();
  storageList.forEach(storage => {
    console.log(storage['name']);
  });
}

main()
