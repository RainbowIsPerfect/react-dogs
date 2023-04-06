class LocalStorageHandler {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  get<T = string>(key: string): T | null {
    const storedData = this.storage.getItem(key);

    if (storedData !== null) {
      return JSON.parse(storedData) as T;
    }

    return null;
  }

  set(key: string, value: unknown): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
}

export const localStorageHandler = new LocalStorageHandler();
