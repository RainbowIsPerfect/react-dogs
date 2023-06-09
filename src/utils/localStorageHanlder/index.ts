// @deprecated

class LocalStorageHandler {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  get<T = string>(key: string): T | null {
    const storedData = this.storage.getItem(key);
    return storedData ? (JSON.parse(storedData) as T) : null;
  }

  setAll(values: [string, unknown][]): this {
    values.forEach((value) => {
      this.set(value[0], value[1]);
    });
    return this;
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
