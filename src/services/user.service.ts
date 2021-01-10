import { Service } from 'typedi';
import { db } from '../db';
import Logger from '../loaders/logger';
import { User } from '../interfaces/User';
import jwt from 'express-jwt';
import middlewares from '../api/middlewares';
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
      //  const decoded = jwt.verify(token, "your secret or key");
      //  middlewares.isAuth;
      // var userId = decoded.user_data.user_id;
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
