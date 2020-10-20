import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import { Container } from 'typedi';
import Logger from './logger';
import { db } from '../db';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {

  // const mongoConnection = await mongooseLoader();
  // Logger.info('✌️ MongoDB loaded and connected!');

  Container.set('logger', Logger);
  try {
    let data = await db.user.getAll();    
    Logger.info('✌️ PostgreSQL loaded and connected!');
  } catch (error) {
    Logger.error('PostgreSQL error: %s', error.message || error);
    Logger.error(error);
  }


  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */
  // const userModel = {
  //   name: 'userModel',
  //   // Notice the require syntax and the '.default'
  //   model: require('../models/user').default,
  // };

  // It returns the agenda instance because it's needed in the subsequent loaders
  // const { agenda } = await dependencyInjectorLoader({
  //   mongoConnection,
  //   models: [
  //     userModel,
  //     // salaryModel,
  //     // whateverModel
  //   ],
  // });
  // Logger.info('✌️ Dependency Injector loaded');

  // await jobsLoader({ agenda });
  // Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
