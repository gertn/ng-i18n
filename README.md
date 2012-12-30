[![Build Status](https://travis-ci.org/gertn/ng-i18n.png)](https://travis-ci.org/gertn/ng-i18n)

#Internationalization module for AngularJS
This is an internationalization module for AngularJS, it allows you to localize your application with resource bundles.
<br>
The file extension of the resource bundles files is '.json'.
<br>
The build and compressed files can be found in the `dist` directory.

## How to use
This example uses two locales, 'en' which is the default and 'nl'.
<br>
For more configuration options take a look at the 'ngI18nConfig' section.

### 1. create your resource bundle files
You need to provide a default resource bundle for the default locale and one for locale 'nl'.
<br>
Put these resource bundles in the 'i18n' directory.

```
i18n/
    resourceBundle.json
    resourceBundle_nl.json
```

example resourceBundle.json (for default locale)
```javascript
{
    "view_1":"First view",
    "view_2":"Second view",
    "language": "Language",
    "text_view_1":"This is the first view, hopefully in English :)",
    "text_view_2":"This is the second view, hopefully in English :)"
}
```

example resourceBundle_nl.json (for locale 'nl')
```javascript
{
    "view_1":"Eerste view",
    "view_2":"Tweede view",
    "language": "Taal",
    "text_view_1":"Dit is de eerste view, hopelijk in het Nederlands :)",
    "text_view_2":"Dit is de tweede view, hopelijk in het Nederlands :)"
}
```

### 2. add script tag after angular.js

```html
<script type="text/javascript" src="angular.js"></script>
<script type="text/javascript" src="ng-i18n.js"></script>
```

### 3. configure the module

```javascript
    var yourApp = angular.module('yourApp',['ngI18n', ... {other includes}]);
    yourApp.value('ngI18nConfig', {
        defaultLocale: 'en',
        supportedLocales: ['en', 'nl']
    });
```

### 4. add language switcher to your html

```html
    <select name="switchLanguage" ng-model="i18n.language" id="switchLanguage" ng-options="l.locale for l in languages">
    </select>
```

### 5. load the resource bundle from your main controller and $watch for changes to the language model

```javascript
   function MainCtrl(ngI18nResourceBundle, $scope) {

       $scope.languages = [
           {locale:"en"},
           {locale:"nl"}
       ];

       $scope.i18n = {language: $scope.languages[0]};

       $scope.$watch('i18n.language', function (language) {
           ngI18nResourceBundle.get({locale: language.locale}).success(function (resourceBundle) {
               $scope.resourceBundle = resourceBundle;
           });
       });
   }
   MainCtrl.$inject = ['ngI18nResourceBundle', '$scope'];
```
### 6. use the resourceBundle variable in your pages

```html
    <p>{{resourceBundle.text_view_1}}</p>
```

If you selected 'en' as language then '{{resourceBundle.text_view_1}}' will be displayed as:  <br>
This is the first view, hopefully in English :)
<br>
If you selected 'nl' as language then  it will be displayed as: <br>
Dit is de eerste view, hopelijk in het Nederlands :)

## ngI18nConfig
You can declare 'ngI18nConfig' in your app as follows:
```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    ... {add your global defaults}
});
```
Global options that can be provided:
*  defaultLocale: specifies the default locale (required and in lowercase)
*  supportedLocales: specifies the supported locales (required and in lowercase)
*  basePath: specifies base path of url (optional)
*  cache: enables caching of the resource bundle (optional)

### 'defaultLocale' (always in lowercase, has no global default and should always be provided!!)
Example config:
```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    //defaultLocale should be in lowercase and is required!!
    defaultLocale: 'en-us'
    ... {add your other global defaults}
});
```
### 'supportedLocales' (always in lowercase, has no global default and should always be provided!!)
Example config:
```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    //supportedLocales is required - all locales should be in lowercase!!
    supportedLocales: ['en-us', 'nl']
    ... {add your other global defaults}
});
```

### 'basePath' (global default is 'i18n')
Example config:
```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    //without leading and trailing slashes, default is i18n
    basePath: 'base/path'
    ... {add your other global defaults}
});
```

### 'cache' (global default is false)
When the cache is enabled, $http stores the response from the server (the resource bundle) in local cache.
<br>
Example config:
```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    //default is false
    cache: true
    ... {add your other global defaults}
});
```

## ngI18nResourceBundle service
It has one method `get(options)`.
<br>
It will load the resource bundle according to the following algorithm:
```
First determine locale
	Locale provided with options?
		Yes => use this locale
		No => use locale form browser ($window.navigator.userLanguage || $window.navigator.language)

Is this locale the default locale?
	Yes => get default resourceBundle e.g. /i18n/resourceBundle.json
	No => is this locale one of the supported locales?
			Yes => get resourceBundle with locale suffix e.g. /i18n/resourceBundle_en-us.json (locale => 'en-us')
			No => is language from locale default locale?
			    Yes => get default resourceBundle e.g. /i18n/resourceBundle.json
				No =>  is language from this locale one of the supported locales?
				    Yes => get resourceBundle with language from locale suffix
				            e.g. /i18n/resourceBundle_en.json (locale => 'en-us')
				    No => fallback to default resourceBundle e.g. /i18n/resourceBundle.json
```

Local options that can be provided:
*  locale: specifies the locale for the resource bundle (optional)
*  name: specifies the name for the resource bundle (optional)

### Examples
The examples use the following configuration:
 ```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    defaultLocale: 'en',
    supportedLocales: ['en', 'nl', 'fr-be'],
    basePath: 'app/i18n',
    cache: true
});
```
Http Server running at http://localhost:8000/

#### example - locale is default locale
```javascript
ngI18nResourceBundle.get({locale: 'en'});
```
=> GET http://localhost:8000/app/i18n/resourceBundle.json

#### example - locale is one of the supported locales
```javascript
ngI18nResourceBundle.get({locale: 'nl'});
```
=> GET http://localhost:8000/app/i18n/resourceBundle_nl.json

#### example - language of locale is one of the supported locales
```javascript
ngI18nResourceBundle.get({locale: 'en-US'});
```
=> GET http://localhost:8000/app/i18n/resourceBundle_en.json

#### example - locale with country is one of the supported locales
```javascript
ngI18nResourceBundle.get({locale: 'fr-BE'});
```
=> GET http://localhost:8000/app/i18n/resourceBundle_fr-be.json (lowercase)

#### example - locale not supported
```javascript
ngI18nResourceBundle.get({locale: 'de'});
```
=> GET http://localhost:8000/app/i18n/resourceBundle.json  (default resourceBundle)

#### example - custom name
```javascript
ngI18nResourceBundle.get({locale: 'en', name: 'customName'});
```
=> GET http://localhost:8000/app/i18n/customName.json

```javascript
ngI18nResourceBundle.get({locale: 'nl', name: 'customName'});
```
=> GET http://localhost:8000/app/i18n/customName_nl.json

#### example - caching
```javascript
//first call
ngI18nResourceBundle.get({locale: 'en'});
//second call
ngI18nResourceBundle.get({locale: 'en'});
```
first call => GET http://localhost:8000/app/i18n/resourceBundle.json
<br>
second call => no call, the resource bundle is retrieved from local cache

## Example app
You can find an example app in the app directory.
<br>
Look at `app.js`, `controller.js`, `index.html` and the two partials in the `partials` directory.

### Running the example app

You can pick one of these options:

* serve this repository with your webserver
* install node.js and run `scripts/web-server.js`

Then navigate your browser to `http://localhost:<port>/app/index.html` to see the example app running in
your browser.

