import { assert } from 'chai';
import calcCommissionFee from '../../../src/Services/CommissionFeesService/utils.js';

describe('CommissionFeesService.utils', () => {
  describe('#calcCommissionFee()', () => {
    it('should return calculated commission fee', async () => {
      assert.equal(calcCommissionFee(50, 4.6), 2.3);
      assert.equal(calcCommissionFee(100, 2.3), 2.3);
      assert.equal(calcCommissionFee(100, 0.23), 0.23);
      assert.equal(calcCommissionFee(100, 0.023), 0.03);
      assert.equal(calcCommissionFee(100, 0.028), 0.03);
      assert.equal(calcCommissionFee(200, 0.014), 0.03);
    });
  });
});
