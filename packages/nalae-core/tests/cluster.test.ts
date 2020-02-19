import { describe, it } from 'mocha'
import { expect } from 'chai'
import { NalaeCluster, ClusterInterface } from '../src/lib/cluster'


let cluster: ClusterInterface;
let filename: string;
const filesize: number = 123412341;

describe('cluster', function() {
  before(function() {
    cluster = new NalaeCluster();
  })
  beforeEach(function() {
    filename = cluster.write(Buffer.from('*'.repeat(filesize)));
  });

  describe('read', function() {
    it('should be read file success', function () {
      let buf = cluster.read(filename);
      expect(buf.toString).to.be('*'.repeat(filesize))
    }); 
  });

  describe('delete', function () {
    it('should be delete file success', function() {
      let status = cluster.delete(filename);
      expect(status).is.true;
    });
  });

  describe('file list', function () {
    it('should be get all file list success', function () {
      
    });
  });
});