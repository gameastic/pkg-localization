export interface ILocalizationOptions {
    path: string | Record<string, Record<string, string>>;
    fallback: string | 'empty';
    supported: string[];
    mapping: Record<string, string[]>;
}

export interface IInterpolationOptions extends Record<string, string | number> {}
