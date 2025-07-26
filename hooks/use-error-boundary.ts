import { useCallback } from 'react';
import { logger } from '@/lib/logger';

export interface ErrorInfo {
  componentStack: string;
  error: Error;
}

export const useErrorBoundary = (componentName: string) => {
  const handleError = useCallback((error: Error, errorInfo?: ErrorInfo) => {
    logger.componentError(componentName, error, {
      componentStack: errorInfo?.componentStack,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    });
  }, [componentName]);

  return { handleError };
}; 