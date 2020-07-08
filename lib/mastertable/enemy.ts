import { MasterRecord, MasterTable } from './primitive';

export type EnemyRecord = MasterRecord & {
  id: int;
  unit_id: int;

  name: string;

  level: int;
  life_point: int;
  yang_attack: int;
  yang_defence: int;
  yin_attack: int;
  yin_defence: int;
  speed: int;

  type: int;
  barrier_count: int;
  costume_id: int;

  condition_action_lessthan10_normal_weight: int;
  condition_action_lessthan10_skill1_weight: int;
  condition_action_lessthan10_skill2_weight: int;
  condition_action_lessthan10_skill3_weight: int;
  condition_action_over10_normal_weight: int;
  condition_action_over10_skill1_weight: int;
  condition_action_over10_skill2_weight: int;
  condition_action_over10_skill3_weight: int;
  condition_action_over25_normal_weight: int;
  condition_action_over25_skill1_weight: int;
  condition_action_over25_skill2_weight: int;
  condition_action_over25_skill3_weight: int;
  condition_action_over50_normal_weight: int;
  condition_action_over50_skill1_weight: int;
  condition_action_over50_skill2_weight: int;
  condition_action_over50_skill3_weight: int;
  defeat_drop_resource_item: int;
  normal_action_shot1_weight: int;
  normal_action_shot2_weight: int;

  shot1_boost_count: int;
  shot1_id: int;
  shot1_level: int;

  shot2_boost_count: int;
  shot2_id: int;
  shot2_level: int;

  skill1_id: int;
  skill1_level: int;

  skill2_id: int;
  skill2_level: int;

  skill3_id: int;
  skill3_level: int;

  special_action_gauge_limit: int;
  special_action_spellcard1_weight: int;
  special_action_spellcard2_weight: int;
  special_action_spellcard3_weight: int;
  special_action_spellcard4_weight: int;
  special_action_spellcard5_weight: int;

  spellcard1_boost_count: int;
  spellcard1_id: int;
  spellcard1_level: int;

  spellcard2_boost_count: int;
  spellcard2_id: int;
  spellcard2_level: int;

  spellcard3_boost_count: int;
  spellcard3_id: int;
  spellcard3_level: int;

  spellcard4_boost_count: int;
  spellcard4_id: int;
  spellcard4_level: int;

  spellcard5_boost_count: int;
  spellcard5_id: int;
  spellcard5_level: int;
};

export class EnemyTable extends MasterTable<EnemyRecord> {}
