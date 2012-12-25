[![Build Status](https://travis-ci.org/gertn/ng-i18n.png)](https://travis-ci.org/gertn/ng-i18n)

#Internationalization module for AngularJS
## How to use

```html
<script type="text/javascript" src="angular.js"></script>
<script type="text/javascript" src="ng-i18n.js"></script>
<script>
    angular.module('yourApp',['ngI18n', ... {other includes}]);
</script>
```

The source files can be found in the `src/js` directory.

There is a global config and one service:
* ngI18nConfig
* ngI18nResourceBundle

### ngI18nConfig
You can declare 'ngI18nConfig' in your app as follows:
```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    ... {add your global defaults}
});
```
Global options that can be provided:
*  defaultLocale: specifies the default locale (required)
*  supportedLocales: specifies the supported locales (required)
*  basePath: specifies base path of url (optional)

#### defaultLocale has no global default and should always be provided!!
Example config:
```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    //defaultLocale should always be provided!!
    defaultLocale: 'en'
    ... {add your other global defaults}
});
```
#### supportedLocales has no global default and should always be provided!!
Example config:
```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    //supportedLocales should always be provided!!
    supportedLocales: ['en', 'nl']
    ... {add your other global defaults}
});
```

#### basePath (global default is 'i18n')
Example config:
```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    //without leading and trailing slashes (global default is i18n)
    basePath: 'base/path'
    ... {add your other global defaults}
});
```
See also example app file `app.js`.

### ngI18nResourceBundle
It has one method `get`.
It will load the resource bundle according to the following algorithm:
```
First determine locale
	Locale provided with options?
		Yes => use this locale
		No => use locale form browser (`$window.navigator.userLanguage || $window.navigator.language`)

Is this locale the default locale?
	Yes => get default resourceBundle e.g. /i18n/resourceBundle.json
	No => is this locale one of the supported locales?
			Yes => get resourceBundle with locale suffix e.g. /i18n/resourceBundle_en.json (locale => 'en')
			No => is language from this locale supported?
				Yes => get resourceBundle with locale suffix e.g. /i18n/resourceBundle_en.json (locale => 'en-US')
				No => fallback ot default resourceBundle e.g. /i18n/resourceBundle.json
```
#### examples
Config:
 ```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    defaultLocale: 'en',
    supportedLocales: ['en', 'nl', 'fr-BE']
});
```
##### example - locale is default locale
```javascript
ngI18nResourceBundle.get({locale: 'en'});
```
=> GET http://localhost:8000/app/i18n/resourceBundle.json

##### example - locale is one of the supported locales
```javascript
ngI18nResourceBundle.get({locale: 'nl'});
```
=> GET http://localhost:8000/app/i18n/resourceBundle_nl.json

##### example - language of locale is one of the supported locales
```javascript
ngI18nResourceBundle.get({locale: 'en-US'});
```
=> GET http://localhost:8000/app/i18n/resourceBundle_en.json

##### example - locale with country is one of the supported locales
```javascript
ngI18nResourceBundle.get({locale: 'fr-BE'});
```
=> GET http://localhost:8000/app/i18n/resourceBundle_fr-BE.json

##### example - locale not supported
```javascript
ngI18nResourceBundle.get({locale: 'de'});
```
=> GET http://localhost:8000/app/i18n/resourceBundle.json  (default resourceBundle)

## Example app
You can find an example app in the app directory.

Look at `controller.js`, `index.html` and the two partials in the `partials` directory.

### Running the example app

You can pick one of these options:

* serve this repository with your webserver
* install node.js and run `scripts/web-server.js`

Then navigate your browser to `http://localhost:<port>/app/index.html` to see the app running in
your browser.
 
## Roadmap
Make the module more configurable:
* with ngI18nConfig
* the get method should accept parameter object
* fallback to default resourceBundle
