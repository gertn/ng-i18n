'use strict';

/* jasmine specs for services go here */

describe('service', function () {
    beforeEach(module('ngI18nService'));

    describe('version', function () {
        it('should return current version', inject(function (version) {
            expect(version).toEqual('<%= pkg.version %>');
        }));
    });

    describe('ngI18nLocaleContextHolder', function () {
        var ngI18nLocaleContextHolder, ngI18nConfigStub;
        beforeEach(function () {
            module(function ($provide) {
                $provide.value('ngI18nConfig', ngI18nConfigStub);
            });
            inject(function ($injector) {
                ngI18nLocaleContextHolder = $injector.get('ngI18nLocaleContextHolder');
            });
        });
        it('should not be null', function () {
            expect(ngI18nLocaleContextHolder).not.toBe(null);

        });
    });
});
