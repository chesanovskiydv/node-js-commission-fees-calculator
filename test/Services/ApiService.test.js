import { assert } from 'chai';
import { ApiService } from '../../src/Services/index.js';

describe('ApiService', () => {
  const instance = new ApiService(process.env.BASE_API_URL);
  const checkTransactionRulesResponse = (response) => {
    assert.containsAllKeys(response, ['percents']);

    const { percents, ...rules } = response;

    Object.entries(rules).forEach(([, options]) => {
      assert.containsAllKeys(options, ['amount']);
    });
  };

  describe('#getCashIn()', () => {
    it('options for "cash-in" transactions from api', async () => {
      const response = await instance.getCashIn();

      checkTransactionRulesResponse(response);
    });
  });

  describe('#getCashOut()', () => {
    it('options for "cash-out" transactions from api', async () => {
      await Promise.all(
        ['natural', 'juridical'].map((type) => instance.getCashOut(type))
      ).then((responses) => {
        responses.forEach((response) =>
          checkTransactionRulesResponse(response)
        );
      });
    });
  });
});
