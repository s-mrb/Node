const non_strict_assertion_ = (a, b) => {
  const assert = require('assert')
  assert.deepEqual(a, b)
}

const strict_assertion_ = (a, b) => {
  const assert = require('assert').strict
  assert.deepEqual(a, b)
}

const assertionError_ = (actual, expected, options) => {
  // options is json object

  const assert = require('assert')
  const { message } = new assert.AssertionError(options)

  try {
    assert[options.operator](actual, expected)
  } catch (err) {
    assert(err instanceof assert.AssertionError)
    assert.strictEqual(err.message, message)
    assert.strictEqual(err.name, 'AssertionError')
    assert.strictEqual(err.actual, actual)
    assert.strictEqual(err.expected, expected)
    assert.strictEqual(err.code, 'ERR_ASSERTION')
    assert.strictEqual(err.operator, options.operator)
    assert.strictEqual(err.generatedMessage, true)
  }
}

// EXPERIMENTAL Feature
const callTracker_ = (func, n, report = false) => {
  const assert = require('assert')
  const tracker = new assert.CallTracker()

  // callsfunc() must be called exactly n time before tracker.verify().
  // The wrapper function is expected to be called exactly exact times.
  // If the function has not been called exactly exact times when tracker.verify() is called, then tracker.verify() will throw an error.
  const callsfunc = tracker.calls(func, n)

  callsfunc()

  if (report) {

    // Returns: <Array> of objects containing information about the wrapper functions returned by tracker.calls().
    // Obj -> message, actual, expected, operator, stack
    console.log(tracker.report())
  } else {
    // Calls tracker.verify() and verifies if all tracker.calls() functions have
    // been called exact times.
    process.on('exit', () => {
      tracker.verify()
    })
  }
}

module.exports = {
  non_strict_assertion_,
  strict_assertion_,
  assertionError_,
  callTracker_,
}
