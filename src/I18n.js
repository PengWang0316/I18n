export default class I18n {
  static dict;

  static language;

  static defaultLanguage;

  static setDictionary(dict) {
    I18n.dict = dict;
  }

  static setLanguage(language) {
    I18n.language = language;
  }

  static setDefaultLanguage(defaultLanguage) {
    I18n.defaultLanguage = defaultLanguage;
  }

  static get(key) {
    // Get users' default language if it has not been set.
    if (!I18n.language) I18n.language = navigator.language || navigator.userLanguage;
    if (!I18n.dict) {
      console.info('The dictionary has not been set up. Please define a dictionary and call I18n.setDictionary(dictionary)');
      return key;
    }
    if (!I18n.dict[I18n.language]) {
      console.info(`The language ${I18n.language} is not found in the dictionary.`);
      if (I18n.defaultLanguage && I18n.dict[I18n.defaultLanguage]) {
        I18n.language = I18n.defaultLanguage;
        console.info(`The default language ${I18n.defaultLanguage} will be showed.`);
      } else return key;
    }
    if (!I18n.dict[I18n.language][key]) console.info(`The key ${key} is not found in the dictionary.`);
    else return I18n.dict[I18n.language][key];
    return key;
  }
}
