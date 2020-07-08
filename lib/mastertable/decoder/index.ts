import * as msgpack from '@msgpack/msgpack';
import * as crypto from 'crypto';
import { Reader } from './reader';

export class Decoder {
  static readonly SECRET_KEY = 'bhVDLWfSBWureNR3';
  static readonly XOR = 100;
  static readonly KEY_LENGTH = 16;

  static async unpack(buffer: Uint8Array, encrypt = true): Promise<object> {
    const decoded = encrypt ? Decoder.decrypt(buffer) : buffer;
    return msgpack.decode(decoded) as Promise<object>;
  }

  static generateKey(secret: string, xor: number): Uint8Array {
    const arr = Array.from(secret, v => v.charCodeAt(0));

    for (let i = 0; i < secret.length; ++i) arr[i] ^= xor << (i & 1);
    const str = String.fromCharCode.apply(null, arr);

    return Uint8Array.from(
      // To UTF-8
      unescape(encodeURIComponent(str)).substr(0, Decoder.KEY_LENGTH),
      v => v.charCodeAt(0)
    );
  }

  static decrypt(buffer: Uint8Array): Uint8Array {
    const reader = new Reader(Buffer.from(buffer));

    const iv = reader.readByte(Decoder.KEY_LENGTH);
    const key = Decoder.generateKey(Decoder.SECRET_KEY, Decoder.XOR);

    const aes = crypto.createDecipheriv('aes-128-cbc', key, iv);

    let outbuf = aes.update(reader.readByte(0x400));
    while (reader.offset <= buffer.length)
      outbuf = Buffer.concat([outbuf, aes.update(reader.readByte(0x400))]);

    outbuf = Buffer.concat([outbuf, aes.final()]);

    return outbuf;
  }
}
