/**
 * Calculates commission fee
 *
 * @param {number} amount Transaction amount
 * @param {number} percents Commission fee percentage
 *
 * @returns {number} Returns the commission fee
 */
function calcCommissionFee(amount, percents) {
  return Math.ceil(amount * (percents / 100) * 100) / 100;
}

export default calcCommissionFee;
