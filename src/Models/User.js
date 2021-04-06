export default class User {
  /**
   * @param {object} arguments User details
   * @param {number} arguments.id User key
   * @param {string} arguments.type User type
   */
  constructor({ id, type }) {
    this.id = id;
    this.type = type;
    this.transations = {};
  }

  /**
   * Add transaction to user history
   *
   * @param {Transaction} transaction Transaction model
   */
  addTransaction(transaction) {
    const { type, weekIndex } = transaction;

    if (!this.transations[weekIndex]) {
      this.transations[weekIndex] = {};
    }

    if (!this.transations[weekIndex][type]) {
      this.transations[weekIndex][type] = [];
    }

    this.transations[weekIndex][type].push(transaction);
  }

  /**
   * Get week transactions of selected type
   *
   * @param {string} weekIndex Week index
   * @param {string} type Transaction type
   *
   * @returns {Array<Transaction>} Transactions for week
   */
  getWeekTransactions(weekIndex, type) {
    return this.transations?.[weekIndex]?.[type] || [];
  }
}
