'use strict';

describe('ngI18nService', function () {
    var DEFAULT_LOCALE, DEFAULT_LANGUAGE, DEFAULT_USER_LANGUAGE, LOCALE_WITH_COUNTRY;
    beforeEach(function () {
        module('ngI18nConfig');
        module('ngI18nService');
        DEFAULT_LOCALE = 'nl';
        DEFAULT_LANGUAGE = 'fr';
        DEFAULT_USER_LANGUAGE = 'en';
        LOCALE_WITH_COUNTRY = "nl-be";
    });

    describe('ngI18nResourceBundleLoader', function () {
        var $httpBackend, ngI18nResourceBundleLoader, ngI18nLocaleContextHolder, resourceBundle_nl;

        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            ngI18nResourceBundleLoader = $injector.get('ngI18nResourceBundleLoader');
            ngI18nLocaleContextHolder = $injector.get('ngI18nLocaleContextHolder');
            resourceBundle_nl =   {"key1" : 'waarde1', "key2": 'waarde2'};
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should be able to get resourceBundle for locale from localeContextHolder", function(){
            var resourceBundle;
            ngI18nLocaleContextHolder.setLocale(DEFAULT_LOCALE);
            $httpBackend.when('GET', '/i18n/resourceBundle_nl.json').respond(resourceBundle_nl);

            ngI18nResourceBundleLoader.get().success(function(data) {
                resourceBundle = data;
            });

            $httpBackend.flush();

            //noinspection JSUnusedAssignment
            expect(resourceBundle).toEqual(resourceBundle_nl);

        });
    });

    describe('ngI18nLocaleContextHolder', function () {
        var ngI18nLocaleContextHolder, windowStub;

        beforeEach(function () {
            module(function ($provide) {
                windowStub = {
                    navigator:{
                        language:DEFAULT_LANGUAGE,
                        userLanguage:undefined
                    }

                };
                $provide.value('$window', windowStub);
            });
            inject(function ($injector) {
                ngI18nLocaleContextHolder = $injector.get('ngI18nLocaleContextHolder');
            });
        });

        it('should able to set Locale', function () {
            ngI18nLocaleContextHolder.setLocale(DEFAULT_LOCALE);
            expect(ngI18nLocaleContextHolder.getLocale()).toEqual(DEFAULT_LOCALE);

        });

        it('should able get Locale from browser (non IE) when locale not set', function () {
            expect(ngI18nLocaleContextHolder.getLocale()).toEqual(DEFAULT_LANGUAGE);
        });

        it('should able get Locale from browser (IE) when locale not set', function () {
            windowStub.navigator.userLanguage = DEFAULT_USER_LANGUAGE;
            expect(ngI18nLocaleContextHolder.getLocale()).toEqual(DEFAULT_USER_LANGUAGE);
        });
    });

});
