import { Service } from 'typedi';
import { db } from '../db';
import { Grade } from '../interfaces/Grade';
import Logger from '../loaders/logger';


@Service()
export default class GradeService {

  public async getall(): Promise<Grade[]> {
    try {
      return await db.grade.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

}
