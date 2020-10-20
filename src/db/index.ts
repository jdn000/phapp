import * as promise from 'bluebird'; // best promise library today
import config from '../config'; // db connection details
import pgPromise from 'pg-promise';
import { Diagnostics } from './diagnostics'; // optional diagnostics
import { IInitOptions, IDatabase, IMain } from 'pg-promise';
import {
  IExtensions,
  UserRepository,
} from './repos';


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
};

// Creating the database instance with extensions:
const db: ExtendedProtocol = pgp(dbConfig);

// Initializing optional diagnostics:
Diagnostics.init(initOptions);

// Alternatively, you can get access to pgp via db.$config.pgp
// See: https://vitaly-t.github.io/pg-promise/Database.html#$config
export { db, pgp };
