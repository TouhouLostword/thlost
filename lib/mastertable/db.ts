import { AbilityTable } from './ability';
import {
  BulletTable,
  BulletAddonTable,
  BulletCriticalRaceTable,
  BulletExtraEffectTable
} from './bullet';
import { CharateristicTable } from './characteristic';
import { EnemyTable } from './enemy';
import { SettingTable } from './setting';
import { ShotTable } from './shot';
import { SkillTable, SkillEffectTable } from './skill';
import { SpellcardTable } from './spellcard';
import {
  UnitTable,
  UnitRaceTable,
  UnitExpTable,
  UnitLevelLimitbreakGrowthTable,
  UnitRankPromoteGrowthTable,
  UnitRankPromoteTable,
  UnitRareAwakenGrowthTable,
  UnitTrustGrowthTable,
  UnitPhantasmCostTable
} from './unit';

import { MasterManifest } from '../mafinest';
import { MasterTable, MasterRecord } from './primitive';
import { ResistTable } from './resist';
import { RaceTable } from './race';

class MasterDB {
  static PATH_FORMAT = (name: string): string => `Master/${name}.bytes`;

  ability: AbilityTable;
  bullet: BulletTable;
  bulletAddon: BulletAddonTable;
  bulletCriticalRace: BulletCriticalRaceTable;
  bulletExtraEffect: BulletExtraEffectTable;
  charateristic: CharateristicTable;
  enemy: EnemyTable;
  setting: SettingTable;
  shot: ShotTable;
  skill: SkillTable;
  skillEffect: SkillEffectTable;
  spellcard: SpellcardTable;
  unit: UnitTable;
  unitRace: UnitRaceTable;
  unitExp: UnitExpTable;
  unitLevelLimitbreakGrowth: UnitLevelLimitbreakGrowthTable;
  unitRankPromoteGrowth: UnitRankPromoteGrowthTable;
  unitRankPromote: UnitRankPromoteTable;
  unitRareAwakenGrowth: UnitRareAwakenGrowthTable;
  unitTrustGrowth: UnitTrustGrowthTable;
  unitPhantasmCost: UnitPhantasmCostTable;
  resistTable: ResistTable;
  raceTable: RaceTable;

  constructor() {
    this.ability = new AbilityTable();
    this.bullet = new BulletTable();
    this.bulletAddon = new BulletAddonTable();
    this.bulletCriticalRace = new BulletCriticalRaceTable();
    this.bulletExtraEffect = new BulletExtraEffectTable();
    this.charateristic = new CharateristicTable();
    this.enemy = new EnemyTable();
    this.setting = new SettingTable();
    this.shot = new ShotTable();
    this.skill = new SkillTable();
    this.skillEffect = new SkillEffectTable();
    this.spellcard = new SpellcardTable();
    this.unit = new UnitTable();
    this.unitRace = new UnitRaceTable();
    this.unitExp = new UnitExpTable();
    this.unitLevelLimitbreakGrowth = new UnitLevelLimitbreakGrowthTable();
    this.unitRankPromoteGrowth = new UnitRankPromoteGrowthTable();
    this.unitRankPromote = new UnitRankPromoteTable();
    this.unitRareAwakenGrowth = new UnitRareAwakenGrowthTable();
    this.unitTrustGrowth = new UnitTrustGrowthTable();
    this.unitPhantasmCost = new UnitPhantasmCostTable();
    this.resistTable = new ResistTable();
    this.raceTable = new RaceTable();
  }

  private async loadtable(
    table: MasterTable<MasterRecord>,
    filepath: string
  ): Promise<void> {
    try {
      const buffer = await MasterManifest.read(
        MasterDB.PATH_FORMAT(filepath + 'Master')
      );
      buffer && (await table.init(buffer));
    } catch (err) {
      console.debug(err);
    }
  }

  async load(): Promise<void> {
    try {
      await Promise.all([
        this.loadtable(this.ability, 'Ability'),
        this.loadtable(this.bullet, 'Bullet'),
        this.loadtable(this.bulletAddon, 'BulletAddon'),
        this.loadtable(this.bulletCriticalRace, 'BulletCriticalRace'),
        this.loadtable(this.bulletExtraEffect, 'BulletExtraEffect'),
        this.loadtable(this.charateristic, 'Charateristic'),
        this.loadtable(this.enemy, 'Enemy'),
        this.loadtable(this.setting, 'Setting'),
        this.loadtable(this.shot, 'Shot'),
        this.loadtable(this.skill, 'Skill'),
        this.loadtable(this.skillEffect, 'SkillEffect'),
        this.loadtable(this.spellcard, 'Spellcard'),
        this.loadtable(this.unit, 'Unit'),
        this.loadtable(this.unitExp, 'UnitExp'),
        this.loadtable(this.unitRace, 'UnitRace'),
        this.loadtable(this.unitRankPromote, 'UnitRankPromote'),
        this.loadtable(this.unitRankPromoteGrowth, 'UnitRankPromoteGrowth'),
        this.loadtable(this.unitRareAwakenGrowth, 'UnitRareAwakenGrowth'),
        this.loadtable(this.unitTrustGrowth, 'UnitTrustGrowth'),
        this.loadtable(
          this.unitLevelLimitbreakGrowth,
          'UnitLevelLimitbreakGrowth'
        ),
        this.loadtable(this.unitPhantasmCost, 'UnitPhantasmCost'),
        this.loadtable(this.resistTable, 'ResistMaster'),
        this.loadtable(this.raceTable, 'RaceMaster')
      ]);
    } catch (err) {
      console.debug(err);
    }
  }
}

export const DB = new MasterDB();
