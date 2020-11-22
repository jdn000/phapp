import { IDatabase, IMain } from 'pg-promise';
import { calification as sql } from '../sql';
import { Calification, CalificationIndicator } from '../../interfaces/Calification';

export class CalificationRepository {
  /**
   * @param db
   * Automated database connection context/interface.
   *
   * If you ever need to access other repositories from this one,
   * you will have to replace type 'IDatabase<any>' with 'any'.
   *
   * @param pgp
   * Library's root, if ever needed, like to access 'helpers'
   * or other namespaces available from the root.
   */
  constructor(private readonly db: IDatabase<any>, private readonly pgp: IMain) {

  }

  async adds(data: Calification): Promise<Calification> {
    return this.db.one(sql.add, data);
  }

  async addCalifications(data: Calification[]): Promise<Calification[]> {
    const query = this.pgp.helpers.insert(data, this.getCsToSave()) + this.getColumnsNameToReturn();
    return this.db.manyOrNone(query);
  }
  private readonly columnsToSave = [
    { name: 'alumn_id', prop: 'alumnId' },
    { name: 'subject_id', prop: 'subjectId' },
    { name: 'value', prop: 'value' },
    { name: 'is_cummulative', prop: 'isCummulative' },
    { name: 'objective_id', prop: 'objectiveId' }
  ];
  getColumnsNameToReturn() {
    return ` RETURNING id AS "id",
    alumn_id AS "alumnId",
    subject_id AS "subjectId",
    value ,
    is_cummulative AS " isCummulative",
    objective_id AS "objectiveId" `;
  }
  getCsToSave() {
    return new this.pgp.helpers.ColumnSet(this.columnsToSave, { table: 'calification' });
  }
  async addCummulativeCalifications(data: Calification[]): Promise<Calification[]> {
    const query = this.pgp.helpers.insert(data, this.getCsToSave()) + this.getColumnsNameToReturn();

    return this.db.manyOrNone(query);
  }
  async addCalificationIndicators(data: CalificationIndicator[]): Promise<CalificationIndicator[]> {
    const query = this.pgp.helpers.insert(data, this.getCalificationIndicatorToSave()) + this.getCalificationIndicatorColumnsNameToReturn();
    return this.db.manyOrNone(query);
  }
  private readonly columnsCalificationIndicatorToSave = [
    { name: 'calification_id', prop: 'calificationId' },
    { name: 'indicator_id', prop: 'indicatorId' }
  ];
  getCalificationIndicatorColumnsNameToReturn() {
    return ` RETURNING id AS "id",
    calification_id AS "calificationId",
    indicator_id AS "indicatorId"`;
  }
  getCalificationIndicatorToSave() {
    return new this.pgp.helpers.ColumnSet(this.columnsCalificationIndicatorToSave, { table: 'calification_indicator' });
  }




  // Returns one records by id
  async findById(id: number): Promise<Calification> {
    return this.db.oneOrNone(sql.findById, {
      id: id,
    });
  }

  async findByAlumnId(alumnId: number): Promise<Calification[]> {
    return this.db.manyOrNone(sql.findByAlumnId, {
      alumnId: alumnId,
    });
  }


  // Returns all Calification records;
  async getAll(): Promise<Calification[]> {
    return this.db.manyOrNone(sql.findAll);
  }

  //update one Calification record
  async update(data: Calification): Promise<Calification> {
    return this.db.oneOrNone(sql.update, data);
  }
  // /**
  //  * 
  //  * DTO calification objective
  //  * 
  //  */
  // async addCalificationObjective(calificationId: number, objectiveId: number): Promise<{ id: number, calificationId: number, objectiveId: number; }> {
  //   return this.db.one(sqlCalificationObjective.add, { calificationId: calificationId, objectiveId: objectiveId });
  // }

  // async findCalificationObjectiveById(id: number): Promise<{ id: number, calificationId: number, objectiveId: number; }> {
  //   return this.db.oneOrNone(sqlCalificationObjective.findById, {
  //     id: id,
  //   });
  // }

  // async findCalificationObjectiveByObjectId(objectId: number): Promise<{ id: number, calificationId: number, objectiveId: number; }[]> {
  //   return this.db.manyOrNone(sqlCalificationObjective.findByObjectiveId, {
  //     objectId: objectId,
  //   });
  // }

  // async getAllCalificationObjective(): Promise<{ id: number, calificationId: number, objectiveId: number; }[]> {
  //   return this.db.manyOrNone(sqlCalificationObjective.findAll);
  // }


  // async updateCalificationObjective(id: number, calificationId: number, objectiveId: number): Promise<{ id: number, calificationId: number, objectiveId: number; }> {
  //   return this.db.oneOrNone(sqlCalificationObjective.update, { id: id, calificationId: calificationId, objectiveId: objectiveId });
  // }
}

