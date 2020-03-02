import {createHash} from "crypto";


class GetHash {
  public static fromArrayString = (data: Array<string>) => {
    const hash = createHash('sha256');
    hash.update(data.toString());
    return hash.digest('hex');
  };

  public static fromArrayBuffer = (data: ArrayBuffer) => {
    const hash = createHash('md5');
    const buffer = FromArrayBuffer.toBuffer(data);
    hash.update(buffer.toString());
    return hash.digest('hex');
  }

}

class FromBuffer {
  public static toArrayBuffer = (buf) => {
    let ab: ArrayBuffer = new ArrayBuffer(buf.length);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }
}

class FromArrayBuffer {
  public static toBuffer = (ab) => {
    let buf: Buffer = Buffer.alloc(ab.byteLength);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
    }
    return buf;
  }
}

export {GetHash, FromArrayBuffer, FromBuffer}