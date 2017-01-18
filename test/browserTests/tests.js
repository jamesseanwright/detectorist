'use strict';

const webdriver = require('selenium-webdriver');
const { By, until, Builder: WebDriverBuilder } = webdriver;

describe('the browser tests', function () {
    describe('Chrome', function () {
        it('should be compatible with the specified feature config', function () {
            const driver = new WebDriverBuilder()
                .forBrowser('chrome')
                .build();

            driver.get('http://localhost:8080/testPage.html');

            const resultElement = driver.findElement(By.id('result'));

            return resultElement.getText()
                .then(text => {
                    expect(text).to.equal('true');
                    
                    return driver.quit();
                });
        });
    });
});