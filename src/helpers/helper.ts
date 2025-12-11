export function getIsPointerFine() {
  return window.matchMedia('(pointer: fine)').matches;
}
export function formatForDatetimeLocal(isoString: string) {
  if (!isoString) return '';

  const date = new Date(isoString);

  const pad = (num: number) => (num < 10 ? '0' + num : num);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatPrice(value: number | string): string {
  return Number(value).toLocaleString('en-US', {
    currency: 'BDT',
  });
}
