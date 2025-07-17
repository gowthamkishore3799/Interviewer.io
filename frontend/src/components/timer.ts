import { useEffect, useState } from "react";

export function useCallTimer(startTime: number = Date.now()) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return {
    elapsed,
    formatted: formatTime(elapsed),
    remainingFormatted: formatTime(Math.max(0, 20 * 60 - elapsed)),
  };
}
