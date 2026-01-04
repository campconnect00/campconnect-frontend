import { useEffect, useCallback } from 'react';

interface RealtimeOptions {
  onUpdate?: (data: any) => void;
  onError?: (error: Error) => void;
  interval?: number;
}

export const useRealtime = (options: RealtimeOptions = {}) => {
  const { onUpdate, onError, interval = 5000 } = options;

  const startListening = useCallback(() => {
    const intervalId = setInterval(() => {
      // Simulate real-time updates
      // In production, this would use WebSockets or Server-Sent Events
      if (onUpdate) {
        onUpdate({
          timestamp: new Date().toISOString(),
          data: {},
        });
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, onUpdate, onError]);

  useEffect(() => {
    const cleanup = startListening();
    return cleanup;
  }, [startListening]);

  return {
    startListening,
  };
};

export default useRealtime;
