import { assert } from 'chai';
import axios from 'axios';
import api from '../../src/utils/api.js';

describe('api', () => {
  describe('#createInstance()', () => {
    it('should return Axios instance', async () => {
      const instance = api.createInstance('http://test.com');

      const staticProps = [
        'Axios',
        'create',
        'Cancel',
        'CancelToken',
        'isCancel',
        'all',
        'spread',
        'isAxiosError',
        'default',
      ];

      Object.keys(axios).forEach((key) => {
        if (!staticProps.includes(key)) {
          assert.strictEqual(typeof instance[key], typeof axios[key]);
        }
      });
    });
  });
});
