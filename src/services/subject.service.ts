import { Service } from 'typedi';
import { db } from '../db';
import { Subject } from '../interfaces/Subject';
import Logger from '../loaders/logger';


@Service()
export default class SubjectService {

  public async getall(): Promise<Subject[]> {
    try {
      return await db.subject.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

}
