type StorageBackend = Storage;

export class StorageAccessor {
  private static ls: StorageBackend =
    typeof globalThis.localStorage === 'undefined' ? ({} as Storage) : globalThis.localStorage;

  static get<T>(key: string): T | null {
    const item = this.ls.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  static set<T>(key: string, value: T): boolean {
    try {
      this.ls.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  static remove(key: string): void {
    this.ls.removeItem(key);
  }

  static clear(): void {
    this.ls.clear();
  }
}

// Exporta como una referencia simplificada
export const ls = StorageAccessor;
