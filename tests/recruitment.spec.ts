import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import Constants from './Utils/recruitmentPage.json';
import { RecruitmentPage } from './pages/recruitmentPage';

test.describe('Recruitment Page', () => {
    let loginPage: LoginPage;
    let recruitmentPage: RecruitmentPage;

    test.beforeAll(async () => {
        loginPage = new LoginPage();
        recruitmentPage = new RecruitmentPage();
    });

    test.beforeEach(async ({ page }) => {
        await recruitmentPage.changeLanguage(page, loginPage)
    });
    
    test('Should able to login and goto recruitment page', async ({ page }) => {
        await recruitmentPage.goToAddCandidatePage(page, loginPage);
        await expect(page).toHaveURL(Constants.addCandidateUrl);
    });

    test('should be able to add candidate', async({ page }) => {
        await recruitmentPage.goToAddCandidatePage(page, loginPage);
        await page.locator(recruitmentPage.recruitmentPageLocators.firstname).type(Constants.firstname);
        await page.locator(recruitmentPage.recruitmentPageLocators.middlename).type(Constants.middlename);
        await page.locator(recruitmentPage.recruitmentPageLocators.lastname).type(Constants.lastname);
        await recruitmentPage.selecDropdownOption(page, 'option', 'Software Engineer')
        await page.locator(recruitmentPage.recruitmentPageLocators.email).type(Constants.email);
        await page.locator(recruitmentPage.recruitmentPageLocators.contact).type(Constants.contact);
        await page.setInputFiles(recruitmentPage.recruitmentPageLocators.fileUpload, Constants.fileUpload);
        await page.locator(recruitmentPage.recruitmentPageLocators.keywords).type(Constants.keywords);
        await page.locator(recruitmentPage.recruitmentPageLocators.notes).type(Constants.notes); 
        await page.locator(recruitmentPage.recruitmentPageLocators.calendar).fill('2023-04-12')
        await page.locator(recruitmentPage.recruitmentPageLocators.consentCheckbox).click({ force: true });
        await page.locator(recruitmentPage.recruitmentPageLocators.saveButton).click();
        expect(await recruitmentPage.getToastMessage(page)).toEqual("Successfully Saved");
    });
});