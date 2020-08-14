/**
 * AGS4.x importer
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 */

import utils from './utils'

export default function(content) {
  var groups = []
  var blocks = utils.block(content)

  for (let i = 0; i < blocks.length; i++) {
    var block = blocks[i]
    var heading = ''
    var headers = []
    var data = []
    for (let j = 0; j < block.length; j++) {
      var row = block[j]
      if (row.length < 2) {
        continue
      }

      var firstCell = row[0] || ''
      if (firstCell === 'GROUP') {
        heading = (row[1] || '').trim()
      } else if (firstCell === 'HEADING') {
        for (let k = 1; k < row.length; k++) {
          const cell = row[k]
          headers.push({
            name: cell.length ? cell.trim() : 'undefined',
            unit: '',
            type: ''
          })
        }
      } else if (firstCell === 'UNIT') {
        for (let k = 1; k < row.length; k++) {
          const cell = row[k]
          if (k < headers.length) {
            headers[k - 1].unit = cell.length ? cell.trim() : ''
          }
        }
      } else if (firstCell === 'TYPE') {
        for (let k = 1; k < row.length; k++) {
          const cell = row[k]
          if (k < headers.length) {
            headers[k - 1].type = cell.length ? cell.trim() : ''
          }
        }
      } else if (firstCell === 'DATA') {
        var cells = []
        for (let k = 1; k < row.length; k++) {
          const cell = row[k]
          const value = cell.length ? cell.trim() : ''
          const header = k < headers.length ? headers[k - 1] : {}
          const type = header.type || 'X'
          if (type === 'DT') {
            cells.push(utils.testIsoDate(value) ? value : null)
          } else if (type.indexOf('DP') > -1 || type.indexOf('SP') > 1) {
            const dp = Number.parseInt(type.replace(/\D+/g, ''))
            cells.push(value.length ? utils.round(Number.parseFloat(value), dp) : null)
          } else {
            if (utils.testNonDigit(value)) {
              cells.push(value.length ? value : null)
            } else {
              cells.push(value.length ? utils.round(Number.parseFloat(value), 5) : null)
            }
          }
        }

        if (headers.length < cells.length) {
          while (headers.length < cells.length) {
            headers.push({
              name: `${heading}_${headers.length}`,
              unit: '',
              type: ''
            })
          }
        }
        if (cells.length < headers.length) {
          while (cells.length < headers.length) {
            cells.push(null)
          }
        }

        data.push(cells)
      }
    }
    if (heading.length) {
      groups.push({
        heading: heading,
        columns: headers,
        rows: data
      })
    }
  }

  return groups
}
