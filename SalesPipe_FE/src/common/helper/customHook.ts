import { useState, useEffect } from 'react';

export const useTimer = () => {
  const [isRunning, setIsRunning] = useState<any>(false);
  const [elapsedTime, setElapsedTime] = useState<any>(0);

  useEffect(() => {
    let interval: any;

    if (isRunning) {
      interval = setInterval(
        () => setElapsedTime((prevElapsedTime: any) => prevElapsedTime + 0.1),
        100
      );
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime
  };
};

export const useStopwatch = () => {
  const [laps, setLaps] = useState<any>([]);
  const { isRunning, setIsRunning, elapsedTime, setElapsedTime } = useTimer();

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const handleAddLap = () => {
    const prevTotal: any = laps.reduce((acc: any, curr: any) => acc + curr, 0);

    isRunning && setLaps([elapsedTime - prevTotal, ...laps]);
  };

  return {
    elapsedTime: elapsedTime.toFixed(1),
    laps,
    addLap: () => handleAddLap(),
    resetTimer: () => handleReset(),
    startTimer: () => setIsRunning(true),
    stopTimer: () => setIsRunning(false),
    isRunning
  };
};
