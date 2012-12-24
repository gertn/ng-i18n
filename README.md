[![Build Status](https://travis-ci.org/gertn/ng-i18n.png)](https://travis-ci.org/gertn/ng-i18n)

#Internationalization module for AngularJS
## How to use

```html
<script type="text/javascript" src="angular.js"></script>
<script type="text/javascript" src="ng-i18n.js"></script>
<script>
    angular.module('myApp',['ngI18n', ... {other includes}]);
</script>
```

The source files can be found in the `src/js` directory.

There are two services:
* ngI18nResourceBundleLoader
* ngI18nLocaleContextHolder

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

## Example app
You can find an example app in the app directory.

Look at `controller.js`, `index.html` and the two partials in the `partials` directory.

### Running the example app

You can pick one of these options:

* serve this repository with your webserver
* install node.js and run `scripts/web-server.js`

Then navigate your browser to `http://localhost:<port>/app/index.html` to see the app running in
your browser.
 

