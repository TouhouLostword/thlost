export class Reader {
  buffer: Buffer;
  offset: number;

  constructor(buffer: Buffer) {
    this.buffer = Buffer.from(buffer);
    this.offset = 0;
  }

  readByte(len = 1): Buffer {
    // retrieve part of buffer
    const read = this.buffer.slice(this.offset, this.offset + len);

    // increase offset
    this.offset = this.offset + len;

    // if buffer exist
    if (read) return read;

    throw new Error(`No ${len} bytes left`);
  }

  readString(len = 1): string {
    return this.readByte(len).toString('utf8');
  }

  readInt32LE(): number {
    return this.readByte(4).readInt32LE();
  }
}
