'use strict';

describe('ngI18nService - ', function () {
    var ngI18nConfig, windowStub;
    beforeEach(function () {

        module('ngI18nConfig');

        module(function ($provide) {
            ngI18nConfig = {supportedLocales:['nl', 'en']};
            $provide.value('ngI18nConfig', ngI18nConfig);

            windowStub = {
                navigator:{
                    language:undefined,
                    userLanguage:undefined
                }

            };
            $provide.value('$window', windowStub);
        });

        module('ngI18nService');

    });

    describe('ngI18nResourceBundle - ', function () {
        var $httpBackend, ngI18nResourceBundle, expectedResourceBundle, resourceBundle;

        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            ngI18nResourceBundle = $injector.get('ngI18nResourceBundle');
            expectedResourceBundle = {"key1":'value1', "key2":'value2'};
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should be able to get resourceBundle for locale set in options", function () {
            assertResourceBundleLoaded('nl');
        });

        describe('Locale from browser', function () {
            it("should be able to get resourceBundle for Locale from browser (non IE) when locale not set in options", function () {
                var locale = 'fr';
                ngI18nConfig.supportedLocales = [locale];
                windowStub.navigator.language = locale;
                assertResourceBundleLoadedWithLocaleFromBrowser(locale);
            });

            it("should be able to get resourceBundle for Locale from browser (IE) when locale not set in options", function () {
                var locale = 'fr';
                ngI18nConfig.supportedLocales = [locale];
                windowStub.navigator.userLanguage = locale;
                assertResourceBundleLoadedWithLocaleFromBrowser(locale);
            });

            function assertResourceBundleLoadedWithLocaleFromBrowser(locale) {
                $httpBackend.when("GET", '/i18n/resourceBundle_' + locale + '.json').respond(expectedResourceBundle);

                ngI18nResourceBundle.get().success(function (data) {
                    resourceBundle = data;
                });

                $httpBackend.flush();

                expect(resourceBundle).toEqual(expectedResourceBundle);
            }
        });

        describe('base path global option - ', function () {
            it("should be able to configure base path for url", function () {
                ngI18nConfig.basePath = 'new/base/path';
                var basePath = 'new/base/path';
                assertResourceBundleLoaded('nl', basePath);
            });
        });

        describe('caching global option - ', function () {

            it("should not cache resourceBundle when cache set to false", function () {
                ngI18nConfig.caching = false;

                assertNotCachingResourceBundle();
            });

            it("should not cache resourceBundle when cache not set", function () {
                assertNotCachingResourceBundle();
            });

            function assertNotCachingResourceBundle(){
                $httpBackend.when("GET", '/i18n/resourceBundle_nl.json').respond(expectedResourceBundle);

                firstCall();

                secondCallCapturesResourceBundle();

                flushBothCallsThisWouldFailWhenCachingIsTrue();

                expect(resourceBundle).toEqual(expectedResourceBundle);

                function flushBothCallsThisWouldFailWhenCachingIsTrue() {
                    $httpBackend.flush(2);
                }
            }

            it("should be able to cache resourceBundle when cache set to true", function () {
                $httpBackend.when("GET", '/i18n/resourceBundle_nl.json').respond(expectedResourceBundle);
                ngI18nConfig.cache = true;

                firstCall();

                secondCallCapturesResourceBundle();

                onlyFlushOnCallSecondCallShouldBeCached();

                expect(resourceBundle).toEqual(expectedResourceBundle);

                function onlyFlushOnCallSecondCallShouldBeCached() {
                    $httpBackend.flush(1);
                }

            });

            function firstCall() {
                ngI18nResourceBundle.get({locale:'nl'});
            }

            function secondCallCapturesResourceBundle() {
                ngI18nResourceBundle.get({locale:'nl'}).success(function (data) {
                    resourceBundle = data;
                });
            }

        });

        describe('supported locales global option - ', function () {
            it("should be able to fallback to default resourceBundle when locale not supported", function () {
                ngI18nConfig.supportedLocales = ['nl', 'en'];
                assertDefaultResourceBundleLoaded('fr');
            });

            it("should be able to fallback to resourceBundle for language from Locale when language of locale is supported but locale not", function () {
                ngI18nConfig.supportedLocales = ['nl', 'en'];
                assertResourceBundleLoadedForSupportedLocales('nl-be', 'nl');
            });

            it("should always get resourceBundle in lowercase", function () {
                ngI18nConfig.supportedLocales = ['nl-be'];
                assertResourceBundleLoadedForSupportedLocales('nl-BE', 'nl-be');
            });

            function assertResourceBundleLoadedForSupportedLocales(localeForGet, localeForUrl) {
                $httpBackend.when("GET", '/i18n/resourceBundle_' + localeForUrl + '.json').respond(expectedResourceBundle);

                ngI18nResourceBundle.get({locale:localeForGet}).success(function (data) {
                    resourceBundle = data;
                });

                $httpBackend.flush();

                expect(resourceBundle).toEqual(expectedResourceBundle);
            }
        });

        describe('name local option - ', function () {
            it("should be able to configure name of resource bundle", function () {
                ngI18nConfig.supportedLocales = ['nl', 'en'];
                ngI18nConfig.defaultLocale = 'nl';

                var name = 'customName';
                assertResourceBundleLoadedWithCustomName({locale: 'nl', name: name});
            });

            function assertResourceBundleLoadedWithCustomName(options) {
                $httpBackend.when("GET", '/i18n/' + options.name  + '.json').respond(expectedResourceBundle);

                ngI18nResourceBundle.get(options).success(function (data) {
                    resourceBundle = data;
                });

                $httpBackend.flush();

                expect(resourceBundle).toEqual(expectedResourceBundle);
            }
        });

        describe('default locale - ', function () {
            it('should get default resourceBundle when locale matches default locale', function () {
                ngI18nConfig.supportedLocales = ['nl', 'en'];
                ngI18nConfig.defaultLocale = 'nl';
                assertDefaultResourceBundleLoaded('nl');
            });

            it('should get default resourceBundle when locale matches lowercase default locale', function () {
                ngI18nConfig.supportedLocales = ['nl-be', 'en'];
                ngI18nConfig.defaultLocale = 'nl-be';
                assertDefaultResourceBundleLoaded('nl-BE');
            });

            it('should get default resourceBundle when language of locale matches default locale', function () {
                ngI18nConfig.supportedLocales = ['nl', 'en'];
                ngI18nConfig.defaultLocale = 'nl';
                assertDefaultResourceBundleLoaded('nl-BE');
            });
        });

        function assertResourceBundleLoaded(locale, basePath) {
            var _basePath = basePath || 'i18n';
            $httpBackend.when("GET", '/' + _basePath + '/resourceBundle_' + locale + '.json').respond(expectedResourceBundle);

            ngI18nResourceBundle.get({locale:locale}).success(function (data) {
                resourceBundle = data;
            });

            $httpBackend.flush();

            expect(resourceBundle).toEqual(expectedResourceBundle);
        }

        function assertDefaultResourceBundleLoaded(locale) {
            $httpBackend.when("GET", '/i18n/resourceBundle.json').respond(expectedResourceBundle);

            ngI18nResourceBundle.get({locale:locale}).success(function (data) {
                resourceBundle = data;
            });

            $httpBackend.flush();

            expect(resourceBundle).toEqual(expectedResourceBundle);
        }

    });

});
