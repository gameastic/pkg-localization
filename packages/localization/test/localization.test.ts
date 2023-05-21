import { Localization, type ILocalizationOptions } from '../src';

const config: ILocalizationOptions = {
    path: { en: { hello: 'Hello' }, ru: { hello: 'Привет' } },
    fallback: 'en',
    supported: ['en', 'ru'],
    mapping: { ru: ['hy', 'ge'] },
};

test('localization language', async () => {
    await Localization.init(config);
    await Localization.setLanguage('ru');

    expect(Localization.get('hello')).toEqual('Привет');
});

test('localization fallback', async () => {
    await Localization.init(config);
    await Localization.setLanguage('fr');

    expect(Localization.get('hello')).toEqual('Hello');
});

test('localization mapping', async () => {
    await Localization.init(config);
    await Localization.setLanguage('hy');

    expect(Localization.get('hello')).toEqual('Привет');
});
