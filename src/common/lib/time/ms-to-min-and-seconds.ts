export function msToMinAndSeconds(millis: number | null) {
  if (typeof millis !== 'number') {
    return '0';
  }
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  const ms = ((millis % 1000) / 100).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}:${ms}`;
}