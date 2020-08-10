/**
 * AGS importer
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 */

import ags3 from './ags3'
import ags4 from './ags4'

export default {
  parse: function(content) {
    if (!content || typeof content !== 'string' || !content.length) {
      return []
    }
    var version = content.indexOf('**PROJ') > -1 ? 3 : 4
    return version === 3 ? ags3(content) : ags4(content)
  },
  version: function(content) {
    return content.indexOf('**PROJ') > -1 ? 3 : 4
  }
}
