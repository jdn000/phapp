import { Service } from 'typedi';
import { db } from '../db';
import Logger from '../loaders/logger';
import { Alumn } from '../interfaces/Alumn';
import { CalificationReport } from '../interfaces/Calification';

@Service()
export default class AlumnService {

  public async getAll(): Promise<Alumn[]> {
    try {
      return await db.alumn.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getById(data: number): Promise<Alumn> {
    try {
      return await db.alumn.findById(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async getByRun(data: string): Promise<Alumn> {
    try {
      return await db.alumn.findByRun(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async create(data: Alumn): Promise<Alumn> {
    try {

      return await db.alumn.add(data);

    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async update(data: Alumn): Promise<Alumn> {
    try {
      return await db.alumn.update(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async getallData(gradeNumber: number): Promise<CalificationReport[]> {
    try {
      return await db.alumn.getAllDataToReport(gradeNumber);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async getAlumnData(id: number): Promise<CalificationReport> {
    try {
      return await db.alumn.getAlumnDataToReport(id);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
