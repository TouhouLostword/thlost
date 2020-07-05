import { MasterRecord, MasterTable } from './primitive';

export type RaceRecord = MasterRecord & {
  id: 4;
  name: string;
  description: string;
};

export class RaceTable extends MasterTable<RaceRecord> {}
