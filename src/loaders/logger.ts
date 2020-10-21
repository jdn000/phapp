// import winston from 'winston';
// import config from '../config';

// const transports = [];
// if (process.env.NODE_ENV !== 'development') {
//   transports.push(new winston.transports.Console());
// } else {
//   transports.push(
//     new winston.transports.Console({
//       format: winston.format.combine(winston.format.cli(), winston.format.splat()),
//     }),
//   );
// }

// const LoggerInstance = winston.createLogger({
//   level: config.logs.level,
//   levels: winston.config.npm.levels,
//   format: winston.format.combine(
//     winston.format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss',
//     }),
//     winston.format.errors({ stack: true }),
//     winston.format.splat(),
//     winston.format.json(),
//   ),
//   transports,
// });

// export default LoggerInstance;
import winston from 'winston';
import config from '../config';
import { join } from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const transports = [];

if (config.logs.fileEnabled) {
  transports.push(
    new DailyRotateFile({
      dirname: join(__dirname, '../../logs'),
      filename: 'dialsys-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '10m',
      maxFiles: '15d',
      auditFile: join(__dirname, '../../logs', 'logger-audit.json'),
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
    }),
  );
}

if (config.logs.consoleEnabled) {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
    }),
  );
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports,
});

export default LoggerInstance;
