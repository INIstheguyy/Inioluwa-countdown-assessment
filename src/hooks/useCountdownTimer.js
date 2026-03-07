import { useState, useEffect } from 'react';
import { getTimeRemaining, getUrgency } from '../utils/timeUtils';

export function useCountdownTimer(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(targetDate));
  const [urgency,  setUrgency]  = useState(() => getUrgency(targetDate));

  useEffect(() => {
    // Recalculate immediately when targetDate changes
    setTimeLeft(getTimeRemaining(targetDate));
    setUrgency(getUrgency(targetDate));

    const interval = setInterval(() => {
      const next = getTimeRemaining(targetDate);
      setTimeLeft(next);
      setUrgency(getUrgency(targetDate));
    }, 1000);

    // CRITICAL: cleanup prevents memory leak when card is removed
    return () => clearInterval(interval);
  }, [targetDate]);

  return { ...timeLeft, urgency };
}
