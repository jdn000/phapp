import * as promise from 'bluebird'; // best promise library today
import config from '../config'; // db connection details
import pgPromise from 'pg-promise';
import { Diagnostics } from './diagnostics'; // optional diagnostics
import { IInitOptions, IDatabase, IMain } from 'pg-promise';
import {
  IExtensions,
  UserRepository,
  AlumnRepository,
  GradeRepository,
  SubjectRepository,
  LearningObjectiveRepository,
  CalificationRepository,
  IndicatorRepository,
  CummulativeRepository,
  ReportRepository,
  SemesterRepository
} from './repos';
import { UserSubjectRepository } from './repos/userSubject.repo';



type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

// pg-promise initialization options:
const initOptions: IInitOptions<IExtensions> = {
  // Using a custom promise library, instead of the default ES6 Promise:
  promiseLib: promise,

  // Extending the database protocol with our custom repositories;
  // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
  extend(obj: ExtendedProtocol, dc: any) {
    // Database Context (dc) is mainly needed for extending multiple databases with different access API.

    // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
    // which should be as fast as possible.
    obj.user = new UserRepository(obj, pgp);
    obj.alumn = new AlumnRepository(obj, pgp);
    obj.grade = new GradeRepository(obj, pgp);
    obj.subject = new SubjectRepository(obj, pgp);
    obj.learningObjective = new LearningObjectiveRepository(obj, pgp);
    obj.calification = new CalificationRepository(obj, pgp);
    obj.indicator = new IndicatorRepository(obj, pgp);
    obj.cummulative = new CummulativeRepository(obj, pgp);
    obj.report = new ReportRepository(obj, pgp);
    obj.userSubject = new UserSubjectRepository(obj, pgp);
    obj.semester = new SemesterRepository(obj, pgp);
  },
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

const dbConfig = {
  host: config.postgres.server,
  port: config.postgres.port,
  database: config.postgres.db,
  user: config.postgres.user,
  password: config.postgres.password,
  ssl: { rejectUnauthorized: false }
};

// Creating the database instance with extensions:
const db: ExtendedProtocol = pgp(dbConfig);

// Initializing optional diagnostics:
Diagnostics.init(initOptions);

// Alternatively, you can get access to pgp via db.$config.pgp
// See: https://vitaly-t.github.io/pg-promise/Database.html#$config
export { db, pgp };
