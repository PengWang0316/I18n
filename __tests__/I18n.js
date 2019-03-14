import I18n from '../src/I18n';

// window.navigator.language = 'en-US';
console.info = jest.fn();

describe('I18n', () => {
  let languageGetter;
  // let userLanguageGetter;

  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'language', 'get');
    // userLanguageGetter = jest.spyOn(window.navigator, 'userLanguage', 'get');
    languageGetter.mockReturnValue('en-US');
    languageGetter.mockClear();
    window.navigator.userLanguage = 'zh';
    console.info.mockClear();
  });

  test('No dict and no language set', () => {
    I18n.language = null;
    const result = I18n.get('key');
    expect(result).toBe('key');
    expect(I18n.language).toBe('en-US');
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenLastCalledWith('The dictionary has not been set up. Please define a dictionary and call I18n.setDictionary(dictionary)');
  });

  test('No dict and no language set use userLanguage', () => {
    I18n.language = null;
    languageGetter.mockReturnValueOnce(null);
    const result = I18n.get('key');
    expect(result).toBe('key');
    expect(I18n.language).toBe('zh');
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenLastCalledWith('The dictionary has not been set up. Please define a dictionary and call I18n.setDictionary(dictionary)');
  });

  test('Has dict and language set but not language in the dictionary', () => {
    const dict = {};
    I18n.setDictionary(dict);
    I18n.setLanguage('en');
    const result = I18n.get('key');
    expect(languageGetter).not.toBeCalled();
    expect(result).toBe('key');
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenLastCalledWith(`The language ${I18n.language} is not found in the dictionary.`);
  });

  test('Not language in the dictionary, has default language', () => {
    const dict = {};
    I18n.setDictionary(dict);
    I18n.setLanguage('en');
    I18n.setDefaultLanguage('zh');
    const result = I18n.get('key');
    expect(languageGetter).not.toBeCalled();
    expect(result).toBe('key');
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenNthCalledWith(1, `The language ${I18n.language} is not found in the dictionary.`);
  });

  test('Not language in the dictionary, has default language and match', () => {
    const dict = {
      zh: {},
    };
    I18n.setDictionary(dict);
    I18n.setLanguage('en');
    I18n.setDefaultLanguage('zh');
    const result = I18n.get('key');
    expect(languageGetter).not.toBeCalled();
    expect(result).toBe('key');
    expect(console.info).toHaveBeenCalledTimes(3);
    expect(console.info).toHaveBeenNthCalledWith(1, 'The language en is not found in the dictionary.');
    expect(console.info).toHaveBeenNthCalledWith(2, `The default language ${I18n.defaultLanguage} will be showed.`);
    expect(console.info).toHaveBeenNthCalledWith(3, 'The key key is not found in the dictionary.');
    expect(I18n.language).toBe('zh');
  });

  test('Has default language and match', () => {
    const dict = {
      zh: {
        key: 'value',
      },
    };
    I18n.setDictionary(dict);
    I18n.setLanguage('en');
    I18n.setDefaultLanguage('zh');
    const result = I18n.get('key');
    expect(languageGetter).not.toBeCalled();
    expect(result).toBe(dict.zh.key);
    expect(console.info).toHaveBeenCalledTimes(2);
    expect(console.info).toHaveBeenNthCalledWith(1, 'The language en is not found in the dictionary.');
    expect(console.info).toHaveBeenNthCalledWith(2, `The default language ${I18n.defaultLanguage} will be showed.`);
    expect(I18n.language).toBe('zh');
  });

  test('Normal call flow', () => {
    const dict = {
      en: {
        key: 'value',
      },
      zh: {
        key: 'zh value',
      },
    };
    I18n.setDictionary(dict);
    I18n.setLanguage('en');
    I18n.setDefaultLanguage('zh');
    const result = I18n.get('key');
    expect(languageGetter).not.toBeCalled();
    expect(result).toBe(dict.en.key);
    expect(console.info).not.toHaveBeenCalled();
    expect(I18n.language).toBe('en');
    expect(I18n.defaultLanguage).toBe('zh');
  });
});
