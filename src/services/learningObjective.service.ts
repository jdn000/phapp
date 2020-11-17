import { Service } from 'typedi';
import { db } from '../db';
import Logger from '../loaders/logger';
import { LearningObjective } from '../interfaces/LearningObjective';

@Service()
export default class LearningObjectiveService {

  public async getall(): Promise<LearningObjective[]> {
    try {
      return await db.learningObjective.getAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async getById(data: number): Promise<LearningObjective> {
    try {
      return await db.learningObjective.findById(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async getBySubjectId(data: number): Promise<LearningObjective[]> {
    try {
      return await db.learningObjective.findBySubjectId(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async getByGradeIdAndSubjectId(subjectId: number, gradeId: number): Promise<LearningObjective[]> {
    try {
      return await db.learningObjective.findByGradeIdAndSubjectId(subjectId, gradeId);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async create(data: LearningObjective): Promise<LearningObjective> {
    try {
      return await db.learningObjective.add(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async update(data: LearningObjective): Promise<LearningObjective> {
    try {
      return await db.learningObjective.update(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
