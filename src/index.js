/**
 * AGS importer
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 */

import ags3 from './ags3'
import ags4 from './ags4'

export default {
  parse(content) {
    if (!content || typeof content !== 'string' || !content.length) {
      return []
    }
    var version = content.indexOf('**PROJ') > -1 ? 3 : 4
    return version === 3 ? ags3(content) : ags4(content)
  },
  version(content) {
    return content.indexOf('**PROJ') > -1 ? 3 : 4
  },
  find(heading, groups) {
    if (!groups.length) return null
    var i = groups.findIndex(group => group.heading === heading)
    return i > -1 ? groups[i] : null
  },
  map(group, keys) {
    if (!group || !keys.length) return []
    var columns = group.columns || []
    var rows = group.rows || []
    return rows.map(row => {
      var values = {}
      keys.forEach(key => {
        var i = columns.findIndex(column => column.name === key.header)
        var value = i > -1 ? row[i] : null
        if (key.required) {
          values[key.name] = value !== null ? value : (key.default || null)
        } else {
          values[key.name] = value
        }
        if (key.format === 'percent') {
          values[key.name] = isNaN(value) ? value : value / 100
        }
      })
      return values
    })
  }
}
