import { MasterRecord, MasterTable } from './primitive';

export type ResistRecord = MasterRecord & {
  id: int;
  description: string;
  name: string;
  element1_resistance: int;
  element2_resistance: int;
  element3_resistance: int;
  element4_resistance: int;
  element5_resistance: int;
  element6_resistance: int;
  element7_resistance: int;
  element8_resistance: int;
};

export class ResistTable extends MasterTable<ResistRecord> {
  static readonly ELEMENT_RESISTANCE_WEAK = 0;
  static readonly ELEMENT_RESISTANCE_USUALLY = 1;
  static readonly ELEMENT_RESISTANCE_STRING = 2;
}
