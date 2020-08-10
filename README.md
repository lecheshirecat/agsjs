# agsjs

A modern and lightweight AGS file editor for JavaScript

## Installation

```javascript
npm install agsjs --save
```

## How to use

Default use as ES6 module

```javascript
import AGS from 'agsjs'

var content = fetch('sample.ags').then(x => x.text()),
var results = AGS.read(content)
```

The results are returned as a JavaScript Object where keys are the group name parsed from the file content. It follows the tree-like structure of the file format.

Every entry of the object has two properties:
- *columns* which contains the group headings and group related informations
- *rows* which contains the formatted data according to the group headings

## License

[MIT License](https://opensource.org/licenses/MIT)
