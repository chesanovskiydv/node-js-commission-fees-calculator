import { assert } from 'chai';
import callCounter from '../utils.js';
import { CacheService } from '../../src/Services/index.js';

describe('CacheService', () => {
  describe('#get()', () => {
    it('should return cached value', async () => {
      const cachedValue = 'foo';
      const instance = new CacheService();

      assert.equal(instance.get('test', 123), 123);
      assert.equal(instance.get('test', 321), 123);

      const callback = callCounter(() => cachedValue);

      assert.equal(instance.get('test callback', callback), cachedValue);
      assert.equal(instance.get('test callback', callback), cachedValue);
      assert.equal(callback.callCount, 1);
    });
  });
});
