import { describe, it } from 'mocha'
import { expect } from 'chai'
import {Chunk, File} from "../src/lib/common";


let file: File;
const fileName = 'test.txt';
const fileSize = 2048;
const chunkSize = 10;
describe('File', function() {
  beforeEach(function() {
    file = new File(Buffer.from('*'.repeat(fileSize)), fileName);
  });

  describe('chunks', function() {
    it('should be equal size to expected size', function () {
      const expectedChunkCount: number = Math.ceil(fileSize/chunkSize);
      const chunks: Array<Chunk> = file.chop(chunkSize);
      expect(chunks.length).to.equal(expectedChunkCount);
    });
  });

  describe('combined chunks', function () {
    it('should be equal size to original file', function() {
      const chunks: Array<Chunk> = file.chop(chunkSize);
      const combinedChunks = Chunk.combine(chunks, fileName);
      expect(combinedChunks.size).to.equal(fileSize);
    });

    it('should be equal hash to original file', function () {
      const chunks: Array<Chunk> = file.chop(chunkSize);
      const combinedChunks = Chunk.combine(chunks, fileName);
      expect(combinedChunks.hash()).to.equal(file.hash());
    });
  });

});