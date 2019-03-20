import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';
import { protractor } from 'protractor/built/ptor';

describe('frontend App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display Title', () => {
        page.navigateTo();
        expect(browser.getTitle()).toEqual('OnlineSalesFrontend');
    });

    it('should be redirected to /login route on opening the application', () => {
        expect(browser.getCurrentUrl()).toContain('/login');
    });

    it('should be redirected to /register route', () => {
        browser.element(by.css('.register-button')).click()
        expect(browser.getCurrentUrl()).toContain('/register');
    });

    it('should be able to register user', () => {
        browser.element(by.id('firstName')).sendKeys('Super User');
        browser.element(by.id('lastName')).sendKeys('Super lastUser');
        browser.element(by.id('userId')).sendKeys('Super User12');
        browser.element(by.id('password')).sendKeys('Super Userpass');
        browser.element(by.css('.register-user')).click()
        expect(browser.getCurrentUrl()).toContain('/login');
    });

    it('should be able to login user', () => {
        browser.element(by.id('userId')).sendKeys('Super User12');
        browser.element(by.id('password')).sendKeys('Super Userpass');
        browser.element(by.css('.login-user')).click()
        expect(browser.getCurrentUrl()).toContain('/online-sales/login');
    });
})