'use strict';

/* jasmine specs for services go here */

describe('ngI18n app', function () {
    var ngI18nConfig;
    beforeEach(function () {
        module('ngI18n');
    });

    describe('version', function () {
        it('should return current version', inject(function (version) {
            expect(version).toEqual('<%= pkg.version %>');
        }));
    });

    describe('ngI18nConfig', function () {
        it('should be bootstrapped', inject(function (ngI18nConfig) {
            expect(ngI18nConfig).not.toBe(null);
        }));
    });

    describe('ngI18nService', function () {
        it('should be bootstrapped', inject(function (name) {
            expect(name).toBe('ngI18nService');
        }));
    });
});