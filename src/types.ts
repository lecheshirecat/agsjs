/**
 * Types
 *
 * @version 4.0.0
 * @author Charlie LEDUC <contact@pixeliste.fr>
 */

export interface AGSColumn {
  name: string;
  unit?: string;
  type?: string;
}

export interface AGSGroup {
  heading: string;
  columns: AGSColumn[];
  rows: (string | number | null)[][];
}

export interface AGSMap {
  header: string;
  name: string;
  required?: boolean;
  format?: string;
  default?: any;
}
