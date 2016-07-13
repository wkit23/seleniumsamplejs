// A simple test to show the Selenium usage

describe('Google Page', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999999;

    beforeEach(function() {
        browser.url('http://www.google.com');
    });

    it('should show the start page by default', function() {
        // Check based on the Windows Title
        var title = browser.getTitle();
        expect(title).toBe('Google');

        // Can also check based on logo image
        var imgLogo = browser.element('#hplogo');
        expect(imgLogo.value).not.toBeNull();
    });

    it('should show the result page when search', function() {
        // Can simulate input
        browser.keys('Haha')
            .keys('Enter');
        browser.waitForExist('.g');

        // Can get value from dom    
        var value = browser.getValue('.gsfi:first-child');
        expect(value).toBe('Haha');

        // Can select based on css class
        var results = browser.elements('div.g');
        expect(results.value.length).toBeGreaterThan(0);
    });

    it('should show video for video search', function() {
        // Depends on the framework, some offer easier way to do certain things
        browser.setValue('#lst-ib', 'Train to Busan')
            .keys('Enter');

        browser.waitForExist('.kno-ecr-pt');

        // Detect based on the right panel
        var text = browser.getText('.kno-ecr-pt');
        expect(text).toBe('Train To Busan');
    });

    it('should show respective page when click on result', function() {
        browser.setValue('#lst-ib', 'arvato malaysia')
            .keys('Enter');

        browser.waitForExist('.g');

        // Can also select and click a particular element
        var result = browser.element('.g .r:nth-child(1)'); 
        result.click();

        browser.waitForExist('a.logo');    

        var title = browser.getTitle();
        expect(title).toBe('arvato Systems - Empowering Digital Leaders');
    });
});