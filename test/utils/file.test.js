import { assert } from 'chai';
import path from 'path';
import file from '../../src/utils/file.js';

describe('file', () => {
  describe('#read()', () => {
    it('should return file content', async () => {
      assert.equal(
        await file.read(path.join(process.cwd(), '/test/test.json')),
        '[{"date": "2016-01-05"}]'
      );
    });
  });
});
