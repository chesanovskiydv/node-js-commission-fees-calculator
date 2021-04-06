import { parseISO, getWeek, endOfWeek } from 'date-fns';

/**
 * Enum for transaction types.
 *
 * @readonly
 * @enum {string}
 */
export const TRANSACTION_TYPES = {
  cashIn: 'cash_in',
  cashOut: 'cash_out',
};

export default class Transaction {
  /**
   * @param {object} arguments Transaction details
   * @param {string} arguments.type Transaction type
   * @param {string} arguments.date Transaction date
   * @param {object} arguments.operation Transaction details
   */
  constructor({ type, date, operation }) {
    this.type = type;
    this.date = parseISO(date);
    this.operation = operation;
  }

  /**
   * Week index
   *
   * @returns {string} Week index
   */
  get weekIndex() {
    const weekOptions = { weekStartsOn: 1 };

    const year = endOfWeek(this.date, weekOptions).getFullYear();
    const week = getWeek(this.date, weekOptions);

    return `${year}-${week}`;
  }
}
