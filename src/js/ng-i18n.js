'use strict';

angular.module('ngI18nConfig', []).value('ngI18nConfig', {});
angular.module('ngI18n', ['ngI18nService', 'ngI18nConfig'])
    .value('version', '<%= pkg.version %>');

angular.module('ngI18nService', [], function ($provide) {
    $provide.factory('ngI18nResourceBundleLoader', ['$http', 'ngI18nConfig', function ($http, ngI18nConfig) {
        return {};
    }]);
    $provide.factory('ngI18nWindowNavigator', ['$window', function ($window) {
        return $window.navigator;
    }]);
    $provide.factory('ngI18nLocaleContextHolder', [
        'ngI18nConfig', 'ngI18nWindowNavigator',
        function (ngI18nConfig, ngI18nWindowNavigator) {
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
                return ngI18nWindowNavigator.userLanguage || ngI18nWindowNavigator.language;
            }

            return {
                setLocale:setLocale,
                getLocale:getLocale
            };
        }]);
}).value('name', 'ngI18nService');