import { MasterRecord, MasterTable } from './primitive';

export type AbilityRecord = MasterRecord & {
  id: int;
  name: string;
  description: string;

  good_element_give_damage_rate: int;
  good_element_give_damage_ratef: float;
  good_element_take_damage_rate: int;
  good_element_take_damage_ratef: float;

  weak_element_give_damage_rate: int;
  weak_element_give_damage_ratef: float;
  weak_element_take_damage_rate: int;
  weak_element_take_damage_ratef: float;

  boost_power_divergence_range: int;
  boost_power_divergence_type: int;

  purge_barrier_diffusion_type: int;
  purge_barrier_diffusion_range: int;

  boost_ability_description: string;
  purge_ability_description: string;

  barrier_ability_description: string;
  element_ability_description: string;
  resist_ability_description: string;

  blackout_barrier_type: int;
  burning_barrier_type: int;
  electrified_barrier_type: int;
  frozen_barrier_type: int;
  poisoning_barrier_type: int;
};

export class AbilityTable extends MasterTable<AbilityRecord> {}
