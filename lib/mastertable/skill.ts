import { MasterRecord, MasterTable } from './primitive';

export type SkillRecord = MasterRecord & {
  id: int;
  name: string;
  description: string;
  icon_filename: string;

  effect1_id: int;
  effect1_level_type: int;
  effect1_level_value: int;
  effect2_id: int;
  effect2_level_type: int;
  effect2_level_value: int;
  effect3_id: int;
  effect3_level_type: int;
  effect3_level_value: int;
  exp_id: int;
  level1_turn: int;
  level10_turn: int;
  level2_turn: int;
  level3_turn: int;
  level4_turn: int;
  level5_turn: int;
  level6_turn: int;
  level7_turn: int;
  level8_turn: int;
  level9_turn: int;
  type: int;
};

export type SkillEffectRecord = MasterRecord & {
  id: int;
  name: string;
  description: string;
  icon_filename: string;

  type: int;
  subtype: int;
  range: int;
  turn: int;

  level1_add_value: int;
  level1_success_rate: int;
  level1_value: int;

  level2_add_value: int;
  level2_success_rate: int;
  level2_value: int;

  level3_add_value: int;
  level3_success_rate: int;
  level3_value: int;

  level4_add_value: int;
  level4_success_rate: int;
  level4_value: int;

  level5_add_value: int;
  level5_success_rate: int;
  level5_value: int;

  level6_add_value: int;
  level6_success_rate: int;
  level6_value: int;

  level7_add_value: int;
  level7_success_rate: int;
  level7_value: int;

  level8_add_value: int;
  level8_success_rate: int;
  level8_value: int;

  level9_add_value: int;
  level9_success_rate: int;
  level9_value: int;

  level10_add_value: int;
  level10_success_rate: int;
  level10_value: int;
};

export class SkillTable extends MasterTable<SkillRecord> {}

export class SkillEffectTable extends MasterTable<SkillEffectRecord> {}
