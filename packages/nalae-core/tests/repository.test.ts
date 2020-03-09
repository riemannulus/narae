import { describe, it } from 'mocha'
import {File} from "../src/lib/model/file";
import FileRepository from "../src/lib/repository/FileRepository";


let file: File;
let db: FileRepository;
const fileName = 'test.txt';
const fileSize = 4000;
const chunkSize = 1024;
describe('Repository', function() {
  beforeEach(function() {
    file = new File(Buffer.from('*'.repeat(fileSize)), fileName);
    db = new FileRepository();
  });

  describe('file', function() {
    it('should be inserted file', function () {
      file.chop(chunkSize);
      db.insert(file);
    });
  });

});