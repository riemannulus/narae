import { describe, it } from 'mocha'
import { NalaeCluster } from '../src/lib/cluster'
import {MegaStorage, StorageInterface} from "../src/lib/storage";
import {File} from "../src/lib/model/file";


let storageList: StorageInterface[];
describe('cluster', function() {
  before(function() {
    storageList.push(new MegaStorage({userId: 'test', passwd: 'test2'}))
  });

  describe('write', function() {
    it('should be write file success', function () {
      let cluster = new NalaeCluster(storageList, 500);
      let file: File = new File(Buffer.from('*'.repeat(4096)), 'test.txt');
      cluster.write(file);
    });
  });

});