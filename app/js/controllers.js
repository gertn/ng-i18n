'use strict';

/* Controllers */
function MainCtrl(ngI18nResourceBundle, ngI18nConfig, $scope) {

    $scope.i18n = {};

    $scope.languages = [
        {"locale":"en"},
        {"locale":"nl"},
        {"locale":"en-US"},
        {"locale":"nl-BE"},
        {"locale":"nl-nl"},
        {"locale":"nl-be"},
        {"locale":"de"}
    ];

    $scope.supportedLocales = ngI18nConfig.supportedLocales;
    $scope.defaultLocale = ngI18nConfig.defaultLocale;
    $scope.basePath = ngI18nConfig.basePath;
    $scope.cache = ngI18nConfig.cache;

    $scope.i18n = {language: $scope.languages[0]};

    $scope.$watch('i18n.language', function (language) {
        ngI18nResourceBundle.get({locale: language.locale}).success(function (resourceBundle) {
            $scope.resourceBundle = resourceBundle;
        });
    });

}
MainCtrl.$inject = ['ngI18nResourceBundle', 'ngI18nConfig', '$scope'];

function MyCtrl1() {
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
