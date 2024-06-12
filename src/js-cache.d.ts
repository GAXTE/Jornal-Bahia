// js-cache.d.ts
declare module "js-cache" {
  class Cache {
    get(key: string): any;
    set(key: string, value: any, time?: number): void;
    del(key: string): void;
    clear(): void;
  }

  export = Cache;
}
