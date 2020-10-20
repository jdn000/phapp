import { Service } from 'typedi';
import { db } from '../db';
import Logger from '../loaders/logger';
import { IUser } from '../interfaces/IUser';

@Service()
export default class UserService {

  public async getall(): Promise<IUser[]> {
    try {
      return await db.user.getAll();      
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getById(data: number): Promise<IUser> {
    try {
      return await db.user.findById(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async create(data: IUser): Promise<IUser> {
    try {
      return await db.user.add(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async update(data: IUser): Promise<IUser> {
    try {
      return await db.user.update(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
