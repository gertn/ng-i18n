/**
 * I18n module for AngularJs
 * @version v0.2.0 - 2012-12-24
 * @link http://ng-i18n.github.com
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('ngI18nConfig', []).value('ngI18nConfig', {});
angular.module('ngI18n', ['ngI18nService', 'ngI18nConfig'])
    .value('ngI18nVersion', '0.2.0');

angular.module('ngI18nService', [],function ($provide) {
    $provide.factory('ngI18nResourceBundleLoader', ['$http', 'ngI18nConfig', 'ngI18nLocaleContextHolder',
        function ($http, ngI18nConfig, ngI18nLocaleContextHolder) {
            ngI18nConfig.basePath =  ngI18nConfig.basePath || 'i18n';
            function get() {
                var url = '/' + ngI18nConfig.basePath + '/resourceBundle_' + ngI18nLocaleContextHolder.getLocale() + '.json';
                return $http.get(url);
            }
            return { get:get};
        }]);
    $provide.factory('ngI18nLocaleContextHolder', ['ngI18nConfig', '$window',
        function (ngI18nConfig, $window) {
            var getLocale, setLocale, _locale;

            setLocale = function (locale) {
                _locale = locale;
            };

            getLocale = function () {
                if (angular.isUndefined(_locale)) {
                    return getLanguageFromNavigator();
                }
                return _locale;
            };

            function getLanguageFromNavigator() {
                return $window.navigator.userLanguage || $window.navigator.language;
            }

            return {
                setLocale:setLocale,
                getLocale:getLocale
            };
        }]);
}).value('name', 'ngI18nService');
