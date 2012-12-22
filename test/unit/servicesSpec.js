'use strict';

/* jasmine specs for services go here */

describe('ngI18nService', function () {
    var DEFAULT_LOCALE, DEFAULT_LANGUAGE, DEFAULT_USERLANGUAGE;

    beforeEach(function () {
        module('ngI18nConfig');
        module('ngI18nService');
        DEFAULT_LOCALE = 'nl';
        DEFAULT_LANGUAGE = 'fr';
        DEFAULT_USERLANGUAGE = 'en';
    });

    describe('ngI18nWindowNavigator', function () {
        var windowSpy, ngI18nWindowNavigator;
        beforeEach(function () {
            module(function ($provide) {
                windowSpy = jasmine.createSpyObj('window', ['navigator']);
                $provide.value('$window', windowSpy);
            });
            inject(function ($injector) {
                ngI18nWindowNavigator = $injector.get('ngI18nWindowNavigator');
            });
        });

        it('should be navigator from window', function () {
                expect(ngI18nWindowNavigator).toEqual(windowSpy.navigator);
        });
    });

    describe('ngI18nLocaleContextHolder', function () {
        var ngI18nLocaleContextHolder, ngI18nWindowNavigatorStub;

        beforeEach(function () {
            module(function ($provide) {
                ngI18nWindowNavigatorStub = {language: DEFAULT_LANGUAGE, userLanguage: undefined};
                $provide.value('ngI18nWindowNavigator', ngI18nWindowNavigatorStub);
            });
            inject(function ($injector) {
                ngI18nLocaleContextHolder = $injector.get('ngI18nLocaleContextHolder');
            });
        });

        it('should able to set Locale', function () {
            ngI18nLocaleContextHolder.setLocale(DEFAULT_LOCALE);
            expect(ngI18nLocaleContextHolder.getLocale()).toEqual(DEFAULT_LOCALE);

        });

        it('should able get default Locale from navigator language', function () {
            expect(ngI18nLocaleContextHolder.getLocale()).toEqual(DEFAULT_LANGUAGE);
        });

        it('should able get default Locale from navigator userLanguage', function () {
            ngI18nWindowNavigatorStub.userLanguage = DEFAULT_USERLANGUAGE;
            expect(ngI18nLocaleContextHolder.getLocale()).toEqual(DEFAULT_USERLANGUAGE);
        });
    });
});
