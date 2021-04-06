import calcCommissionFee from './utils.js';

/**
 * Commission must be no less than given amount
 *
 * @param {User} user User model
 * @param {Transaction} transaction Transaction model
 * @param {number} fee Commission fee
 * @param {object} operation Transaction details
 * @param {number} operation.amount Transaction amount
 *
 * @returns {number} Actual fee
 */
function min(user, transaction, fee, { amount }) {
  return Math.max(fee, amount);
}

/**
 * Commission must be no more than given amount
 *
 * @param {User} user User model
 * @param {Transaction} transaction Transaction model
 * @param {number} fee Commission fee
 * @param {object} operation Transaction details
 * @param {number} operation.amount Transaction amount
 *
 * @returns {number} Actual fee
 */
function max(user, transaction, fee, { amount }) {
  return Math.min(fee, amount);
}

/**
 * Commission must be calculated only when week limit is exceeded
 *
 * @param {User} user User model
 * @param {Transaction} transaction Transaction model
 * @param {number} fee Commission fee
 * @param {object} operation Transaction details
 * @param {number} operation.amount Transaction amount
 * @param {number} percents Commission percentage
 *
 * @returns {number} Actual fee
 */
function weekLimit(user, transaction, fee, { amount }, percents) {
  const weekTransactions = user.getWeekTransactions(
    transaction.weekIndex,
    transaction.type
  );
  const index = weekTransactions.indexOf(transaction);
  const previousTransactions = weekTransactions.slice(0, index);

  const processedAmount = previousTransactions.reduce(
    (total, previousTransaction) =>
      total + previousTransaction.operation.amount,
    0
  );
  const overage = processedAmount + transaction.operation.amount - amount;

  return calcCommissionFee(
    Math.min(Math.max(overage, 0), transaction.operation.amount),
    percents
  );
}

export { min, max, weekLimit };
