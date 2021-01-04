import { Service } from 'typedi';
import { db } from '../db';
import { Semester } from '../interfaces/Semester';
import Logger from '../loaders/logger';


@Service()
export default class SemesterService {

  public async getAll(): Promise<Semester[]> {
    try {
      return await db.semester.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getCurrentSemester(): Promise<Semester> {
    try {
      return await db.semester.getCurrentSemester();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async update(data: Semester): Promise<Semester> {
    try {
      return await db.semester.update(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async sync(gradeId: number): Promise<any> {
    try {
      return await db.semester.sync(gradeId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
