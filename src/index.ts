/**
 * AGS importer
 *
 * @version 4.0.0
 * @author Charlie LEDUC <contact@pixeliste.fr>
 */

"use strict";
import type { AGSGroup, AGSMap } from "./types";
import ags3 from "./ags3";
import ags4 from "./ags4";

export type { AGSGroup, AGSMap };

export function getVersion(content: string): number {
  return content.indexOf("**PROJ") > -1 ? 3 : 4;
}

export function parse(content: string): AGSGroup[] {
  const version = content.indexOf("**PROJ") > -1 ? 3 : 4;
  return version === 3 ? ags3(content) : ags4(content);
}

export function find(heading: string, groups: AGSGroup[]): AGSGroup | null {
  if (!groups.length) return null;
  const i = groups.findIndex((group) => group.heading === heading);
  return i > -1 ? groups[i] : null;
}

export function map(group: AGSGroup, keys: AGSMap[]): { [key: string]: any }[] {
  return group.rows.map((row) => {
    const values: { [key: string]: any } = {};
    keys.forEach((key) => {
      const i = group.columns.findIndex((column) => column.name === key.header);
      let value: any = i > -1 ? row[i] : null;
      if (key.format === "percent") {
        value = Number.parseFloat(value);
        values[key.name] = Number.isFinite(value) ? value / 100 : null;
      } else {
        values[key.name] = value !== null ? value : key.default ?? null;
      }
    });
    return values;
  });
}
