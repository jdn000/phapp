import { Service } from 'typedi';
import { db } from '../db';
import Logger from '../loaders/logger';
import { Alumn } from '../interfaces/Alumn';
import { CalificationReport } from '../interfaces/Calification';

@Service()
export default class ReportService {


  public async getById(data: number): Promise<any> {
    try {
      return await db.report.getReportPath(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async deleteReportAfterDownload(path: string): Promise<any> {
    try {
      return await db.report.deleteReportAfterDownload(path);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

}
