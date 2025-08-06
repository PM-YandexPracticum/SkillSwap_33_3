export function getLocalItem<T>(key: string) {
  const item = localStorage.getItem(key);

  if (item) return JSON.parse(item) as T;
  return undefined;
}

export function setLocalItem<T>(key: string, value: T) {
  const item = JSON.stringify(value);

  localStorage.setItem(key, item);
}

export function clearLocalItem(key: string) {
  localStorage.removeItem(key);
}
