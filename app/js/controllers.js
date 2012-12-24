'use strict';

/* Controllers */
function MainCtrl(ngI18nLocaleContextHolder, ngI18nResourceBundleLoader, $rootScope) {


    $rootScope.languages = [ {locale: "en"}, {locale: "nl"}];

    var defaultLanguage =  $rootScope.languages[0];

    $rootScope.language = defaultLanguage;

    ngI18nLocaleContextHolder.setLocale(defaultLanguage.locale);

    function getResourceBundle() {
        ngI18nResourceBundleLoader.get().success(function (resourceBundle) {
            $rootScope.resourceBundle = resourceBundle;
        });
    }

    getResourceBundle();

    $rootScope.switchLanguage = function(language) {
        ngI18nLocaleContextHolder.setLocale(language.locale);
        getResourceBundle();
    };
}
MyCtrl1.$inject = ['ngI18nLocaleContextHolder', 'ngI18nResourceBundleLoader', '$rootScope'];

function MyCtrl1() {
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
