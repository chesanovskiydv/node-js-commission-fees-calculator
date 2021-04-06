import { User, Transaction } from './Models/index.js';
import { CommissionFeesService } from './Services/index.js';

/**
 * Main application class
 */
export default class App {
  constructor() {
    this.users = new Map();
    this.services = {
      CommissionFeesService: new CommissionFeesService(),
    };
  }

  /**
   * Get User model by user_id or create new if not exists
   *
   * @param {object} user User properties
   * @param {number} user.user_id User key
   * @param {string} user.user_type User type
   *
   * @returns {User} User model
   */
  // eslint-disable-next-line camelcase
  getUser({ user_id, user_type }) {
    if (!this.users.has(user_id)) {
      this.users.set(user_id, new User({ id: user_id, type: user_type }));
    }

    return this.users.get(user_id);
  }

  /**
   * Calculate and return transaction commission fee
   *
   * @param {object} arguments User and Transaction details
   * @param {number} arguments.user_id User key
   * @param {string} arguments.user_type User type
   * @param {string} arguments.type Transaction type
   * @param {string} arguments.date Transaction date
   * @param {object} arguments.operation Transaction details
   *
   * @returns {Promise<number>} Commission fee
   */
  // eslint-disable-next-line camelcase
  getCommissionFee({ user_id, user_type, type, date, operation }) {
    const user = this.getUser({ user_id, user_type });
    const transaction = new Transaction({ type, date, operation });

    user.addTransaction(transaction);

    return this.services.CommissionFeesService.getCommissionFee(
      user,
      transaction
    );
  }
}
