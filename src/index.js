/**
 * AGS importer
 *
 * @version 1.0.0
 * @author Charlie LEDUC <contact@graphique.io>
 */

import ags3 from 'src/ags3'
import ags4 from 'src/ags4'

export default {
  read: function(content) {
    if (!content || typeof content !== 'string' || !content.length) {
      return {}
    }
    var version = content.indexOf('**PROJ') > -1 ? 3 : 4
    return version === 3 ? ags3(content) : ags4(content)
  }
}
