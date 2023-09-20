"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.block = exports.round = exports.testNonDigit = exports.testDigit = exports.testIsoDate = void 0;
function testIsoDate(value) {
    return /\d{4}-\d{2}-\d{2}/g.test(value);
}
exports.testIsoDate = testIsoDate;
function testDigit(value) {
    return /^[\d.,]+$/g.test(value);
}
exports.testDigit = testDigit;
function testNonDigit(value) {
    return /[a-zA-Z\/-]+/g.test(value);
}
exports.testNonDigit = testNonDigit;
function round(value, decimal) {
    const r = Math.pow(10, decimal !== null && decimal !== void 0 ? decimal : 1);
    let v = value !== null && value !== void 0 ? value : 0;
    if (isNaN(v) || !isFinite(v)) {
        v = 0;
    }
    return Math.round(v * r) / r;
}
exports.round = round;
function block(content) {
    const blocks = [];
    if (!content || typeof content !== "string")
        return blocks;
    const groups = content.split(/(\r\n|\n\r|\n){2,}/gm);
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i].trim();
        if (!group.length) {
            continue;
        }
        const rows = group
            .split(/\n/gm)
            .map((row) => row.split(/",/g).map((cell) => cell.trim().replace(/^(")|(")$/g, "")));
        blocks.push(rows);
    }
    return blocks;
}
exports.block = block;
