/**
 * AGS importer
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 */

import type { AGSGroup, AGSMap } from './utils'
import ags3 from './ags3'
import ags4 from './ags4'

export function getVersion(content: string): number {
  return content.indexOf('**PROJ') > -1 ? 3 : 4
}

export function parse(content: string): AGSGroup[] {
  if (!content || typeof content !== 'string' || !content.length) {
    return []
  }
  const version = content.indexOf('**PROJ') > -1 ? 3 : 4
  return version === 3 ? ags3(content) : ags4(content)
}

export function find(heading: string, groups: AGSGroup[]): AGSGroup | null {
  if (!groups.length) return null
  const i = groups.findIndex(group => group.heading === heading)
  return i > -1 ? groups[i] : null
}

export function map(group: AGSGroup, keys: AGSMap[]): { [key: string]: any } {
  if (!group || !keys.length) return []
  const columns = group.columns || []
  const rows = group.rows || []
  return rows.map(row => {
    const values: { [key: string]: any } = {}
    keys.forEach(key => {
      const i = columns.findIndex(column => column.name === key.header)
      let value: any = i > -1 ? row[i] : null
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
