import expressLoader from './express';
import { Container } from 'typedi';
import Logger from './logger';
import { db } from '../db';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
  Container.set('logger', Logger);
  try {
    await db.user.findById(1);
    Logger.info('✌️ PostgreSQL loaded and connected!');
  } catch (error) {
    Logger.error('PostgreSQL error: %s', error.message || error);
    Logger.error(error);
  }

  expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
  Logger.info('✌️ Environment: %s', process.env.NODE_ENV);

};
