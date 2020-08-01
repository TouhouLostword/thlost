import { Generator } from './index';
import {
  UnitRecord,
  DB,
  ShotRecord,
  SpellcardRecord,
  SkillEffectRecord,
  SkillRecord,
  AbilityRecord,
  CharacteristicRecord,
  ResistRecord
} from '../mastertable';

import { BulletElement, EffectType } from '../battle/constant';

export type UnitGeneratorData = {
  name: string;
  alias: string;
  life_point: int;
  speed: int;
  yang_atk: int;
  yin_atk: int;
  yang_def: int;
  yin_def: int;

  shot1: UnitGeneratorDataShot;
  shot2: UnitGeneratorDataShot;
  spellcard1: UnitGeneratorDataSpellcard;
  spellcard2: UnitGeneratorDataSpellcard;
  spellcard5: UnitGeneratorDataSpellcard;
  skill1: UnitGeneratorDataSkill;
  skill2: UnitGeneratorDataSkill;
  skill3: UnitGeneratorDataSkill;
  ability: UnitGeneratorDataAbility;
  characteristic: UnitGeneratorDataCharateristic;
  resist: UnitGeneratorDataResist;
  races: string[];
};

export type UnitGeneratorDataAbility = {
  name: string;
  description: string;
  abilitys: string[];
};

export type UnitGeneratorDataResist = {
  name: string;
  description: string;
  elements: int[];
};

export type UnitGeneratorDataCharateristic = {
  field: {
    name: string;
    description: string;
    icon_filename: string;
  }[];
  trust: {
    name: string;
    description: string;
  };
};

export type UnitGeneratorDataShot = {
  name: string;
  description: string;
  specification: string;

  bullets: UnitGeneratorDataBullet[];
};

export type UnitGeneratorDataSpellcard = UnitGeneratorDataShot & {
  effects: UnitGeneratorDataSkillEffect[];
  timings: int[];
};

export type UnitGeneratorDataBullet = {
  boost_count: int;
  power_rate: float;
  range: int;
  value: int;

  name: string;
  description: string;

  category: int;
  critical: int;
  element: int;
  hit: int;
  power: int;
  type: int;

  addon_id: int;
  addon_value: int;
  extraeffect_id: int;
  extraeffect_success_rate: int;
};

export type UnitGeneratorDataSkill = {
  name: string;
  description: string;
  icon_filename: string;

  effects: UnitGeneratorDataSkillEffect[];
  turns: int[];
};

export type UnitGeneratorDataSkillEffect = {
  name: string;
  icon_filename: string;
  descriptions: string[];
  type: int;
};

export const UnitGenerator = new Generator<UnitGeneratorData>('unit.html.ejs');

function formatUnityString(source: string, keepcolor = true): string {
  if (!keepcolor) {
    return source.replace(/<(.|\n)*?>/g, '');
  }
  source = source.replace(/<(?!\/?color)[^>]*>/gm, '');

  while (source.match(/<color=([#A-Za-z0-9]+)>/)) {
    source = source
      .replace(/<color=([#A-Za-z0-9]+)>/, '<span style="color: $1">')
      .replace('</color>', '</span>');
  }

  return source.replace(/\n/g, '<br/>');
}

function parseBulletRecord(
  record: ShotRecord | SpellcardRecord,
  id: int
): UnitGeneratorDataBullet {
  if (id > 5 || id < 0) throw new Error();

  const bltrecord = DB.bullet.get(record[`magazine${id}_bullet_id`]);

  if (!bltrecord) {
    return {
      boost_count: 0,
      power_rate: 0,
      range: 0,
      value: 0,

      name: '',
      description: '',

      category: 0,
      critical: 0,
      element: 0,
      hit: 0,
      power: 0,
      type: 0,

      addon_id: 0,
      addon_value: 0,
      extraeffect_id: 0,
      extraeffect_success_rate: 0
    };
  }

  return {
    boost_count: record[`magazine${id}_boost_count`] ?? 0,
    power_rate: record[`magazine${id}_bullet_power_rate`] * 0.01,
    range: record[`magazine${id}_bullet_range`],
    value: record[`magazine${id}_bullet_value`],

    name: bltrecord.name,
    description: bltrecord.description,

    category: bltrecord.category,
    critical: bltrecord.critical,
    element: bltrecord.element,
    hit: bltrecord.hit,
    power: bltrecord.power,
    type: bltrecord.type,

    addon_id: bltrecord.bullet1_addon_id,
    addon_value: bltrecord.bullet1_addon_value,
    extraeffect_id: bltrecord.bullet1_extraeffect_id,
    extraeffect_success_rate: bltrecord.bullet1_extraeffect_success_rate
  };
}

function parseSkillEffectRecord(
  skillEffectrecord: SkillEffectRecord,
  type: int,
  value: int
): UnitGeneratorDataSkillEffect {
  const descriptions: string[] = [];

  const strip = formatUnityString(skillEffectrecord.description);

  // str {0} str [{1} str {2}]
  function format(
    value: int,
    rate: int,
    add: int,
    type: int,
    forceAdd?: boolean
  ): string {
    let ret = strip;

    if (type === EffectType.AddSpirit) value *= 0.05;

    if (forceAdd) value += add;

    ret = ret.replace('{0}', String(value));

    if (rate === 0) return ret.substr(0, ret.indexOf('['));

    ret = ret.replace('{1}', String(rate)).replace('{2}', String(add));

    return ret;
  }

  switch (type) {
    case 0:
    case 1:
      for (let i = 1; i <= 10; ++i) {
        const idx = value || i;

        descriptions.push(
          format(
            skillEffectrecord[`level${idx}_value`],
            skillEffectrecord[`level${idx}_success_rate`],
            skillEffectrecord[`level${idx}_add_value`],
            skillEffectrecord.type,
            type === 0
          )
        );
      }
      break;
    case 2:
      for (let i = 2; i <= 10; i += 2) {
        descriptions.push(
          format(
            skillEffectrecord[`level${i}_value`],
            skillEffectrecord[`level${i}_success_rate`],
            skillEffectrecord[`level${i}_add_value`],
            skillEffectrecord.type
          )
        );
      }
      break;
    case 3:
      for (let i = 1; i <= 10; i += 3) {
        descriptions.push(
          format(
            skillEffectrecord[`level${i}_value`],
            skillEffectrecord[`level${i}_success_rate`],
            skillEffectrecord[`level${i}_add_value`],
            skillEffectrecord.type
          )
        );
      }
      break;
    default:
      throw new Error(`Unknown level type: ${type}(${skillEffectrecord.id})`);
  }

  return {
    name: skillEffectrecord.name,
    descriptions,
    icon_filename: skillEffectrecord.icon_filename,
    type
  };
}

function parseShotRecord(shotrecord: ShotRecord): UnitGeneratorDataShot {
  const bullets: UnitGeneratorDataBullet[] = [];

  for (let i = 0; i < 6; ++i) {
    bullets.push(parseBulletRecord(shotrecord, i));
  }

  return {
    name: shotrecord.name,
    description: shotrecord.description,
    specification: shotrecord.specification,
    bullets
  };
}

function parseSpellcardRecord(
  spellcardrecord: SpellcardRecord
): UnitGeneratorDataSpellcard {
  if (!spellcardrecord) {
    return {
      name: 'なし',
      description: '-',
      specification: '',
      bullets: [],
      effects: [],
      timings: []
    };
  }

  const bullets: UnitGeneratorDataBullet[] = [];

  for (let i = 0; i <= 5; ++i) {
    bullets.push(parseBulletRecord(spellcardrecord, i));
  }

  const effects = [];
  const timings = [];

  for (let i = 1; i <= 5; ++i) {
    if (spellcardrecord[`spellcard_skill${i}_effect_id`]) {
      effects.push(
        parseSkillEffectRecord(
          DB.skillEffect.get(spellcardrecord[`spellcard_skill${i}_effect_id`]),
          spellcardrecord[`spellcard_skill${i}_level_type`],
          spellcardrecord[`spellcard_skill${i}_level_value`]
        )
      );

      timings.push(spellcardrecord[`spellcard_skill${i}_timing`]);
    }
  }

  return {
    name: spellcardrecord.name,
    description: spellcardrecord.description,
    specification: spellcardrecord.specification,
    bullets,
    effects,
    timings
  };
}

function parseSkillRecord(skillrecord: SkillRecord): UnitGeneratorDataSkill {
  const effects = [];

  for (let i = 1; i <= 3; ++i) {
    const id = skillrecord[`effect${i}_id`];
    if (id) {
      effects.push(
        parseSkillEffectRecord(
          DB.skillEffect.get(id),
          skillrecord[`effect${i}_level_type`],
          skillrecord[`effect${i}_level_value`]
        )
      );
    }
  }

  const turns = [];

  for (let i = 1; i <= 10; ++i) {
    turns.push(skillrecord[`level${i}_turn`]);
  }

  return {
    name: skillrecord.name,
    description: skillrecord.description,
    icon_filename: skillrecord.icon_filename,
    effects,
    turns
  };
}

function parseResistRecord(
  resistrecord: ResistRecord
): UnitGeneratorDataResist {
  const elements = [0];
  for (let i = BulletElement.Sunday; i <= BulletElement.Star; ++i) {
    const res = resistrecord[`element${i}_resistance`];
    elements.push(res - 1);
  }

  return {
    name: resistrecord.name,
    description: resistrecord.description,
    elements
  };
}

function parseAbilityRecord(
  abilityrecord: AbilityRecord
): UnitGeneratorDataAbility {
  const abilitys: string[] = [];

  for (const key in abilityrecord) {
    if (key.endsWith('ability_description')) {
      const s: string = abilityrecord[key];
      if (s.length) abilitys.push(formatUnityString(s));
    }
  }

  return {
    name: abilityrecord.name,
    description: abilityrecord.description,
    abilitys
  };
}

function parseCharateristicRecord(
  chrecord: CharacteristicRecord
): UnitGeneratorDataCharateristic {
  const field = [];

  for (let i = 1; i <= 3; ++i) {
    field.push({
      name: chrecord[`characteristic${i}_name`], // characteristic1_name
      description: formatUnityString(
        chrecord[`characteristic${i}_description`]
      ),
      icon_filename: chrecord[`characteristic${i}_icon_filename`]
    });
  }

  return {
    field,
    trust: {
      name: chrecord.trust_characteristic_name,
      description: formatUnityString(chrecord.trust_characteristic_description)
    }
  };
}

function parseUnitRace(unit_id: int): string[] {
  const urrs = DB.unitRace.findAll(r => r.unit_id === unit_id);

  return urrs.map(r => DB.race.get(r.race_id).name);
}

export function parseUnitRecord(unitrecord: UnitRecord): UnitGeneratorData {
  return {
    name: unitrecord.name,
    alias: unitrecord.alias_name,
    life_point: unitrecord.life_point,
    yin_atk: unitrecord.yin_attack,
    yang_atk: unitrecord.yang_attack,
    yin_def: unitrecord.yin_defense,
    yang_def: unitrecord.yang_defense,
    speed: unitrecord.speed,
    shot1: parseShotRecord(DB.shot.get(unitrecord.shot1_id)),
    shot2: parseShotRecord(DB.shot.get(unitrecord.shot2_id)),
    spellcard1: parseSpellcardRecord(
      DB.spellcard.get(unitrecord.spellcard1_id)
    ),
    spellcard2: parseSpellcardRecord(
      DB.spellcard.get(unitrecord.spellcard2_id)
    ),
    spellcard5: parseSpellcardRecord(
      DB.spellcard.get(unitrecord.spellcard5_id)
    ),
    skill1: parseSkillRecord(DB.skill.get(unitrecord.skill1_id)),
    skill2: parseSkillRecord(DB.skill.get(unitrecord.skill2_id)),
    skill3: parseSkillRecord(DB.skill.get(unitrecord.skill3_id)),
    ability: parseAbilityRecord(DB.ability.get(unitrecord.ability_id)),
    characteristic: parseCharateristicRecord(
      DB.characteristic.get(unitrecord.characteristic_id)
    ),
    resist: parseResistRecord(DB.resist.get(unitrecord.resist_id)),
    races: parseUnitRace(unitrecord.id)
  };
}
