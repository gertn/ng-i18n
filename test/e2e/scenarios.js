'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function () {
    beforeEach(function () {
        browser().navigateTo('../../app/index.html');
    });

    it('should automatically redirect to /view1 when location hash/fragment is empty', function () {
        expect(browser().location().url()).toBe("/view1");
    });

    describe('resourceBundle', function () {
        var DEFAULT_RESOURCE_BUNDLE_URL = '/app/i18n/resourceBundle.json',
            RESOURCE_BUNDLE_NL_URL = '/app/i18n/resourceBundle_nl.json';
        beforeEach(function () {
            browser().navigateTo('#/view1');
            select('language').option('nl-BE');
        });

        it('should get default resourceBundle when locale is default locale', function () {
            select('language').option('en');
            expect(element('span#url').text()).
                toEqual(DEFAULT_RESOURCE_BUNDLE_URL);
        });

        it('should get resourceBundle with locale suffix ' +
            'when locale is not default locale ' +
            'and locale is one of the supported locales', function () {
            select('language').option('nl');
            expect(element('span#url').text()).
                toEqual(RESOURCE_BUNDLE_NL_URL);
        });

        it('should get resourceBundle with locale suffix in lowercase ' +
            'when locale is not default locale ' +
            'and locale to lowercase is one of the supported locales', function () {
            select('language').option('nl-BE');
            expect(element('span#url').text()).
                toEqual('/app/i18n/resourceBundle_nl-be.json');
        });

        it('should get default resourceBundle when language (from locale) is default locale', function () {
            select('language').option('en-US');
            expect(element('span#url').text()).
                toEqual(DEFAULT_RESOURCE_BUNDLE_URL);
        });

        it('should get resourceBundle with language (from locale) suffix ' +
            'when language (from locale) is not default locale ' +
            'and language (from locale) is one of the supported locales', function () {
            select('language').option('nl-nl');
            expect(element('span#url').text()).
                toEqual(RESOURCE_BUNDLE_NL_URL);
        });

        it('should fallback to get default resourceBundle when locale not default locale ' +
            'nor one of the supported locales', function () {
            select('language').option('de');
            expect(element('span#url').text()).
                toEqual(DEFAULT_RESOURCE_BUNDLE_URL);
        });
    });

    describe('view1', function () {

        beforeEach(function () {
            browser().navigateTo('#/view1');
        });


        it('should render view1 in english when user navigates to /view1', function () {
            expect(element('[ng-view] p:first').text()).
                toMatch('first view');
        });

        it('should render view1 in dutch when user switches language to nl', function () {
            select('language').option('nl');
            expect(element('[ng-view] p:first').text()).
                toMatch('eerste view');
        });

    });

    describe('view2', function () {

        beforeEach(function () {
            browser().navigateTo('#/view2');
        });


        it('should render view2 in english when user navigates to /view2', function () {
            expect(element('[ng-view] p:first').text()).
                toMatch('second view');
        });

        it('should render view2 in dutch when user switches language to nl', function () {
            select('language').option('nl');
            expect(element('[ng-view] p:first').text()).
                toMatch('tweede view');
        });

    });
});