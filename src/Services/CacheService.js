export default class CacheService {
  constructor() {
    this.storage = new Map();
  }

  /**
   * Get value from cache
   *
   * @param {string} key Cache key
   * @param {*} value Value or Function that returns the value that needs to be cached
   *
   * @returns {*} Value or Promise
   */
  get(key, value) {
    if (!this.storage.has(key)) {
      this.storage.set(key, typeof value === 'function' ? value() : value);
    }

    return this.storage.get(key);
  }
}
