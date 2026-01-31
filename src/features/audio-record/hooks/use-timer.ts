import { useEffect, useMemo, useRef, useState } from 'react';
import { msToMinAndSeconds } from '@common/lib';

const intervalMs = 100;

export const useTimer = () => {
  const [value, setValue] = useState<null | number>(null);
  const intervalRef = useRef<undefined | NodeJS.Timeout>(undefined);

  const start = () => {
    clear();
    setValue(0);
    intervalRef.current = setInterval(() => {
      setValue((prev) => (typeof prev === 'number' ? prev + intervalMs : 0));
    }, intervalMs);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  const clear = () => {
    setValue(null);
    clearInterval(intervalRef.current);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
  };

  const continueTimer = () => {
    intervalRef.current = setInterval(() => {
      setValue((prev) => (typeof prev === 'number' ? prev + intervalMs : 0));
    }, intervalMs);
  };

  useEffect(() => {
    return () => clear();
  }, []);

  const formatedValue = useMemo(() => {
    return msToMinAndSeconds(value);
  }, [value]);

  return {
    start,
    value,
    stop,
    formatedValue,
    pauseTimer,
    continueTimer,
  };
};
