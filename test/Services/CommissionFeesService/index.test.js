import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import CommissionFeesService from '../../../src/Services/CommissionFeesService/index.js';
import {
  User,
  Transaction,
  TRANSACTION_TYPES,
} from '../../../src/Models/index.js';
import { input, output } from '../../io.js';

chai.use(chaiAsPromised);

describe('CommissionFeesService.index', () => {
  describe('#getCommissionFee()', async () => {
    const instance = new CommissionFeesService();

    it('should return commission fee for User from Transaction', async () => {
      const users = {};
      const getUser = (id, type) => {
        if (!users[id]) {
          users[id] = new User({ id, type });
        }

        return users[id];
      };

      const getLineCommissionFee = (data) => {
        // eslint-disable-next-line camelcase
        const { date, user_id, user_type, type, operation } = data;
        const user = getUser(user_id, user_type);
        const transaction = new Transaction({ type, date, operation });
        user.addTransaction(transaction);

        return instance.getCommissionFee(user, transaction);
      };

      await Promise.all(input.map((data) => getLineCommissionFee(data))).then(
        (commissions) => {
          commissions.forEach((commission, index) => {
            assert.equal(commission, output[index]);
          });
        }
      );
    });

    it('should throw Exception when wrong operation type passed', async () => {
      const user = new User({ id: 1, type: 'natural' });
      const transaction = new Transaction({
        date: '2016-01-05',
        type: 'wrong type',
        operation: {
          amount: 200,
          currency: 'EUR',
        },
      });

      assert.isRejected(instance.getCommissionFee(user, transaction));
    });

    it('should throw Exception when unsupported rule passed', async () => {
      const service = new CommissionFeesService();
      const user = new User({ id: 1, type: 'natural' });
      const transaction = new Transaction({
        date: '2016-01-05',
        type: TRANSACTION_TYPES.cashIn,
        operation: {
          amount: 200,
          currency: 'EUR',
        },
      });

      service.rules = {};

      assert.isRejected(service.getCommissionFee(user, transaction));
    });
  });
});
