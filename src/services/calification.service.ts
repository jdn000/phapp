import { Service } from 'typedi';
import { db } from '../db';
import Logger from '../loaders/logger';
import { Calification } from '../interfaces/Calification';

@Service()
export default class CalificationService {

  public async getall(): Promise<Calification[]> {
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
  /***
   * crea una nueva calificacion, crea un calif-object y actualiza la calificacion con la referencia
   * a la tabla intermedia calif-object
   */
  public async create(data: Calification): Promise<Calification> {
    try {
      data.calificationObjectiveId = null;
      let savedCalification = await db.calification.add(data);
      if (savedCalification && data.objectiveId) {
        savedCalification.calificationObjectiveId = (await db.calification.addCalificationObjective(savedCalification.id, data.objectiveId)).id;

        savedCalification = await this.update(savedCalification);
      }
      return savedCalification;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  /**
   * actualiza la calif, actualiza el id del objetivo usando la misma referencia a la tabla. no necesita volver a actualizarse
   * porque ya existe esa entrada en la tabla intermedia
   */
  public async update(data: Calification): Promise<Calification> {
    try {
      const updatedCalification = await db.calification.update(data);
      if (updatedCalification && data.objectiveId && data.calificationObjectiveId) {
        updatedCalification.objectiveId = (await db.calification.updateCalificationObjective(
          updatedCalification.calificationObjectiveId, updatedCalification.id, data.objectiveId)).id;
      }
      return updatedCalification;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
