import { describe, it } from 'mocha'
import { expect } from 'chai'
import {File, FileMetadata} from "../src/lib/model/file";
import {fileRepository} from "../src/lib/repository/FileRepository";


let file: File;
const fileName = 'test.txt';
const fileSize = 4000;
const chunkSize = 1024;
describe('Repository', function() {
  beforeEach(function() {
    file = new File(Buffer.from('*'.repeat(fileSize)), fileName);
  });

  describe('file', function() {
    it('should be inserted file', function () {
      file.chop(chunkSize);
      fileRepository.insert(file.metadata);

      let metadata: FileMetadata = fileRepository.findBy(file.metadata.name);
      expect(file.metadata).to.equal(metadata);
    });
  });

});