import { Page } from '@playwright/test';
import Constants from '../Utils/loginPage.json';

interface loginPageLocators {
    username: string;
    password: string;
    loginButton: string;
    title: string;
    credTextUsername: string;
    credTextPassword: string;
    resetPassword: string;
}

export class LoginPage {
    readonly loginPageLocators: loginPageLocators;

    constructor() {
        this.loginPageLocators = {
            username: 'input[name="username"]',
            password: 'input[name="password"]',
            loginButton: '.oxd-button',
            title: 'h5',
            credTextUsername: '.oxd-sheet p:nth-of-type(1)',
            credTextPassword: '.oxd-sheet p:nth-of-type(2)',
            resetPassword: '.orangehrm-login-forgot'
        }
    }

    async login(page: Page) {
        await page.locator(this.loginPageLocators.username).type(Constants.username);
        await page.locator(this.loginPageLocators.password).type(Constants.password);
        await page.locator(this.loginPageLocators.loginButton).click();
    }

    async resetPassword(page: Page) {
        await page.locator(this.loginPageLocators.resetPassword).click();
    }
}