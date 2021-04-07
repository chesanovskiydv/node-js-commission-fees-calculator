import { min, max, weekLimit } from './rules.js';
import calcCommissionFee from './utils.js';
import ApiService from '../ApiService.js';
import CacheService from '../CacheService.js';
import { TRANSACTION_TYPES } from '../../Models/index.js';

export default class CommissionFeesService {
  constructor() {
    this.api = new ApiService(process.env.BASE_API_URL);
    this.cache = new CacheService();
    this.rules = {
      min,
      max,
      week_limit: weekLimit,
    };
  }

  /**
   * Get commission fee for User from Transaction
   *
   * @param {User} user User model
   * @param {Transaction} transaction Transaction model
   *
   * @returns {Promise<number>} Commission fee
   * @throws {Error} Unsupported operation type
   */
  async getCommissionFee(user, transaction) {
    const { type } = transaction;

    if (type === TRANSACTION_TYPES.cashIn) {
      return this.getCashInCommission(user, transaction);
    }
    if (type === TRANSACTION_TYPES.cashOut) {
      return this.getCashOutCommission(user, transaction);
    }

    throw new Error(`Unsupported operation type: ${type}`);
  }

  /**
   * Get commission fee for User from 'cash-in' Transaction
   *
   * @param {User} user User model
   * @param {Transaction} transaction Transaction model
   *
   * @returns {Promise<number>} Commission fee
   */
  async getCashInCommission(user, transaction) {
    const { percents, ...rules } = await this.cache.get('cash-in', () =>
      this.api.getCashIn()
    );

    const fee = calcCommissionFee(transaction.operation.amount, percents);

    return this.applyRules(user, transaction, fee, rules, percents);
  }

  /**
   * Get commission fee for User from 'cash-out' Transaction
   *
   * @param {User} user User model
   * @param {Transaction} transaction Transaction model
   *
   * @returns {Promise<number>} Commission fee
   */
  async getCashOutCommission(user, transaction) {
    const { percents, ...rules } = await this.cache.get(
      `cash-out-${user.type}`,
      () => this.api.getCashOut(user.type)
    );
    const fee = calcCommissionFee(transaction.operation.amount, percents);

    return this.applyRules(user, transaction, fee, rules, percents);
  }

  /**
   * Get Commission fee after commission rules applied
   *
   * @param {User} user User model
   * @param {Transaction} transaction Transaction model
   * @param {number} fee Commission fee
   * @param {object} rules Rules to be applied
   * @param {number} percents Commission percentage
   *
   * @returns {number} Commission fee
   * @throws {Error} Unsupported rule
   */
  applyRules(user, transaction, fee, rules, percents) {
    return Object.entries(rules).reduce((acc, [rule, props]) => {
      if (this.rules[rule]) {
        return this.rules[rule](user, transaction, acc, props, percents);
      }

      throw new Error(`Unsupported rule: ${rule}`);
    }, fee);
  }
}
