"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function default_1(content) {
    var _a, _b, _c, _d;
    const groups = [];
    const blocks = (0, utils_1.block)(content);
    for (let i = 0; i < blocks.length; i++) {
        let heading = "";
        const block = blocks[i];
        const headers = [];
        const data = [];
        for (let j = 0; j < block.length; j++) {
            const row = block[j];
            if (row.length < 1) {
                continue;
            }
            const firstCell = (_a = row[0]) !== null && _a !== void 0 ? _a : "";
            if (firstCell.indexOf("**") > -1) {
                heading = firstCell.replace(/[?*]/g, "").trim();
            }
            else if (firstCell.charAt(0) === "*") {
                for (let k = 0; k < row.length; k++) {
                    const cell = row[k];
                    headers.push({
                        name: cell.length ? cell.replace(/[?*]/g, "").trim() : "undefined",
                        unit: "",
                        type: ""
                    });
                }
            }
            else if (firstCell === "<UNITS>") {
                for (let k = 0; k < row.length; k++) {
                    const cell = row[k];
                    if (k < headers.length) {
                        headers[k].unit = cell.length ? cell.trim() : "";
                    }
                }
            }
            else {
                const cont = firstCell === "<CONT>" && data.length > 0;
                const cells = [];
                for (let k = 0; k < row.length; k++) {
                    const cell = row[k];
                    const value = cell && cell.length ? cell : "";
                    const header = k < headers.length ? headers[k] : { name: "undefined" };
                    const unit = (_b = header.unit) !== null && _b !== void 0 ? _b : "";
                    if (unit === "dd/mm/yyyy") {
                        const parts = value.split("/");
                        cells.push(parts.length === 3
                            ? `${parts[2].trim()}-${parts[1].trim()}-${parts[0].trim()}`
                            : null);
                    }
                    else if (unit === "yyyy-mm-dd") {
                        const parts = value.split("-");
                        cells.push(parts.length === 3
                            ? `${parts[0].trim()}-${parts[1].trim()}-${parts[2].trim()}`
                            : null);
                    }
                    else if (!value.length) {
                        cells.push(null);
                    }
                    else if ((0, utils_1.testDigit)(value)) {
                        cells.push((0, utils_1.round)(parseFloat(value.trim()), 5));
                    }
                    else {
                        cells.push(value);
                    }
                }
                if (cont) {
                    const prev = data[data.length - 1];
                    for (let k = 1; k < cells.length; k++) {
                        const cell = (_c = cells[k]) !== null && _c !== void 0 ? _c : "";
                        if (cell !== null) {
                            if (k < prev.length) {
                                prev[k] = `${(_d = prev[k]) !== null && _d !== void 0 ? _d : ""}${cell}`;
                            }
                        }
                    }
                }
                else {
                    if (headers.length < cells.length) {
                        while (headers.length < cells.length) {
                            headers.push({
                                name: `${heading}_${headers.length}`,
                                unit: "",
                                type: ""
                            });
                        }
                    }
                    if (cells.length < headers.length) {
                        while (cells.length < headers.length) {
                            cells.push(null);
                        }
                    }
                    data.push(cells);
                }
            }
        }
        if (heading.length) {
            groups.push({
                heading: heading,
                columns: headers,
                rows: data
            });
        }
    }
    return groups;
}
exports.default = default_1;
