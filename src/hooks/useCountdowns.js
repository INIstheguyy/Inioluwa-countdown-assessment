import { useState, useEffect } from 'react';
import { loadCountdowns, saveCountdowns } from '../utils/storage';
import { sortCountdowns } from '../utils/timeUtils';

export function useCountdowns() {
  const [countdowns, setCountdowns] = useState(() => loadCountdowns());

  // Mirror to localStorage on every change
  useEffect(() => {
    saveCountdowns(countdowns);
  }, [countdowns]);

  function addCountdown(data) {
    const newCountdown = {
      id:          crypto.randomUUID(),
      name:        data.name.trim(),
      targetDate:  data.targetDate,
      description: data.description?.trim() || '',
      emoji:       data.emoji || '',
      createdAt:   new Date().toISOString(),
    };
    setCountdowns(prev => sortCountdowns([...prev, newCountdown]));
    return newCountdown;
  }

  function updateCountdown(id, data) {
    setCountdowns(prev =>
      sortCountdowns(
        prev.map(c => c.id === id ? { ...c, ...data } : c)
      )
    );
  }

  function deleteCountdown(id) {
    setCountdowns(prev => prev.filter(c => c.id !== id));
  }

  return {
    countdowns: sortCountdowns(countdowns),
    addCountdown,
    updateCountdown,
    deleteCountdown,
  };
}
