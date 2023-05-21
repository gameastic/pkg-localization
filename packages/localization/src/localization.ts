import { type IInterpolationOptions, type ILocalizationOptions } from './types';

class LocalizationInstance {
    private readonly _interpolationRegexp = /{{(.*?)}}/g;

    private _translation!: Record<string, string>;
    private _options!: ILocalizationOptions;
    private _language!: string;

    public get language(): string {
        return this._language;
    }

    public async init(options: ILocalizationOptions): Promise<void> {
        this._options = options;
        await this._prepareFallback();
    }

    public async setLanguage(lng: string): Promise<void> {
        const { path, supported, mapping } = this._options;

        /* supported */
        if (supported.includes(lng)) {
            const language = lng;
            let translation: Record<string, string>;

            switch (typeof path) {
                case 'string':
                    {
                        const jsonPath = `${path}/${language}.json`;
                        const response = await fetch(jsonPath, { method: 'get' });
                        translation = await response.json();
                    }
                    break;
                default:
                    translation = path[language];
                    break;
            }

            this._language = language;
            this._translation = Object.assign({}, translation);

            return;
        }

        /* mapped */
        const key = Object.keys(mapping).find((key) => mapping[key].includes(lng));
        await this.setLanguage(key ?? this._language);
    }

    public get(key: string, interpolationOptions?: IInterpolationOptions): string {
        const phrase = this._translation[key];

        const res =
            phrase == null
                ? key
                : interpolationOptions == null
                ? phrase
                : this._interpolate(phrase, interpolationOptions);

        return res;
    }

    private async _prepareFallback(): Promise<void> {
        const { supported, fallback } = this._options;

        if (!supported.includes(fallback)) {
            throw new Error(`Unsupported fallback language => "${fallback}"`);
        }

        await this.setLanguage(fallback);
    }

    private _interpolate(phrase: string, interpolationOptions: IInterpolationOptions): string {
        const matchArr = Array.from(phrase.matchAll(this._interpolationRegexp));

        for (let i = 0; i < matchArr.length; i++) {
            const match = matchArr[i];

            const replaceValue = interpolationOptions[match[1]];
            if (replaceValue == null) {
                continue;
            }

            // phrase is immutable, assignment above doesn't mutate translation[phrase] value
            phrase = phrase.replace(match[0], replaceValue.toString());
        }

        return phrase;
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Localization = new LocalizationInstance();
