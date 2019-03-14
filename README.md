# I18n

A very lightweight solution for Internationalization.

[![Build Status](https://travis-ci.org/PengWang0316/I18n.svg?branch=master)](https://travis-ci.org/PengWang0316/I18n)
[![Coverage Status](https://coveralls.io/repos/github/PengWang0316/I18n/badge.svg?branch=master)](https://coveralls.io/github/PengWang0316/I18n?branch=master)

# Installing

```
npm install --save @kevinwang0316/i18n
```

# Usage

In your entry file or component (if you are using React or Angular)
```javascript
import I18n from '@kevinwang0316/i18n';

// Define your dictionary for every language you want to support.
const dictionary = {
  'en-US': { // Set the dictionary for the U.S. users
    login: 'login',
    confirm: 'confirm',
  },
  'es': { // Set the dictionary for Spanish users
    login: 'iniciar sesión',
    confirm: 'confirmar',
  },
  'zh-CN': { // Set the dictionary for Simplified Chinese users
    login: '登录',
    confirm: '确认',
  }
};

// Set the dictionary to the I18n
I18n.setDictionary(dictionary);

// Optionally you can set up a default language. If the user browser language is not found in the dictionary, this default language will be showed
I18n.setDefaultLanguage('en-US');

```

In the component where you want to show the text. (This example is a React component.)
```javascript
import I18n from '@kevinwang0316/i18n';

const YourComponent = () => <button>{I18n.get('login')}</button>;
```

# License

Log is licensed under MIT License - see the [License file](https://github.com/PengWang0316/I18n/blob/master/LICENSE).
