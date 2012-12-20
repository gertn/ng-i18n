/**
 * I18n module for AngularJs
 * @version v0.0.1 - 2012-12-20
 * @link http://ng-i18n.github.com
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('ngI18nConfig', []).value('ngI18nConfig', {});

angular.module('ngI18n', ['ngI18nService', 'ngI18nConfig']);

angular.module('ngI18nService', [], function ($provide) {
    $provide.factory('ngI18nResourceBundleLoader', ['$http', 'ngI18nConfig', function ($http, ngI18nConfig) {
         return {};
    }]);
    $provide.factory('ngI18nLocaleContextHolder', ['ngI18nConfig', function (ngI18nConfig) {
        return {};
    }]);
}).value('version', '0.0.1');