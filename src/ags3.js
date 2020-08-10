/**
 * AGS3.x importer
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 */

import utils from './utils'

export default function(content) {
  var groups = []
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
        if (row.length > 0) {
          var firstCell = row[0] || ''
          if (firstCell.indexOf('**') > -1) {
            groupName = firstCell.replace(/[?*]/g, '').trim()
          } else if (firstCell.charAt(0) === '*') {
            row.forEach((cell, index) => {
              var name = cell.length ? cell.replace(/[?*]/g, '').trim() : ''
              if (name.length) {
                headers.push({
                  name: name,
                  unit: ''
                })
              }
            })
          } else if (firstCell === '<UNITS>') {
            row.forEach((cell, index) => {
              if (index < headers.length) {
                headers[index].unit = cell.length ? cell.trim() : ''
              }
            })
          } else {
            row.forEach((cell, index) => {
              const header = index < headers.length ? headers[index] : {}
              const unit = header.unit || ''
              const value = cell.length ? cell.trim() : ''
              if (unit === 'dd/mm/yyyy') {
                const parts = value.split('/')
                cells.push(parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : null)
              } else if (unit === 'yyyy-mm-dd') {
                const parts = value.split('-')
                cells.push(parts.length === 3 ? `${parts[0]}-${parts[1]}-${parts[2]}` : null)
              } else if (!value.length) {
                cells.push(null)
              } else if (utils.testNonDigit(value)) {
                cells.push(value)
              } else {
                cells.push(utils.round(Number.parseFloat(value), 5))
              }
            })
            if (firstCell === '<CONT>' && data.length > 0) {
              var prev = data[data.length - 1]
              cells.forEach((cell, idx) => {
                if (idx > 0 && idx < prev.length) {
                  if (cell && cell.length > 0) {
                    prev[idx] = prev[idx] !== null ? prev[idx] + cell : cell
                  }
                }
              })
            } else {
              data.push(cells)
            }
          }
        }
      })
      if (groupName.length) {
        groups.push({
          group: groupName,
          columns: headers,
          rows: data
        })
      }
    }
  })

  return groups
}
