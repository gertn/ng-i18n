'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function () {

    beforeEach(function () {
        browser().navigateTo('../../app/index.html');
    });


    it('should automatically redirect to /view1 when location hash/fragment is empty', function () {
        expect(browser().location().url()).toBe("/view1");
    });


    describe('view1', function () {

        beforeEach(function () {
            browser().navigateTo('#/view1');
        });


        it('should render view1 when user navigates to /view1', function () {
            expect(element('[ng-view] p:first').text()).
                toMatch(/first view/);
        });

        it('should render view1 in dutch when switching language to dutch', function () {
            input('switchLanguage').option('nl');
            expect(element('[ng-view] p:first').text()).
                toMatch(/eerste view/);
        });

    });


    describe('view2', function () {

        beforeEach(function () {
            browser().navigateTo('#/view2');
        });


        it('should render view2 when user navigates to /view2', function () {
            expect(element('[ng-view] p:first').text()).
                toMatch(/second view/);
        });

        it('should render view2 in dutch when switching language to dutch', function () {
            input('switchLanguage').option('nl');
            expect(element('[ng-view] p:first').text()).
                toMatch(/tweede view/);
        });

    });
});
