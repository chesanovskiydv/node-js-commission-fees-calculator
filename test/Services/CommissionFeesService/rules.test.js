import { assert } from 'chai';
import {
  min,
  max,
  weekLimit,
} from '../../../src/Services/CommissionFeesService/rules.js';
import {
  User,
  Transaction,
  TRANSACTION_TYPES,
} from '../../../src/Models/index.js';

describe('CommissionFeesService.rules', () => {
  const user = new User({
    id: 1,
    type: 'natural',
  });
  const transaction = new Transaction({
    type: TRANSACTION_TYPES.cashIn,
    operation: {
      amount: 200,
      currency: 'EUR',
    },
  });

  describe('#min()', () => {
    it('should return commission that must be no less than given amount', async () => {
      assert.equal(min(user, transaction, 3, { amount: 2 }), 3);
      assert.equal(min(user, transaction, 3, { amount: 4 }), 4);
    });
  });

  describe('#max()', () => {
    it('should return commission that must be no more than given amount', async () => {
      assert.equal(max(user, transaction, 3, { amount: 2 }), 2);
      assert.equal(max(user, transaction, 3, { amount: 4 }), 3);
    });
  });
  describe('#weekLimit()', () => {
    it('should return commission that must be calculated only when week limit is exceeded', async () => {
      const operation = { amount: 1000 };
      // eslint-disable-next-line no-shadow
      const user = new User({
        id: 1,
        type: 'natural',
      });

      [200, 500, 125, 175].forEach((amount) => {
        // eslint-disable-next-line no-shadow
        const transaction = new Transaction({
          date: '2016-01-05',
          type: TRANSACTION_TYPES.cashOut,
          operation: {
            amount,
            currency: 'EUR',
          },
        });
        user.addTransaction(transaction);
        assert.equal(weekLimit(user, transaction, 25, operation, 0.3), 0);
      });

      [1100, 1300].forEach((amount) => {
        // eslint-disable-next-line no-shadow
        const transaction = new Transaction({
          date: '2016-01-05',
          type: TRANSACTION_TYPES.cashOut,
          operation: {
            amount,
            currency: 'EUR',
          },
        });
        user.addTransaction(transaction);

        assert.isAbove(weekLimit(user, transaction, 25, operation, 0.3), 0);
      });
    });
  });
});
