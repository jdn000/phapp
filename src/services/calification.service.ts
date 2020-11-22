import { Service } from 'typedi';
import { db } from '../db';
import Logger from '../loaders/logger';
import { Calification, CalificationIndicator } from '../interfaces/Calification';

@Service()
export default class CalificationService {

  public async getAll(): Promise<Calification[]> {
    try {
      return await db.calification.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getById(data: number): Promise<Calification> {
    try {
      return await db.calification.findById(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getByAlumnId(alumnId: number): Promise<Calification[]> {
    try {
      return await db.calification.findByAlumnId(alumnId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async create(califications: Calification[], indicators: number[]): Promise<Calification[]> {
    try {
      const califications: Calification[] = [];
      const summativeCalifications = califications.filter((d) => d.isCummulative === false);
      const cummulativeCalifications = califications.filter((d) => d.isCummulative === true);

      if (summativeCalifications) {
        califications.push(... (await db.calification.addCalifications(summativeCalifications)));
      }

      if (cummulativeCalifications) {
        const savedCalifications = await db.calification.addCalifications(cummulativeCalifications);
        califications.push(...savedCalifications);
        const savedCalifInd = indicators.map((i) => {
          return savedCalifications.map((c) => {
            return {
              indicatorId: i,
              calificationId: c.id
            }
            );

        });
        const saved = await this.saveCalificationIndicator(savedCalifInd);
      }
      console.log(saved);
      return califications;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async saveCalificationIndicator(data: CalificationIndicator[]): Promise<CalificationIndicator[]> {
    try {
      return await db.calification.addCalificationIndicators(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async update(data: Calification): Promise<Calification> {
    try {
      return await db.calification.update(data);

    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
