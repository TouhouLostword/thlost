import { MasterRecord, MasterTable } from './primitive';

export type PersonRecord = MasterRecord & {
  description: string;
  id: int;
  name: string;
};

export type PersonRelationRecord = MasterRecord & {
  description: string;
  id: int;
  person_id: int;
  target_person_id: int;
};

export class PersonTable extends MasterTable<PersonRecord> {}

export class PersonRelationTable extends MasterTable<PersonRelationRecord> {
  findAll(
    compareFn: (record: PersonRelationRecord) => boolean
  ): PersonRelationRecord[];
  findAll(person_id: int): PersonRelationRecord[];
  findAll(param1: int | Function): PersonRelationRecord[] {
    if (typeof param1 === 'function')
      return super.findAll(param1 as (record: PersonRelationRecord) => boolean);

    return super.findAll(r => r.person_id === param1);
  }
}
