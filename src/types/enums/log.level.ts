export const LogLevel = {
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
  HTTP: "http",
  DEBUG: "debug",
} as const;

export type LogLevel = typeof LogLevel[keyof typeof LogLevel];
