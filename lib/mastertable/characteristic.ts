import { MasterRecord, MasterTable } from './primitive';

export type CharateristicRecord = MasterRecord & {
  id: int;

  characteristic1_name: string;
  characteristic1_description: string;
  characteristic1_type: int;
  characteristic1_rate: int;
  characteristic1_effect_subtype: int;
  characteristic1_effect_type: int;
  characteristic1_effect_value: int;
  characteristic1_icon_filename: string;

  characteristic2_name: string;
  characteristic2_description: string;
  characteristic2_type: int;
  characteristic2_rate: int;
  characteristic2_effect_subtype: int;
  characteristic2_effect_type: int;
  characteristic2_effect_value: int;
  characteristic2_icon_filename: int;

  characteristic3_name: string;
  characteristic3_description: string;
  characteristic3_type: int;
  characteristic3_rate: int;
  characteristic3_effect_subtype: int;
  characteristic3_effect_type: int;
  characteristic3_effect_value: int;
  characteristic3_icon_filename: string;

  trust_characteristic_avent_effect_subtype: int;
  trust_characteristic_avent_effect_type: int;
  trust_characteristic_description: string;
  trust_characteristic_name: string;
  trust_characteristic_rear_effect_subtype: int;
  trust_characteristic_rear_effect_type: int;
};

export class CharateristicTable extends MasterTable<CharateristicRecord> {}
