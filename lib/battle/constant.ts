export enum Side {
  Player = 0,
  Enemy = 1,
  Change = 5
}

export enum Barrage {
  None = 0,
  Shot1 = 1,
  Shot2 = 2,
  Spellcard1 = 3,
  SpellCard2 = 4,
  SpellCard3 = 5,
  SpellCard4 = 6,
  LastWord = 7,
  Max = 8
}

export enum Boost {
  None = 0,
  Level1 = 1,
  Level2 = 2,
  Level3 = 3
}

export enum BulletType {
  Yin = 0,
  Yang = 1
}

export enum EffectType {
  Buff = 1,
  Debuff = 2,
  Heal = 3,
  AddBarrier = 4,
  AddSpirit = 5,
  BadBarrier = 6,
  InstantA = 7,
  InstantB = 8,
  GoodBarrier = 9,
  Dispel = 10,
  Guard = 11,
  ShapeReduce = 12,
  ElementReduce = 13,
  RaceReduce = 14,
  ShapeUp = 15,
  ElementUp = 16,
  SpiritRate = 17,
  SetBuff = 18,
  EventPoint = 19
}

export enum EffectSubType {
  YangAttack = 1,
  YangDefense = 2,
  YinAttack = 3,
  YinDefense = 4,
  Speed = 5,
  Hit = 6,
  Evade = 7,
  CritAttack = 8,
  CritDefense = 9,
  CritHit = 10,
  CritEvade = 11,
  Hate = 12,
  Ignition = 1,
  Freeze = 2,
  Charge = 3,
  Belch = 4,
  Smoke = 5,
  Stun = 1,
  Delay = 2,
  Fast = 1,
  Slow = 2,
  DamageReduce = 1,
  YangReduce = 2,
  YinReduce = 3,
  IronReduce = 4,
  GutsReduce = 5,
  Aggressive = 1,
  Defensive = 2,
  Sonic = 3,
  AggressiveAid = 4,
  DefensiveAid = 5,
  SonicAid = 6
}

export enum EffectRange {
  Self = 1,
  Alies = 2,
  Enemy = 3,
  Enemies = 4
}

export enum BulletAddon {
  AbsHit = 1,
  Penetration = 2,
  Mirror = 3,
  Hard = 4,
  Slash = 5,
  Rapid = 6,
  Blast = 7,
  Elastic = 8,
  Accuracy = 9,
  Recoil = 10,
  Absorb = 11,
  Burn = 12,
  Melt = 13,
  Discharge = 14,
  Drastic = 15,
  Flash = 16,
  Barrier = 17
}

export enum BulletElement {
  NONE = 0,
  Sunday = 1,
  Monday = 2,
  Tuesday = 3,
  Wednesday = 4,
  Thursday = 5,
  Friday = 6,
  Saturday = 7,
  Star = 8,
  Nil = 9,
  Max = 10
}

export enum BulletShape {
  Ball = 1,
  Laser = 2,
  Muscle = 3,
  Slash = 4,
  Mass = 5,
  Liquid = 6,
  Energy = 7,
  Amulet = 8,
  Light = 9,
  Needle = 10,
  Missil = 11,
  Max = 12
}

export enum BulletRange {
  One = 1,
  All = 2
}

export enum EnumMax {
  Barrier = 5,
  EnemyBarrier = 7,
  Enemy = 3,
  Purge = 3,
  CommandSkill = 3,
  SkillEffect = 3,
  Spellcard = 5,
  SpecaSkill = 5,
  SkillEffectValue = 10,
  PictureSkill = 5,
  SP = 5,
  PlayerUnits = 3
}

export enum Speca {
  ForeTiming = 1,
  BackTiming = 2
}
