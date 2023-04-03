import winston from "winston";
import "winston-daily-rotate-file";
import { LogLevel } from "../types/enums/log.level";
import * as path from "path";

const logLevel = LogLevel.DEBUG || LogLevel.INFO;
const logFilesDir = path.join(__dirname, "/logs");
console.log(logFilesDir);
const logOutput = [
  new winston.transports.Console(),

  new winston.transports.DailyRotateFile({
    filename: `${logFilesDir}/%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "2048m",
  }),
];

const logFormat = (name: string) => {
  // :timestamp, :level, :label, :message 형태로 동작
  return winston.format.combine(
    winston.format.errors({
      stack: true,
    }),

    winston.format.label({
      label: name,
    }),

    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss.ms",
    }),

    winston.format.printf((log) => {
      const logs = [
        log.timestamp,
        log.level.toUpperCase(),
        log.label,
        `"${log.message}"`,
      ];

      if (log.stack) logs.push(`"${log.stack}"`);
      return logs.join(" ");
    })
  );
};

const createLogger = (loggerName: string) => {
  return winston.createLogger({
    level: logLevel,
    format: logFormat(loggerName),
    transports: logOutput,
  });
};

export default createLogger;
