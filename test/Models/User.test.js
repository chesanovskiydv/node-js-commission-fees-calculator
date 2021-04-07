import { assert } from 'chai';
import {
  User,
  Transaction,
  TRANSACTION_TYPES,
} from '../../src/Models/index.js';

describe('User', () => {
  describe('#constructor()', () => {
    it('instance should contains properties', () => {
      const props = {
        id: 1,
        type: 'natural',
      };

      const instance = new User(props);

      Object.entries(props).forEach(([key, value]) => {
        assert.equal(instance[key], value);
      });
    });
  });

  describe('#addTransaction() and #getWeekTransactions()', () => {
    it('should add transaction to User instance and return it by week index', () => {
      const instance = new User({
        id: 1,
        type: 'natural',
      });
      const props = {
        type: TRANSACTION_TYPES.cashIn,
        operation: {
          amount: 200,
          currency: 'EUR',
        },
      };

      const dates = {
        '2015-12-31': '2016-1',
        '2016-01-01': '2016-1',
        '2016-01-05': '2016-2',
        '2016-01-06': '2016-2',
        '2016-01-07': '2016-2',
        '2016-01-10': '2016-2',
        '2016-01-11': '2016-3',
        '2016-02-15': '2016-8',
      };

      assert.isArray(
        instance.getWeekTransactions('2021-01', TRANSACTION_TYPES.cashOut)
      );
      Object.entries(dates).forEach(([date, weekKey]) => {
        const transaction = new Transaction({ ...props, date });

        assert.notInclude(
          instance.getWeekTransactions(weekKey, transaction.type),
          transaction
        );
        instance.addTransaction(transaction);
        assert.include(
          instance.getWeekTransactions(weekKey, transaction.type),
          transaction
        );
      });
    });
  });
});
