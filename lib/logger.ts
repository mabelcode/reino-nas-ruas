/**
 * Sistema de logging profissional para produção
 * Suporta diferentes níveis de log e integração com serviços externos
 */

/* eslint-disable no-unused-vars */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}
/* eslint-enable no-unused-vars */

// Usando os tipos LogLevel diretamente
const LOG_LEVELS: LogLevel[] = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR, LogLevel.FATAL];

// Usando os tipos LogLevel para validação
const isValidLogLevel = (level: string): level is LogLevel => {
  return LOG_LEVELS.includes(level as LogLevel);
};

// Usando os tipos LogLevel para logging
const logLevelToString = (level: LogLevel): string => {
  switch (level) {
    case LogLevel.DEBUG:
      return 'DEBUG';
    case LogLevel.INFO:
      return 'INFO';
    case LogLevel.WARN:
      return 'WARN';
    case LogLevel.ERROR:
      return 'ERROR';
    case LogLevel.FATAL:
      return 'FATAL';
    default:
      return 'UNKNOWN';
  }
};

// Usando os tipos LogLevel para validação de nível mínimo
const getMinimumLogLevel = (): LogLevel => {
  const envLevel = process.env.LOG_LEVEL?.toLowerCase();
  switch (envLevel) {
    case 'debug':
      return LogLevel.DEBUG;
    case 'info':
      return LogLevel.INFO;
    case 'warn':
      return LogLevel.WARN;
    case 'error':
      return LogLevel.ERROR;
    case 'fatal':
      return LogLevel.FATAL;
    default:
      return LogLevel.INFO;
  }
};

// Usando os tipos LogLevel para exportação
export const getAvailableLogLevels = (): LogLevel[] => {
  return [...LOG_LEVELS];
};

// Usando os tipos LogLevel diretamente
export const isLogLevel = (level: string): level is LogLevel => {
  return level === LogLevel.DEBUG || 
         level === LogLevel.INFO || 
         level === LogLevel.WARN || 
         level === LogLevel.ERROR || 
         level === LogLevel.FATAL;
};

export interface LogContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  url?: string;
  userAgent?: string;
  timestamp: string;
  environment: string;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  error?: Error;
  context?: LogContext;
  metadata?: Record<string, any>;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  private createContext(): LogContext {
    return {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    };
  }

  private formatMessage(entry: LogEntry): string {
    const { level, message, error, context, metadata } = entry;
    const timestamp = context?.timestamp || new Date().toISOString();
    
    let formattedMessage = `[${timestamp}] ${logLevelToString(level)}: ${message}`;
    
    if (error) {
      formattedMessage += `\nError: ${error.message}\nStack: ${error.stack}`;
    }
    
    if (metadata && Object.keys(metadata).length > 0) {
      formattedMessage += `\nMetadata: ${JSON.stringify(metadata, null, 2)}`;
    }
    
    return formattedMessage;
  }

  private async sendToExternalService(entry: LogEntry): Promise<void> {
    if (!this.isProduction) return;

    try {
      // Validando o nível de log
      if (!isValidLogLevel(entry.level)) {
        // eslint-disable-next-line no-console
        console.error('Invalid log level:', entry.level);
        return;
      }

      // Integração com Vercel Analytics (se configurado)
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('event', {
          name: 'error',
          data: {
            level: entry.level,
            message: entry.message,
            error: entry.error?.message,
            url: entry.context?.url,
          }
        });
      }

      // Integração com Google Analytics (se configurado)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: entry.message,
          fatal: entry.level === LogLevel.FATAL,
          error: entry.error?.message,
        });
      }

      // Aqui você pode adicionar integração com outros serviços como:
      // - Sentry
      // - LogRocket
      // - DataDog
      // - New Relic
      // - AWS CloudWatch
      
    } catch (error) {
      // Fallback para console em caso de falha no serviço externo
      // eslint-disable-next-line no-console
      console.error('Failed to send log to external service:', error);
    }
  }

  private log(level: LogLevel, message: string, error?: Error, metadata?: Record<string, any>): void {
    const context = this.createContext();
    const entry: LogEntry = { level, message, error, context, metadata };

    // Verificar nível mínimo de log
    const minimumLevel = getMinimumLogLevel();
    if (this.getLogLevelPriority(level) < this.getLogLevelPriority(minimumLevel)) {
      return;
    }

    // Em desenvolvimento, sempre log no console
    if (this.isDevelopment) {
      const formattedMessage = this.formatMessage(entry);
      
      switch (level) {
        case LogLevel.DEBUG:
        case LogLevel.INFO:
          // eslint-disable-next-line no-console
          console.log(formattedMessage);
          break;
        case LogLevel.WARN:
          // eslint-disable-next-line no-console
          console.warn(formattedMessage);
          break;
        case LogLevel.ERROR:
        case LogLevel.FATAL:
          // eslint-disable-next-line no-console
          console.error(formattedMessage);
          break;
      }
    }

    // Em produção, enviar para serviço externo
    if (this.isProduction) {
      this.sendToExternalService(entry);
    }
  }

  private getLogLevelPriority(level: LogLevel): number {
    switch (level) {
      case LogLevel.DEBUG:
        return 0;
      case LogLevel.INFO:
        return 1;
      case LogLevel.WARN:
        return 2;
      case LogLevel.ERROR:
        return 3;
      case LogLevel.FATAL:
        return 4;
      default:
        return 1;
    }
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, undefined, metadata);
  }

  info(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, undefined, metadata);
  }

  warn(message: string, error?: Error, metadata?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, error, metadata);
  }

  error(message: string, error?: Error, metadata?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, error, metadata);
  }

  fatal(message: string, error?: Error, metadata?: Record<string, any>): void {
    this.log(LogLevel.FATAL, message, error, metadata);
  }

  // Método específico para erros de API
  apiError(endpoint: string, error: Error, metadata?: Record<string, any>): void {
    this.error(`API Error at ${endpoint}`, error, {
      endpoint,
      ...metadata
    });
  }

  // Método específico para erros de componente React
  componentError(componentName: string, error: Error, metadata?: Record<string, any>): void {
    this.error(`Component Error in ${componentName}`, error, {
      componentName,
      ...metadata
    });
  }

  // Método específico para erros de autenticação
  authError(action: string, error: Error, metadata?: Record<string, any>): void {
    this.error(`Authentication Error during ${action}`, error, {
      action,
      ...metadata
    });
  }
}

// Instância singleton do logger
export const logger = new Logger();

// Hooks para uso em componentes React
export const useLogger = () => {
  return {
    debug: logger.debug.bind(logger),
    info: logger.info.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
    fatal: logger.fatal.bind(logger),
    apiError: logger.apiError.bind(logger),
    componentError: logger.componentError.bind(logger),
    authError: logger.authError.bind(logger),
  };
}; 