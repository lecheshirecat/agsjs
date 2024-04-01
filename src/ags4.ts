/**
 * AGS4.x importer
 *
 * @version 4.0.0
 * @author Charlie LEDUC <contact@pixeliste.fr>
 */

import type { AGSGroup, AGSColumn } from "./types";
import { block, testDigit, testIsoDate, nround } from "./utils";

export default function (content?: string | null): AGSGroup[] {
  const groups: AGSGroup[] = [];
  const blocks = block(content);

  for (let i = 0; i < blocks.length; i++) {
    let heading = "";
    const block = blocks[i];
    const headers: AGSColumn[] = [];
    const data: (string | number | null)[][] = [];
    for (let j = 0; j < block.length; j++) {
      const row = block[j];
      if (row.length < 2) {
        continue;
      }

      const firstCell = row[0] ?? "";
      if (firstCell === "GROUP") {
        heading = (row[1] ?? "").trim();
      } else if (firstCell === "HEADING") {
        for (let k = 1; k < row.length; k++) {
          const cell = row[k];
          headers.push({
            name: cell.length ? cell.trim() : "undefined",
            unit: "",
            type: ""
          });
        }
      } else if (firstCell === "UNIT") {
        for (let k = 1; k < row.length; k++) {
          const cell = row[k];
          if (k - 1 < headers.length) {
            headers[k - 1].unit = cell.length ? cell.trim() : "";
          }
        }
      } else if (firstCell === "TYPE") {
        for (let k = 1; k < row.length; k++) {
          const cell = row[k];
          if (k - 1 < headers.length) {
            headers[k - 1].type = cell.length ? cell.trim() : "";
          }
        }
      } else if (firstCell === "DATA") {
        const cells = [];
        for (let k = 1; k < row.length; k++) {
          const cell = row[k];
          const value = cell.length ? cell.trim() : "";
          const header =
            k - 1 < headers.length ? headers[k - 1] : { name: "undefined" };
          const type = header.type ?? "";
          if (type === "DT") {
            cells.push(testIsoDate(value) ? value : null);
          } else if (type === "DMS") {
            cells.push(value.length ? value : null);
          } else if (type.indexOf("DP") > -1 || type.indexOf("SP") > 1) {
            // const dp = Number.parseInt(type.replace(/\D+/g, ''))
            cells.push(
              value.length ? nround(Number.parseFloat(value), 5) : null
            );
          } else if (type === "X" || type === "ID") {
            cells.push(value.length ? value : null);
          } else {
            if (testDigit(value)) {
              cells.push(
                value.length ? nround(Number.parseFloat(value), 5) : null
              );
            } else {
              cells.push(value.length ? value : null);
            }
          }
        }

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
