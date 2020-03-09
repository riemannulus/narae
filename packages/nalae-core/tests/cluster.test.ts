import { describe, it } from 'mocha'
import { expect } from 'chai'
import { NalaeCluster } from '../src/lib/cluster'
import {MegaStorage, StorageInterface} from "../src/lib/storage";
import {File} from "../src/lib/model/file";
import {fileRepository} from "../src/lib/repository/FileRepository";


let storageList: Array<StorageInterface>;
describe('cluster', function() {
  before(function() {
    storageList = Array<StorageInterface>();
    storageList.push(new MegaStorage({userId: 'test', passwd: 'test2'}))
  });

  describe('write', function() {
    it('should be write file success', function () {
      let cluster = new NalaeCluster(storageList, 500);
      let file: File = new File(Buffer.from('*'.repeat(4096)), 'test2.txt');
      cluster.write(file);

      let metadata = fileRepository.findBy(file.metadata.name);

      expect(file.metadata).to.equal(metadata);
    });
  });

});