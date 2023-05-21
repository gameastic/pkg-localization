import { Localization, type ILocalizationOptions } from '@gameastic/localization';
(async () => {
    const config: ILocalizationOptions = {
        path: './assets/',
        fallback: 'en',
        supported: ['en', 'ru'],
        mapping: { ru: ['hy', 'ge'] },
    };

    await Localization.init(config);
    await Localization.setLanguage('ru');

    console.warn(Localization.get('hello'));
})();
