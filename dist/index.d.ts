import type { AGSGroup, AGSMap } from './utils';
export declare function getVersion(content: string): number;
export declare function parse(content: string): AGSGroup[];
export declare function find(heading: string, groups: AGSGroup[]): AGSGroup | null;
export declare function map(group: AGSGroup, keys: AGSMap[]): {
    [key: string]: any;
};
