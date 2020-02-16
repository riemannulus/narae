import { 
  createStorage,
  MegaStorage,
} from 'nalae-core'

function main() {
  const megastorage = createStorage(MegaStorage, {userId: "id", passwd: "passwd"})
  megastorage.validate();
  megastorage.download("hello world!");
}

main();