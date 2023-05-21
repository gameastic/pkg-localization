import { Localization, type ILocalizationOptions } from '@gameastic/localization';
(async () => {
    const config: ILocalizationOptions = {
        path: './locales/',
        fallback: 'en',
        supported: ['en', 'ru'],
        mapping: { ru: ['hy', 'ge'] },
    };

    await Localization.init(config);

    await Localization.setLanguage('en');
    console.info(`${Localization.language} => ${Localization.get('hello')}`);

    await Localization.setLanguage('ru');
    console.info(`${Localization.language} => ${Localization.get('hello')}`);
})();
