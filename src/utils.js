/**
 * Utils
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 */

/* eslint-disable no-useless-escape */

export default {
  testIsoDate: function(value) {
    return /\d{4}-\d{2}-\d{2}/g.test(value)
  },
  testNonDigit: function(value) {
    return /[a-zA-Z\/-]+/g.test(value)
  },
  round: function(value, decimal) {
    if (!decimal) decimal = 1
    var r = Math.pow(10, decimal)
    var v = (value !== null || value !== undefined) ? Number.parseFloat(value) : 0
    if (isNaN(v) || !isFinite(v)) {
      v = 0
    }
    return Math.round(v * r) / r
  }
}
