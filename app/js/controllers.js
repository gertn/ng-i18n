'use strict';

/* Controllers */
function MainCtrl(ngI18nLocaleContextHolder, ngI18nResourceBundleLoader, $scope) {

    $scope.languages = [
        {locale:"en"},
        {locale:"nl"}
    ];

    $scope.language = $scope.languages[0];

    $scope.$watch('language', function (language) {
        ngI18nLocaleContextHolder.setLocale(language.locale);
        ngI18nResourceBundleLoader.get().success(function (resourceBundle) {
            $scope.resourceBundle = resourceBundle;
        });
    });

}
MyCtrl1.$inject = ['ngI18nLocaleContextHolder', 'ngI18nResourceBundleLoader', '$scope'];

function MyCtrl1() {
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
