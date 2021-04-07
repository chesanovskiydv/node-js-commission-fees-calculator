import { assert } from 'chai';
import { Transaction, TRANSACTION_TYPES } from '../../src/Models/index.js';

describe('Transaction', () => {
  describe('constructor', () => {
    it('instance should contains properties', () => {
      const props = {
        type: TRANSACTION_TYPES.cashIn,
        date: '2016-01-05',
        operation: {
          amount: 200,
          currency: 'EUR',
        },
      };
      const instance = new Transaction(props);

      assert.equal(instance.type, props.type);
      assert.deepEqual(instance.date, new Date(2016, 0, 5));
      assert.equal(instance.operation, props.operation);
    });
  });

  describe('weekIndex', () => {
    it('should return correct week index', () => {
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

      Object.entries(dates).forEach(([date, weekKey]) => {
        const props = {
          type: TRANSACTION_TYPES.cashIn,
          operation: {
            amount: 200,
            currency: 'EUR',
          },
        };

        const instance = new Transaction({ ...props, date });

        assert.equal(instance.weekIndex, weekKey);
      });
    });
  });
});
