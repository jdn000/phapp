import { IDatabase, IMain } from 'pg-promise';
import { alumn as sql } from '../sql';
import { Alumn } from '../../interfaces/Alumn';

export class AlumnRepository {
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
    /*
          If your repository needs to use helpers like ColumnSet,
          you should create it conditionally, inside the constructor,
          i.e. only once, as a singleton.
        */
  }

  async add(data: Alumn): Promise<Alumn> {
    return this.db.one(sql.add, data);
  }

  // Returns one records by id
  async findById(id: number): Promise<Alumn> {
    return this.db.oneOrNone(sql.findById, {
      id: id,
    });
  }

  async findByRun(run: string): Promise<Alumn> {
    return this.db.oneOrNone(sql.findByRun, {
      run: run,
    });
  }

  // Returns all Alumn records;
  async getAll(): Promise<Alumn[]> {
    return this.db.any(sql.findAll);
  }

  //update one Alumn record
  async update(data: Alumn): Promise<Alumn> {
    return this.db.oneOrNone(sql.update, data);
  }
}
