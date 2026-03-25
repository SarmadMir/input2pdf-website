export function formatDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function ordinalDate(date: Date = new Date()): string {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  return `${day}${suffix} ${month}, ${date.getFullYear()}`;
}
