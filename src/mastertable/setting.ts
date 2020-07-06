import { MasterRecord, MasterTable } from './primitive';

export type SettingRecord = MasterRecord & {
  description: string;
  key: string;
  value: string | int;
};

export class SettingTable extends MasterTable<SettingRecord> {
  async init(msgpack: Uint8Array, encrypted?: boolean): Promise<void>;
  async init(json: string): Promise<void>;
  async init(data: Uint8Array | string, encrypted = true): Promise<void> {
    if (typeof data === 'string') await super.init(data);
    else await super.init(data, encrypted);
    for (const [, v] of Object.entries(this.table)) v.value = Number(v.value);
  }
}
