import { IDatabase, IMain } from 'pg-promise';
import { user as sql } from '../sql';
import { IUser } from '../../interfaces/IUser';

export class UserRepository {
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
  constructor(private db: IDatabase<any>, private pgp: IMain) {
    /*
          If your repository needs to use helpers like ColumnSet,
          you should create it conditionally, inside the constructor,
          i.e. only once, as a singleton.
        */
  }

  async add(data: IUser): Promise<IUser> {
    return this.db.one(sql.add, {
      username: data.username,
      password: data.password,
      salt: data.salt,
      firstName: data.firstName,
      lastName: data.lastName,
      secondSurName: data.secondSurName,
      roleId: data.roleId,
      email: data.email,
      //  profileImage: data.profileImage
    });
  }

  // Returns one records by id
  async findById(id: number): Promise<IUser> {
    return this.db.oneOrNone(sql.findById, {
      id: id,
    });
  }

  async findByUsername(username: string): Promise<IUser> {
    return this.db.oneOrNone(sql.findByUsername, {
      username: username,
    });
  }

  // Returns all user records;
  async getAll(): Promise<IUser[]> {
    return this.db.any(sql.findAll);
  }

  //update one user record
  async update(data: IUser): Promise<IUser> {
    return this.db.oneOrNone(sql.update, data);
  }
}
