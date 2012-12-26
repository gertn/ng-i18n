'use strict';

/* Controllers */
function MainCtrl(ngI18nResourceBundle, ngI18nConfig, $scope) {

    $scope.languages = [
        {locale:"en"},
        {locale:"nl"},
        {locale:"en-US"},
        {locale:"nl-BE"},
        {locale:"nl-nl"},
        {locale:"nl-be"}
    ];

    $scope.supportedLocales = ngI18nConfig.supportedLocales;
    $scope.defaultLocale = ngI18nConfig.defaultLocale;

    $scope.language = $scope.languages[0];

    $scope.$watch('language', function (language) {
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
