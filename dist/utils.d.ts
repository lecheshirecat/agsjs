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
export declare function testIsoDate(value: string): boolean;
export declare function testDigit(value: string): boolean;
export declare function testNonDigit(value: string): boolean;
export declare function round(value: number | null, decimal: number | null): number;
export declare function block(content?: string | null): string[][][];
