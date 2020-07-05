import { Decoder } from './decoder';

export type MasterRecord = object;

export abstract class MasterTable<TRec extends MasterRecord> {
  protected table: Record<string, TRec> = {};

  async init(msgpack: Uint8Array, encrypted?: boolean): Promise<void>;
  async init(json: string): Promise<void>;
  async init(data: Uint8Array | string, encrypted = true): Promise<void> {
    if (typeof data === 'string') {
      this.table = JSON.parse(data);
      return;
    }
    this.table = (await Decoder.unpack(data, encrypted)) as Record<
      string,
      TRec
    >;
  }

  get(key: string | int): TRec | undefined {
    return this.table[key];
  }

  find(compareFn: (record: TRec) => boolean): TRec | undefined {
    for (const rec of this.toArray()) if (compareFn(rec)) return rec;

    return undefined;
  }

  findAll(compareFn: (record: TRec) => boolean): TRec[] {
    return this.toArray().filter(rec => compareFn(rec));
  }

  findCount(compareFn: (record: TRec) => boolean): number {
    return this.findAll(compareFn).length;
  }

  toArray(): TRec[] {
    return Object.keys(this.table).map(k => this.table[k]);
  }

  async toJSON(): Promise<string> {
    return JSON.stringify(this.table);
  }
}
