export interface ILocalizationOptions {
    path: string | Record<string, Record<string, string>>;
    fallback: string | 'empty';
    supported: string[];
    mapping: Record<string, string[]>;
}

export type IInterpolationOptions = Record<string, string | number>;
