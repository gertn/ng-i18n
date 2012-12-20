angular.module('ngI18nConfig', []).value('ngI18nConfig', {});

angular.module('ngI18n', ['ngI18nService', 'ngI18nConfig']);

angular.module('ngI18nService', [], function ($provide) {
    $provide.factory('ngI18nResourceBundleLoader', ['$http', 'ngI18nConfig', function ($http, ngI18nConfig) {
         return {};
    }]);
    $provide.factory('ngI18nLocaleContextHolder', ['ngI18nConfig', function (ngI18nConfig) {
        return {};
    }]);
}).value('version', '<%= pkg.version %>');