import { assert } from 'chai';
import App from '../src/App.js';
import { input, output } from './io.js';

describe('App', () => {
  describe('#getCommissionFee()', async () => {
    const instance = new App();

    it('should return transaction commission fee', async () => {
      await Promise.all(
        input.map((data) => instance.getCommissionFee(data))
      ).then((commissions) => {
        commissions.forEach((commission, index) => {
          assert.equal(commission, output[index]);
        });
      });
    });
  });
});
