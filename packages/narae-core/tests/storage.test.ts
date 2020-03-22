import { describe, it } from 'mocha'
import { expect } from 'chai'
import {File, FileMetadata} from "../src/lib/model/file";
import {fileRepository} from "../src/lib/repository/FileRepository";
import {Chunk} from "../src/lib/model/chunk";
import DropboxStorage from "../src/lib/storage/DropboxStorage";
import environment from "./utils/environment";


let file: File;
let chunks: Array<Chunk>;
const fileName = 'test.txt';
const fileSize = 4000;
const chunkSize = 1024;
const drx: DropboxStorage = new DropboxStorage({ accessToken: environment.dropbox_key });
describe('Storage', function() {
  beforeEach(function() {
    file = new File(Buffer.from('*'.repeat(fileSize)), fileName);
    chunks = file.chop(chunkSize);
  });

  describe('Dropbox', function() {
    it('should be upload', async function (){
      await drx.push(chunks[0]).then(resp => {
        expect(file.metadata.name).to.equal(resp.name);
      });
    });
  });

});