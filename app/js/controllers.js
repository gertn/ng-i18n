'use strict';

/* Controllers */
function MainCtrl(ngI18nResourceBundle, $scope) {

    $scope.languages = [
        {locale:"en"},
        {locale:"nl"}
    ];

    $scope.language = $scope.languages[0];

    $scope.$watch('language', function (language) {
        ngI18nResourceBundle.get({locale: language.locale}).success(function (resourceBundle) {
            $scope.resourceBundle = resourceBundle;
        });
    });

}
MainCtrl.$inject = ['ngI18nResourceBundle', '$scope'];

function MyCtrl1() {
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
