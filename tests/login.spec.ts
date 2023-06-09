import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import Constants from './Utils/loginPage.json';

test.describe('Login Page', () => {
    let loginPage: LoginPage;

    test.beforeAll(async ({}) => {
        loginPage = new LoginPage();
    });
    
    test('Should contain all necessary text content', async ({ page }) => {
        await page.goto('auth/login');
        await expect(page).toHaveTitle(Constants.orangeHRM);
        await expect(page.locator(loginPage.loginPageLocators.title)).toContainText(Constants.login);
        await expect(page.locator(loginPage.loginPageLocators.credTextUsername)).toContainText(Constants.credTextUsername);
        await expect(page.locator(loginPage.loginPageLocators.credTextPassword)).toContainText(Constants.credTextPassword);
    });
    
    test('Should be able to login', async ({ page }) => {
        await page.goto('auth/login');
        await loginPage.login(page);
        await expect(page).toHaveURL(Constants.dashboardUrl);
    });

    test('should go to requestPasswordResetCode', async({ page }) => {
        await page.goto('auth/login');
        await loginPage.resetPassword(page);
        await expect(page).toHaveURL(Constants.resetPasswordUrl);
    });
});