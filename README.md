# agsjs

A modern and lightweight AGS file parser for JavaScript

## Installation

```javascript
npm install agsjs --save
```

## How to use

Default use as ES6 module

```javascript
import AGS from 'agsjs'

var content = fetch('sample.ags').then(x => x.text()),
var results = AGS.parse(content)
```

The results are returned as a JavaScript Array parsed from the file content. It follows the tree-like structure of the file format.

Every entry of the array has three properties:
- *heading*, a non-empty string of the group name
- *columns* which contains an array of the group headings and group related informations
- *rows* which contains an array of the formatted data according to the group headings

## Convenience functions

### find
Returns a JavaScript object or null if heading is not found
```javascript
import AGS from 'agsjs'

var groups = AGS.parse(content)
var projGroup = AGS.find('PROJ', groups)
console.log(projGroup)
// { "heading": "PROJ", columns: [...], rows: [...] } OR null
```

### map
Returns an array
Match group headings and rows to a custom JavaScript object with named keys as parameters
```javascript
import AGS from 'agsjs'

var groups = AGS.parse(content)
var projGroup = AGS.find('PROJ', groups)
const keys = [{
  name: 'reference',
  header: 'PROJ_ID'
}, {
  name: 'name',
  header: 'PROJ_NAME',
  required: true,
  default: ''
}, {
  name: 'location',
  header: 'PROJ_LOC'
}, {
  name: 'client',
  header: 'PROJ_CLNT'
}]
const dataset = AGS.map(projGroup, keys)
```

## License

[MIT License](https://opensource.org/licenses/MIT)
