import { MasterRecord, MasterTable } from './primitive';

export type UnitRecord = MasterRecord & {
  id: int;
  name: string;
  alias_name: string;
  short_name: string;
  drop_text: string;

  life_point: int;
  yang_attack: int;
  yang_defense: int;
  yin_attack: int;
  yin_defense: int;
  speed: int;

  role: int;

  ability_id: int;
  album_id: int;
  exp_id: int;
  person_id: int;
  recycle_id: int;
  resist_id: int;
  default_costume_id: int;
  characteristic_id: int;

  skill1_id: int;
  skill2_id: int;
  skill3_id: int;

  shot1_id: int;
  shot2_id: int;

  spellcard1_id: int;
  spellcard2_id: int;
  spellcard3_id: int;
  spellcard4_id: int;
  spellcard5_id: int;
};

export type UnitRaceRecord = MasterRecord & {
  id: int;
  race_id: int;
  unit_id: int;
};

export type UnitLevelLimitbreakGrowthRecord = MasterRecord & {
  id: int;
  growth_rate: float;
  level_max: int;
  level_limitbreak: int;
  level_lower_limit: int;
  use_spellcard_count_max: int;
  consume_gold: int;
  consume_same_unit_count: int;
};

export type UnitRankPromoteGrowthRecord = MasterRecord & {
  id: int;
  rank: int;
  growth_rate: float;
  slot_set_add_growth_rate: float;
  level_lower_limit: int;
  skill_count_max: int;
  characteristic_count_max: int;
  consume_gold: int;
};

export type UnitRankPromoteRecord = MasterRecord & {
  unit_id: int;
  id: int;
  rank: int;

  slot1_object_id: int;
  slot1_object_type: int;
  slot1_object_value: int;

  slot2_object_id: int;
  slot2_object_type: int;
  slot2_object_value: int;

  slot3_object_id: int;
  slot3_object_type: int;
  slot3_object_value: int;

  slot4_object_id: int;
  slot4_object_type: int;
  slot4_object_value: int;

  slot5_object_id: int;
  slot5_object_type: int;
  slot5_object_value: int;

  slot6_object_id: int;
  slot6_object_type: int;
  slot6_object_value: int;
};

export type UnitRareAwakenGrowthRecord = MasterRecord & {
  id: int;
  rare: int;
  spellcard_level: int;
  growth_rate: float;
  consume_piece: int;
};

export type UnitTrustGrowthRecord = MasterRecord & {
  id: int;
  trust_rank: int;
  description: string;
  growth_rate: float;
  trust_upper_limit: int;
};

export type UnitExpRecord = MasterRecord & {
  id: int;
  exp_id: int;
  level: int;
  exp: int;
  growth_rate: float;
  spec_actualize_limit_rate: float;
};

export type UnitPhantasmCostRecord = MasterRecord & {
  id: int;
  level_limitbreak: int;
  phantasm_cost: int;
  rare: int;
};

export class UnitTable extends MasterTable<UnitRecord> {}

export class UnitRaceTable extends MasterTable<UnitRaceRecord> {}

export class UnitLevelLimitbreakGrowthTable extends MasterTable<
  UnitLevelLimitbreakGrowthRecord
> {
  last(): UnitLevelLimitbreakGrowthRecord {
    return this.toArray().reduce((p, v) => {
      return p.level_limitbreak > v.level_limitbreak ? p : v;
    });
  }
}

export class UnitRankPromoteGrowthTable extends MasterTable<
  UnitRankPromoteGrowthRecord
> {
  last(): UnitRankPromoteGrowthRecord {
    return this.toArray().reduce((p, v) => {
      return p.rank > v.rank ? p : v;
    });
  }
}

export class UnitRankPromoteTable extends MasterTable<UnitRankPromoteRecord> {
  find(
    compareFn: (record: UnitRankPromoteRecord) => boolean
  ): UnitRankPromoteRecord | undefined;

  find(unitId: int, rank: int): UnitRankPromoteRecord | undefined;

  find(
    param1: int | Function,
    param2?: int
  ): UnitRankPromoteRecord | undefined {
    if (typeof param1 === 'function')
      return super.find(param1 as (record: UnitRankPromoteRecord) => boolean);

    return super.find(r => {
      return r.unit_id === param1 && r.rank === param2;
    });
  }
}

export class UnitRareAwakenGrowthTable extends MasterTable<
  UnitRareAwakenGrowthRecord
> {
  last(): UnitRareAwakenGrowthRecord {
    return this.toArray().reduce((p, v) => {
      return p.rare > v.rare ? p : v;
    });
  }
}

export class UnitTrustGrowthTable extends MasterTable<UnitTrustGrowthRecord> {
  last(): UnitTrustGrowthRecord {
    return this.toArray().reduce((p, v) => {
      return p.trust_rank > v.trust_rank ? p : v;
    });
  }

  findTrust(trust: int): UnitTrustGrowthRecord {
    return this.toArray().reduce((p, v) => {
      return trust >= v.trust_upper_limit ? v : p;
    });
  }
}

export class UnitExpTable extends MasterTable<UnitExpRecord> {
  last(expId: int): UnitExpRecord {
    return this.toArray()
      .filter(v => v.exp_id === expId)
      .reduce((p, v) => {
        return p.level > v.level ? p : v;
      });
  }

  find(
    compareFn: (record: UnitExpRecord) => boolean
  ): UnitExpRecord | undefined;

  find(expId: int, level: int): UnitExpRecord | undefined;

  find(param1: int | Function, param2?: int): UnitExpRecord | undefined {
    if (typeof param1 === 'function')
      return super.find(param1 as (record: UnitExpRecord) => boolean);

    return super.find(r => {
      return r.exp_id === param1 && r.level === param2;
    });
  }
}

export class UnitPhantasmCostTable extends MasterTable<UnitPhantasmCostRecord> {
  find(
    compareFn: (record: UnitPhantasmCostRecord) => boolean
  ): UnitPhantasmCostRecord | undefined;

  find(rare: int, levelLimitbreak: int): UnitPhantasmCostRecord | undefined;

  find(
    param1: int | Function,
    param2?: int
  ): UnitPhantasmCostRecord | undefined {
    if (typeof param1 === 'function')
      return super.find(param1 as (record: UnitPhantasmCostRecord) => boolean);

    return super.find(r => {
      return r.rare === param1 && r.level_limitbreak === param2;
    });
  }
}
