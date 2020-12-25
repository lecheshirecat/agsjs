/**
 * AGS importer
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 */

import { AGSGroup, AGSMap } from './utils'
import ags3 from './ags3'
import ags4 from './ags4'

export default {
  parse(content: string): AGSGroup[] {
    if (!content || typeof content !== 'string' || !content.length) {
      return []
    }
    var version = content.indexOf('**PROJ') > -1 ? 3 : 4
    return version === 3 ? ags3(content) : ags4(content)
  },

  version(content: string): number {
    return content.indexOf('**PROJ') > -1 ? 3 : 4
  },

  find(heading: string, groups: AGSGroup[]): AGSGroup | null {
    if (!groups.length) return null
    var i = groups.findIndex(group => group.heading === heading)
    return i > -1 ? groups[i] : null
  },

  map(group: AGSGroup, keys: AGSMap[]): {[key: string]: any} {
    if (!group || !keys.length) return []
    var columns = group.columns || []
    var rows = group.rows || []
    return rows.map(row => {
      var values: {[key: string]: any} = {}
      keys.forEach(key => {
        var i = columns.findIndex(column => column.name === key.header)
        var value: any = i > -1 ? row[i] : null
        if (key.required) {
          values[key.name] = value !== null ? value : (key.default || null)
        } else {
          values[key.name] = value
        }
        if (key.format === 'percent') {
          value = Number.parseFloat(value)
          values[key.name] = isNaN(value) ? value : value / 100
        }
      })
      return values
    })
  }
}
