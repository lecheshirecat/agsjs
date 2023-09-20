"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = exports.find = exports.parse = exports.getVersion = void 0;
const ags3_1 = require("./ags3");
const ags4_1 = require("./ags4");
function getVersion(content) {
    return content.indexOf("**PROJ") > -1 ? 3 : 4;
}
exports.getVersion = getVersion;
function parse(content) {
    const version = content.indexOf("**PROJ") > -1 ? 3 : 4;
    return version === 3 ? (0, ags3_1.default)(content) : (0, ags4_1.default)(content);
}
exports.parse = parse;
function find(heading, groups) {
    if (!groups.length)
        return null;
    const i = groups.findIndex((group) => group.heading === heading);
    return i > -1 ? groups[i] : null;
}
exports.find = find;
function map(group, keys) {
    return group.rows.map((row) => {
        const values = {};
        keys.forEach((key) => {
            var _a;
            const i = group.columns.findIndex((column) => column.name === key.header);
            let value = i > -1 ? row[i] : null;
            if (key.format === "percent") {
                value = Number.parseFloat(value);
                values[key.name] = Number.isFinite(value) ? value / 100 : null;
            }
            else {
                values[key.name] = value !== null ? value : (_a = key.default) !== null && _a !== void 0 ? _a : null;
            }
        });
        return values;
    });
}
exports.map = map;
