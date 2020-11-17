import { IDatabase, IMain } from 'pg-promise';
import { calification as sql, calificationObjective as sqlCalificationObjective } from '../sql';
import { Calification } from '../../interfaces/Calification';

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

  async add(data: Calification): Promise<Calification> {
    return this.db.one(sql.add, data);
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
  /**
   * 
   * DTO calification objective
   * 
   */
  async addCalificationObjective(calificationId: number, objectiveId: number): Promise<{ id: number, calificationId: number, objectiveId: number; }> {
    return this.db.one(sqlCalificationObjective.add, { calificationId: calificationId, objectiveId: objectiveId });
  }

  async findCalificationObjectiveById(id: number): Promise<{ id: number, calificationId: number, objectiveId: number; }> {
    return this.db.oneOrNone(sqlCalificationObjective.findById, {
      id: id,
    });
  }

  async findCalificationObjectiveByObjectId(objectId: number): Promise<{ id: number, calificationId: number, objectiveId: number; }[]> {
    return this.db.manyOrNone(sqlCalificationObjective.findByObjectiveId, {
      objectId: objectId,
    });
  }

  async getAllCalificationObjective(): Promise<{ id: number, calificationId: number, objectiveId: number; }[]> {
    return this.db.manyOrNone(sqlCalificationObjective.findAll);
  }


  async updateCalificationObjective(id: number, calificationId: number, objectiveId: number): Promise<{ id: number, calificationId: number, objectiveId: number; }> {
    return this.db.oneOrNone(sqlCalificationObjective.update, { id: id, calificationId: calificationId, objectiveId: objectiveId });
  }
}

