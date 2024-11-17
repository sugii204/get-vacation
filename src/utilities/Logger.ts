const chalk = require('chalk');

interface ILogger {
  info(message: string): void;
  error(message: string): void;
  warn(message: string): void;
  debug(message: string): void;
  start(message: string): void;
}

class Logger implements ILogger {
  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  public info(message: string): void {
    console.log(chalk.blue(Logger.formatMessage('INFO', message)));
  }

  public error(message: string): void {
    console.log(chalk.red(Logger.formatMessage('ERROR', message)));
  }

  public warn(message: string): void {
    console.log(chalk.yellow(Logger.formatMessage('WARN', message)));
  }

  public debug(message: string): void {
    console.debug(chalk.gray(Logger.formatMessage('DEBUG', message)));
  }

  public start(message: string): void {
    console.log(chalk.green(Logger.formatMessage('STARTED', message)));
  }
}

export const logger = new Logger();
