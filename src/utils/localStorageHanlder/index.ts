class LocalStorageHandler {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  get<T = string>(key: string): T | null {
    const storedData = this.storage.getItem(key);
    return storedData !== null ? (JSON.parse(storedData) as T) : null;
  }

  set(key: string, value: unknown): this {
    this.storage.setItem(key, JSON.stringify(value));
    return this;
  }

  remove(key: string): this {
    this.storage.removeItem(key);
    return this;
  }
}

export const localStorageHandler = new LocalStorageHandler();
