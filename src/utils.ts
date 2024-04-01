/**
 * Utils
 *
 * @version 4.0.0
 * @author Charlie LEDUC <contact@pixeliste.fr>
 */

export function testIsoDate(value: string): boolean {
  return /\d{4}-\d{2}-\d{2}/g.test(value);
}

export function testDigit(value: string): boolean {
  return /^[\d.,]+$/g.test(value);
}

export function testNonDigit(value: string): boolean {
  return /[a-zA-Z\/-]+/g.test(value);
}

export function nround(value: number | null, decimal: number | null): number {
  const r = Math.pow(10, decimal ?? 1);
  let v = value ?? 0;
  if (isNaN(v) || !isFinite(v)) {
    v = 0;
  }
  return Math.round(v * r) / r;
}

export function block(content?: string | null): string[][][] {
  const blocks: string[][][] = [];
  if (!content || typeof content !== "string") return blocks;
  const groups = content.split(/(\r\n|\n\r|\n){2,}/gm);
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i].trim();
    if (!group.length) {
      continue;
    }
    const rows = group
      .split(/\n/gm)
      .map((row) =>
        row.split(/",/g).map((cell) => cell.trim().replace(/^(")|(")$/g, ""))
      );
    blocks.push(rows);
  }
  return blocks;
}
