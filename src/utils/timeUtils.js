export function getTimeRemaining(targetDate) {
  const diff = new Date(targetDate) - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, diff: 0 };
  }

  return {
    days:      Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:     Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes:   Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds:   Math.floor((diff % (1000 * 60)) / 1000),
    isExpired: false,
    diff,
  };
}

export function getUrgency(targetDate) {
  const diff = new Date(targetDate) - Date.now();
  const days = diff / (1000 * 60 * 60 * 24);
  if (diff <= 0) return 'expired';
  if (days < 1)  return 'imminent';
  if (days < 7)  return 'soon';
  if (days < 30) return 'upcoming';
  return 'distant';
}

export function getProgressPercent(createdAt, targetDate) {
  const total   = new Date(targetDate) - new Date(createdAt);
  const elapsed = Date.now() - new Date(createdAt);
  if (total <= 0) return 100;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export function formatRelativePast(targetDate) {
  const diff = Date.now() - new Date(targetDate);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export function sortCountdowns(countdowns) {
  return [...countdowns].sort((a, b) => {
    const aExp = new Date(a.targetDate) < Date.now();
    const bExp = new Date(b.targetDate) < Date.now();
    if (aExp && !bExp) return 1;
    if (!aExp && bExp) return -1;
    return new Date(a.targetDate) - new Date(b.targetDate);
  });
}

export function formatTargetDate(targetDate) {
  return new Date(targetDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month:   'short',
    day:     'numeric',
    year:    'numeric',
  });
}
