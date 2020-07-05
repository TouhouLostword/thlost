import { MasterRecord, MasterTable } from './primitive';

export type SpellcardRecord = MasterRecord & {
  id: int;
  name: string;
  description: string;
  specification: string;

  type: int;

  magazine0_bullet_id: int;
  magazine0_bullet_power_rate: int;
  magazine0_bullet_range: int;
  magazine0_bullet_value: int;

  magazine1_boost_count: int;
  magazine1_bullet_id: int;
  magazine1_bullet_power_rate: int;
  magazine1_bullet_range: int;
  magazine1_bullet_value: int;

  magazine2_boost_count: int;
  magazine2_bullet_id: int;
  magazine2_bullet_power_rate: int;
  magazine2_bullet_range: int;
  magazine2_bullet_value: int;

  magazine3_boost_count: int;
  magazine3_bullet_id: int;
  magazine3_bullet_power_rate: int;
  magazine3_bullet_range: int;
  magazine3_bullet_value: int;

  magazine4_boost_count: int;
  magazine4_bullet_id: int;
  magazine4_bullet_power_rate: int;
  magazine4_bullet_range: int;
  magazine4_bullet_value: int;

  magazine5_boost_count: int;
  magazine5_bullet_id: int;
  magazine5_bullet_power_rate: int;
  magazine5_bullet_range: int;
  magazine5_bullet_value: int;

  phantasm_power_up_rate: int;

  shot_level0_power_rate: int;
  shot_level1_power_rate: int;
  shot_level2_power_rate: int;
  shot_level3_power_rate: int;
  shot_level4_power_rate: int;
  shot_level5_power_rate: int;

  spellcard_skill1_effect_id: int;
  spellcard_skill1_level_type: int;
  spellcard_skill1_level_value: int;
  spellcard_skill1_timing: int;

  spellcard_skill2_effect_id: int;
  spellcard_skill2_level_type: int;
  spellcard_skill2_level_value: int;
  spellcard_skill2_timing: int;

  spellcard_skill3_effect_id: int;
  spellcard_skill3_level_type: int;
  spellcard_skill3_level_value: int;
  spellcard_skill3_timing: int;

  spellcard_skill4_effect_id: int;
  spellcard_skill4_level_type: int;
  spellcard_skill4_level_value: int;
  spellcard_skill4_timing: int;

  spellcard_skill5_effect_id: int;
  spellcard_skill5_level_type: int;
  spellcard_skill5_level_value: int;
  spellcard_skill5_timing: int;
};

export class SpellcardTable extends MasterTable<SpellcardRecord> {}
