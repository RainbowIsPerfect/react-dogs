export function localStorageHandler(action: 'remove', key: string): void;
export function localStorageHandler(action: 'get', key: string): string | null;
export function localStorageHandler(
  action: 'set',
  key: string,
  value: string
): void;
export function localStorageHandler(
  action: 'remove' | 'get' | 'set',
  key: string,
  value?: string
): string | null | void {
  switch (action) {
    case 'remove':
      return localStorage.removeItem(key);
    case 'get':
      return localStorage.getItem(key);
    case 'set':
      return localStorage.setItem(key, value || '');
    default:
      return null;
  }
}
