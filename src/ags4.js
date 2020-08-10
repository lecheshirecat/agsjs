/**
 * AGS4.x importer
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 */

import utils from './utils'

export default function(content) {
  var groups = {}
  var blocks = content.trim().split('\n\r').map(block => block.trim().split(/\n/g))
  blocks.forEach(block => {
    if (block.length) {
      var groupName = ''
      var headers = []
      var data = []
      block.forEach(group => {
        var cells = []
        var row = group.split('",').map(part => {
          const v = (part || '').replace(/"/g, '')
          return v.length > 0 ? v : ''
        })
        if (row.length > 1) {
          var firstCell = row[0] || ''
          if (firstCell === 'GROUP') {
            groupName = (row[1] || '').trim()
          } else if (firstCell === 'HEADING') {
            row.forEach((cell, index) => {
              if (index > 0) {
                headers.push({
                  name: cell.length ? cell.trim() : 'undefined',
                  unit: '',
                  type: ''
                })
              }
            })
          } else if (firstCell === 'UNIT') {
            row.forEach((cell, index) => {
              if (index > 0 && index < headers.length) {
                headers[index - 1].unit = cell.length ? cell.trim() : ''
              }
            })
          } else if (firstCell === 'TYPE') {
            row.forEach((cell, index) => {
              if (index > 0 && index < headers.length) {
                headers[index - 1].type = cell.length ? cell.trim() : ''
              }
            })
          } else if (firstCell === 'DATA') {
            row.forEach((cell, index) => {
              const value = cell.length ? cell.trim() : ''
              if (index > 0) {
                const header = index < headers.length ? headers[index - 1] : {}
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
            })
            if (cells.length < headers.length) {
              while (cells.length < headers.length) {
                cells.push(null)
              }
            }
            data.push(cells)
          }
        }
      })
      if (groupName.length) {
        groups[groupName] = {
          columns: headers,
          rows: data
        }
      }
    }
  })

  return groups
}
