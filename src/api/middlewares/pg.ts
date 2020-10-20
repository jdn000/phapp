let pg = require('pg');
import config from '../../config/index';

const connectionData = {
  user: config.postgres.user,
  host: config.postgres.server,
  database: config.postgres.db,
  password: config.postgres.password,
  port: config.postgres.port,
};
const db_client = new pg.Client(connectionData);
db_client.connect();

module.exports = db_client;
