import { describe, it } from 'mocha'
import { expect } from 'chai'
import {Chunk, File} from "../src/lib/common";
import {JsonDBController, JsonDBModel} from "../src/lib/db/JsonDB";


let file: File;
let db: JsonDBController;
const fileName = 'test.txt';
const fileSize = 2048;
const chunkSize = 10;
describe('DB', function() {
  beforeEach(function() {
    file = new File(Buffer.from('*'.repeat(fileSize)), fileName);
    db = new JsonDBController('test.json');
  });

  describe('insert', function() {
    it('should be inserted file', function () {
      file.chop(1024);
      db.insert(file.fileMetadata);
    });
  });

});