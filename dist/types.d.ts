interface AGSColumn {
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
export function getVersion(content: string): number;
export function parse(content: string): AGSGroup[];
export function find(heading: string, groups: AGSGroup[]): AGSGroup | null;
export function map(group: AGSGroup, keys: AGSMap[]): {
    [key: string]: any;
}[];

//# sourceMappingURL=types.d.ts.map
