import { Service } from 'typedi';
import { db } from '../db';
import Logger from '../loaders/logger';
import { Indicator } from '../interfaces/Indicator';

@Service()
export default class IndicatorService {

  public async getAll(): Promise<Indicator[]> {
    try {
      return await db.indicator.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getById(data: number): Promise<Indicator> {
    try {
      return await db.indicator.findById(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async getByObjectiveId(objectiveId: number): Promise<Indicator[]> {
    try {
      return await db.indicator.findByObjectiveId(objectiveId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async create(data: Indicator): Promise<Indicator> {
    try {
      return await db.indicator.add(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async update(data: Indicator): Promise<Indicator> {
    try {
      return await db.indicator.update(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
