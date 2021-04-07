/**
 * Add "callCount" property that shows how many times the function has been called
 *
 * @param {Function} fn Any Function
 *
 * @returns {Function} Function with a "callCount" property that shows how many times the function has been called
 */
function callCounter(fn) {
  const spyFunction = (...args) => {
    spyFunction.callCount += 1;
    return fn.apply(this, args);
  };
  spyFunction.callCount = 0;

  return spyFunction;
}

export default callCounter;
