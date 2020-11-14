/**
 * AGS3.x importer
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
      if (row.length < 1) {
        continue
      }

      var firstCell = row[0] || ''
      if (firstCell.indexOf('**') > -1) {
        heading = firstCell.replace(/[?*]/g, '').trim()
      } else if (firstCell.charAt(0) === '*') {
        for (let k = 0; k < row.length; k++) {
          const cell = row[k]
          headers.push({
            name: cell.length ? cell.replace(/[?*]/g, '').trim() : 'undefined',
            unit: '',
            type: ''
          })
        }
      } else if (firstCell === '<UNITS>') {
        for (let k = 0; k < row.length; k++) {
          const cell = row[k]
          if (k < headers.length) {
            headers[k].unit = cell.length ? cell.trim() : ''
          }
        }
      } else {
        var cont = (firstCell === '<CONT>' && data.length > 0)
        var cells = []
        for (let k = 0; k < row.length; k++) {
          const cell = row[k]
          const value = cell && cell.length ? cell : ''
          const header = k < headers.length ? headers[k] : {}
          const unit = header.unit || ''
          if (unit === 'dd/mm/yyyy') {
            const parts = value.split('/')
            cells.push(parts.length === 3 ? `${parts[2].trim()}-${parts[1].trim()}-${parts[0].trim()}` : null)
          } else if (unit === 'yyyy-mm-dd') {
            const parts = value.split('-')
            cells.push(parts.length === 3 ? `${parts[0].trim()}-${parts[1].trim()}-${parts[2].trim()}` : null)
          } else if (!value.length) {
            cells.push(null)
          } else if (utils.testDigit(value)) {
            cells.push(utils.round(Number.parseFloat(value.trim()), 5))
          } else {
            cells.push(value)
          }
        }
        if (cont) {
          var prev = data[data.length - 1]
          for (let k = 1; k < cells.length; k++) {
            const cell = cells[k]
            if (cell !== null) {
              if (k < prev.length) {
                prev[k] = prev[k] !== null ? prev[k] + cell : cell
              }
            }
          }
        } else {
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
