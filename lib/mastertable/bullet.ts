import { MasterRecord, MasterTable } from './primitive';

export type BulletRecord = MasterRecord & {
  id: int;
  name: string;
  description: string;

  category: int;
  critical: int;
  element: int;
  hit: int;
  power: int;
  type: int;

  bulletint_addon_id: int;
  bulletint_addon_value: int;
  bulletint_extraeffect_id: int;
  bulletint_extraeffect_success_rate: int;

  bullet2_addon_id: int;
  bullet2_addon_value: int;
  bullet2_extraeffect_id: int;
  bullet2_extraeffect_success_rate: int;

  bullet3_addon_id: int;
  bullet3_addon_value: int;
  bullet3_extraeffect_id: int;
  bullet3_extraeffect_success_rate: int;
};

export type BulletExtraEffectRecord = MasterRecord & {
  id: int;
  name: string;
  description: string;

  type: int;
  subtype: int;
  target: int;
  turn: int;
  value: int;
};

export type BulletCriticalRaceRecord = MasterRecord & {
  id: int;
  bullet_id: int;
  race_id: int;
};

export type BulletAddonRecord = MasterRecord & {
  id: int;
  name: string;
  description: string;
};

export class BulletTable extends MasterTable<BulletRecord> {}

export class BulletExtraEffectTable extends MasterTable<
  BulletExtraEffectRecord
> {}

export class BulletAddonTable extends MasterTable<BulletAddonRecord> {}

export class BulletCriticalRaceTable extends MasterTable<
  BulletCriticalRaceRecord
> {
  find(
    compareFn: (record: BulletCriticalRaceRecord) => boolean
  ): BulletCriticalRaceRecord | undefined;

  find(bulletId: int, raceId: int): BulletCriticalRaceRecord | undefined;

  find(
    param1: int | Function,
    param2?: int
  ): BulletCriticalRaceRecord | undefined {
    if (typeof param1 === 'function')
      return super.find(
        param1 as (record: BulletCriticalRaceRecord) => boolean
      );

    return super.find(r => {
      return r.bullet_id === param1 && r.race_id === param2;
    });
  }
}
