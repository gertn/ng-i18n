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

There are two services and a global config:
* ngI18nLocaleContextHolder
* ngI18nResourceBundleLoader
* ngI18nConfig

### ngI18nLocaleContextHolder
Holds the locale that ngI18nResourceBundleLoader uses to load the bundle.

If the locale is not set, it will use the locale from the browser according to the following rule:
```javascript
$window.navigator.userLanguage || $window.navigator.language;
```
### ngI18nResourceBundleLoader
It has one method `get`.
It will load the resource bundle with the following url:
```javascript
var url = '/i18n/resourceBundle_' + ngI18nLocaleContextHolder.getLocale() + '.json';
```

### ngI18nConfig
You can declare global config in your app and override global defaults:
```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    ... {add your global defaults}
});
```
Global defaults that can be overridden:
*  basePath: specifies base path of url

#### global default for basePath is 'i18n'
You can override this:
```javascript
var yourApp = angular.module('yourApp', ['ngI18n']);
yourApp.value('ngI18nConfig', {
    //without leading and trailing slashes
    basePath: "base/path"
    ... {add your other global defaults}
});
```
See also example app file `app.js`.

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
