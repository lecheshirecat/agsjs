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
- *group*, a non-empty string of the group name
- *columns* which contains an array of the group headings and group related informations
- *rows* which contains an array of the formatted data according to the group headings

## License

[MIT License](https://opensource.org/licenses/MIT)
