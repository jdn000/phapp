import { Service } from 'typedi';
import { db } from '../db';
import Logger from '../loaders/logger';
import { User } from '../interfaces/User';

@Service()
export default class UserService {

  public async getAll(): Promise<User[]> {
    try {
      return await db.user.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getById(data: number): Promise<User> {
    try {
      return await db.user.findById(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async create(data: User): Promise<User> {
    try {
      return await db.user.add(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async update(data: User): Promise<User> {
    try {
      return await db.user.update(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
