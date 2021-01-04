import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.timestamp(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      eol: '\n',
      dirname: 'logs',
      filename: 'app.log',
      maxFiles: 10,
      maxsize: 10 * 1024 * 1024,
    }),
  ],
});

export default logger;
